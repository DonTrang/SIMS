// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === "admin") navigate("/admin");
    else if (role === "lecturer") navigate("/lecturer");
    else navigate("/student");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-auto text-violet-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Đăng nhập SISM
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Vui lòng chọn vai trò của bạn
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Vai trò
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            >
              <option value="admin">Admin</option>
              <option value="lecturer">Giảng viên</option>
              <option value="student">Sinh viên</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Đăng nhập
          </button>

          <p className="text-center text-sm">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-violet-600 hover:underline"
            >
              Quay lại trang chủ
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
