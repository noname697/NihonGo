import { useQuery } from "@tanstack/react-query";
import { getDasboard } from "../services/dashboard.service";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDasboard,
  });
};
