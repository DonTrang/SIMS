import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-violet-600">SIMS</span>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-violet-600">
            Trang chủ
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Đăng nhập
          </Link>
        </div>
      </nav>
    </header>
  );
}
