import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <aside className="bg-violet-700 text-white w-64 min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">Bảng điều khiển</h2>
      <ul className="space-y-3">
        {role === "admin" && (
          <>
            <li><Link to="/admin" className="block hover:text-violet-300">🏠 Trang chủ</Link></li>
            <li><Link to="/sinhvien" className="block hover:text-violet-300">👨‍🎓 Quản lý sinh viên</Link></li>
            <li><Link to="/lop" className="block hover:text-violet-300">🏫 Quản lý lớp</Link></li>
            <li><Link to="/monhoc" className="block hover:text-violet-300">📘 Quản lý môn học</Link></li>
          </>
        )}

        {role === "lecturer" && (
          <>
            <li><Link to="/lecturer" className="block hover:text-violet-300">📚 Lớp giảng dạy</Link></li>
            <li><Link to="/profile" className="block hover:text-violet-300">👤 Hồ sơ giảng viên</Link></li>
          </>
        )}

        {role === "student" && (
          <>
            <li><Link to="/student" className="block hover:text-violet-300">📄 Thông tin học tập</Link></li>
            <li><Link to="/diem" className="block hover:text-violet-300">🧮 Bảng điểm</Link></li>
          </>
        )}
      </ul>
    </aside>
  );
}
