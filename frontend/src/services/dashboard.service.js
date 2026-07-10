import { getDashboardSummary } from "../api/dashboard.api";

export const getDashboard = async () => {
  return getDashboardSummary();
};
