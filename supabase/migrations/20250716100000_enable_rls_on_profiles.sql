ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User access" ON profiles 
USING (auth.uid() = user_id);