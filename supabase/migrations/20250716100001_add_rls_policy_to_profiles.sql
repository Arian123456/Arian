CREATE POLICY "User access" ON profiles
USING (auth.uid() = user_id);