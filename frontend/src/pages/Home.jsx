// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-inter">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              className="h-8 w-8 text-violet-600"
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
            <span className="text-xl font-bold text-gray-800">SISM</span>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition duration-300"
          >
            Đăng nhập
          </button>
        </nav>
      </header>

      {/* Hero section */}
      <main className="flex-grow">
        <section className="bg-violet-50">
          <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Hệ thống Quản lý Thông tin Sinh viên (SISM)
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Nền tảng tất cả trong một giúp kết nối Quản trị viên, Giảng viên
              và Sinh viên một cách hiệu quả.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-lg hover:bg-violet-700 transform hover:scale-105 transition duration-300 text-lg"
            >
              Bắt đầu ngay
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Về SISM</h2>
              <p className="text-gray-600 mb-4">
                SISM được xây dựng với mục tiêu số hóa và tối ưu hóa các quy
                trình quản lý giáo dục. Chúng tôi cung cấp một môi trường làm
                việc tập trung, nơi mọi thông tin quan trọng đều có thể được
                truy cập nhanh chóng và an toàn.
              </p>
              <p className="text-gray-600">
                Từ việc quản lý hồ sơ, phân công giảng dạy, đến việc theo dõi
                kết quả học tập, SISM cam kết mang lại trải nghiệm tốt nhất cho
                tất cả người dùng.
              </p>
            </div>
            <div>
              <img
                src="https://placehold.co/600x400/9333ea/ffffff?text=Sơ+đồ+Hệ+thống+SISM"
                alt="Sơ đồ hệ thống"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Dành cho Mọi người
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-violet-500">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Quản trị viên
                </h3>
                <p className="text-gray-600">
                  Quản lý toàn diện dữ liệu sinh viên, giảng viên. Theo dõi và
                  tạo báo cáo thống kê trực quan.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-emerald-500">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Giảng viên
                </h3>
                <p className="text-gray-600">
                  Dễ dàng quản lý lớp học, nhập điểm, theo dõi tiến độ và tương
                  tác với sinh viên.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Sinh viên
                </h3>
                <p className="text-gray-600">
                  Cổng thông tin cá nhân hóa để xem lịch học, kết quả học tập và
                  cập nhật thông tin.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-12 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Sản phẩm</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white">
                  <a href="#">Tính năng</a>
                </li>
                <li className="hover:text-white">
                  <a href="#">Bảng giá</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Công ty</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white">
                  <a href="#">Về chúng tôi</a>
                </li>
                <li className="hover:text-white">
                  <a href="#">Liên hệ</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Pháp lý</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white">
                  <a href="#">Điều khoản dịch vụ</a>
                </li>
                <li className="hover:text-white">
                  <a href="#">Chính sách bảo mật</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Thông tin liên hệ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
                <li>Email: contact@sism.edu.vn</li>
                <li>Điện thoại: (028) 3812 3456</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; 2025 SISM. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
