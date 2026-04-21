import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const useProjects = (options = {}) => {
  const { limit } = options;

  return useQuery({
    queryKey: ["projects", limit || "all"],

    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);

      return data;
    },

    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};