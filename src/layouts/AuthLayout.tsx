import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import loginImg from "@/assets/images/login.jpg";

interface AuthProps {
  children?: ReactNode;
}

export default function AuthLayout({ children }: AuthProps) {
  return (
    <div
      className="flex h-screen"
      style={{ direction: "rtl", fontFamily: "Vazir" }}
    >
      {/* تصویر */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src={loginImg}
          alt="auth banner"
          className="max-w-full max-h-full object-cover"
        />
      </div>

      {/* فرم */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children || <Outlet />} {/* Outlet برای مسیرهای nested */}
        </div>
      </div>
    </div>
  );
}
