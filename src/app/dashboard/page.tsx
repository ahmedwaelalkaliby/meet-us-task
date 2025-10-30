import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import UserData from "./UserData";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const headersList = await headers();

  const token = cookieStore.get("token")?.value || "";
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Dashboard
        </h1>

        <UserData token={token} baseUrl={baseUrl} />

        <LogoutButton />
      </div>
    </div>
  );
}
