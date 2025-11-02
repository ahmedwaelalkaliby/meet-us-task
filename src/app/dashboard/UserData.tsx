'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'sonner';

interface UserDataProps {
  token: string;
  baseUrl: string;
}

export default function UserData({ token, baseUrl }: UserDataProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUserData({ token, baseUrl })).unwrap();
      } catch (error) {
        if (error === 'Unauthorized') {
          toast.error('Session expired. Please login again.');
          router.push('/login');
        } else {
          toast.error(error as string || 'Failed to fetch user data');
        }
      }
    };

    fetchUser();
  }, [dispatch, token, baseUrl, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return null;
  }

  if (!user) {
    return null;
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