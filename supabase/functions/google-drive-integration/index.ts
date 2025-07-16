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

    const { action, folderId, fileName, fileContent } = await req.json();

    // Get Google Drive folders configuration
    const { data: driveData, error: driveError } = await supabaseClient
      .from('google_drive_storage')
      .select('*');

    if (driveError) throw driveError;

    switch (action) {
      case 'list_folders':
        return new Response(
          JSON.stringify({ folders: driveData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'get_folder_url': {
        const folder = driveData.find(f => f.folder_id === folderId);
        if (!folder) {
          throw new Error('Folder not found');
        }
        
        return new Response(
          JSON.stringify({ 
            folder_url: folder.drive_url,
            folder_name: folder.folder_name,
            description: folder.description 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'upload_file': {
        // For security and simplicity, we'll return the drive folder URL
        // Users can manually upload files to the Google Drive folder
        const uploadFolder = driveData.find(f => f.folder_id === folderId) || driveData[0];
        
        return new Response(
          JSON.stringify({ 
            message: 'Please upload your file manually to the Google Drive folder',
            upload_url: uploadFolder.drive_url,
            folder_name: uploadFolder.folder_name,
            instructions: 'Click the link above to open the Google Drive folder and upload your file'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Error in google-drive-integration function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});