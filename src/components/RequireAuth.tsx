import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const RequireAuth = () => {
  const location = useLocation();
  const { isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: () => api<{ phone: string }>("/api/me"),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#F1FFFF]">
        <div className="h-10 w-10 rounded-full border-2 border-[#00568C]/20 border-t-[#00568C] animate-spin" />
      </div>
    );
  }
  if (isError) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <Outlet />;
};

export default RequireAuth;
