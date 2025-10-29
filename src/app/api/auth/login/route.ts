import { NextResponse } from "next/server";
import { apiClient } from "@/lib/apiClient";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { data } = await apiClient.post("/yeshtery/token", {
      email,
      password,
      isEmployee: true,
    });

    
    const res = NextResponse.json({ success: true });

    res.cookies.set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, 
    });

    return res;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Invalid email or password";
    return NextResponse.json({ success: false, message }, { status: 401 });
  }
}
