import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { eventType, eventData, userId } = await req.json();

    // Get client IP and User Agent
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Track the user event with Google Analytics tracking ID
    const trackingData = {
      ...eventData,
      google_tracking_id: 'AIzaSyA_jieunxYrLOJwQ88u9oiJJOEMJ1LscNs',
      timestamp: new Date().toISOString(),
    };

    // Insert into our analytics table
    const { error } = await supabaseClient
      .from('user_analytics')
      .insert({
        user_id: userId,
        event_type: eventType,
        event_data: trackingData,
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (error) throw error;

    // Also send to Google Analytics (optional)
    if (eventData.sendToGoogle !== false) {
      try {
        await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=G-XXXXXXXXXX&api_secret=${Deno.env.get('GA_API_SECRET')}`, {
          method: 'POST',
          body: JSON.stringify({
            client_id: userId || 'anonymous',
            events: [{
              name: eventType.replace(/[^a-zA-Z0-9_]/g, '_'),
              parameters: {
                custom_parameter: JSON.stringify(eventData)
              }
            }]
          })
        });
      } catch (gaError) {
        console.log('Google Analytics tracking failed:', gaError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Event tracked successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in track-user function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});