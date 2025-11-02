"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error) {
      // Error handling is done in the slice
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full bg-[#9414ff] hover:bg-[#8412e0] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
