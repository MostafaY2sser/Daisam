import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const useAuctions = (options = {}) => {
  const { limit, status } = options;

  return useQuery({
    queryKey: ["auctions", limit || "all", status || "all"],

    queryFn: async () => {
      let query = supabase
        .from("Auctions")
        .select("*")
        .order("created_at", { ascending: false });

      if (status) {
        query = query.eq("status", status);
      }

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