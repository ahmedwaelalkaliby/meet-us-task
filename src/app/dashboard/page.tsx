import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const headersList = await headers();

  const token = cookieStore.get("token")?.value;
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;


  const res = await fetch(`${baseUrl}/api/auth/user`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });


  if (res.status === 401) {
    redirect("/login");
  }

  const user = await res.json();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Dashboard
        </h1>

        <div className="space-y-4 mb-8">
          <div className="border-b pb-3">
            <p className="text-sm text-gray-500 mb-1">Name</p>
            <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500 mb-1">User ID</p>
            <p className="text-lg font-mono text-gray-700">{user.id}</p>
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}
