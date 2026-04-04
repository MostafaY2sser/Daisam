import { supabase } from "../lib/supabase";


// Returns the session data on successful login, which includes the access token and user information.
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};




// Logout function
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

    // Clear local storage
  localStorage.removeItem("token"); 
  localStorage.removeItem("user");
};