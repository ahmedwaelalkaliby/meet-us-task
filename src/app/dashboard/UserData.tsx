'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

interface User {
  name: string;
  id: string;
}

interface UserDataProps {
  token: string;
  baseUrl: string;
}

export default function UserData({ token, baseUrl }: UserDataProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${baseUrl}/api/auth/user`, {
        headers: { Cookie: `token=${token}` },
        cache: "no-store",
      });
      console.log(res);

      if (res.status === 401) {
        redirect("/login");
      }

      const userData = await res.json();
      setUser(userData);
    };

    fetchUser();
  }, [token, baseUrl]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
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
  );
}