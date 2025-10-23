// src/pages/AdminDashboard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MOCK_DATA from '../data/mockData';
import Chart from 'chart.js/auto';

export default function AdminDashboard() {
  const [section, setSection] = useState('admin-dashboard');
  const studentStatusRef = useRef(null);
  const studentDeptRef = useRef(null);
  const [filteredStudents, setFilteredStudents] = useState(MOCK_DATA.students);
  const [filters, setFilters] = useState({ dept: 'all', cohort: 'all', status: 'all' });
  const navigate = useNavigate();

  useEffect(() => {
    // student status chart
    if (studentStatusRef.current) {
      const ctx = studentStatusRef.current.getContext('2d');
      const counts = MOCK_DATA.students.reduce((acc, s) => { acc[s.status] = (acc[s.status] || 0) + 1; return acc; }, {});
      new Chart(ctx, { type: 'doughnut', data: { labels: Object.keys(counts), datasets: [{ data: Object.values(counts), backgroundColor: ['#34d399', '#f59e0b', '#60a5fa', '#ef4444'] }] } });
    }
    // dept chart
    if (studentDeptRef.current) {
      const ctx2 = studentDeptRef.current.getContext('2d');
      const counts = MOCK_DATA.students.reduce((acc, s) => { acc[s.department] = (acc[s.department] || 0) + 1; return acc; }, {});
      new Chart(ctx2, { type: 'bar', data: { labels: Object.keys(counts), datasets: [{ label: 'Số lượng sinh viên', data: Object.values(counts) }] } });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const results = MOCK_DATA.students.filter(s => (filters.dept === 'all' || s.department === filters.dept) && (filters.cohort === 'all' || s.cohort === filters.cohort) && (filters.status === 'all' || s.status === filters.status));
    setFilteredStudents(results);
  }, [filters]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow">
        <div className="p-4 bg-gray-800 text-white font-bold text-xl text-center">ADMIN</div>
        <nav className="p-4 space-y-2">
          <button onClick={() => setSection('admin-dashboard')} className={`block w-full text-left px-4 py-2 rounded ${section==='admin-dashboard' ? 'bg-blue-100 font-semibold' : 'hover:bg-blue-50'}`}>Dashboard</button>
          <button onClick={() => setSection('admin-student')} className={`block w-full text-left px-4 py-2 rounded ${section==='admin-student' ? 'bg-blue-100 font-semibold' : 'hover:bg-blue-50'}`}>Quản lý Sinh viên</button>
          <button onClick={() => setSection('admin-lecturer')} className={`block w-full text-left px-4 py-2 rounded ${section==='admin-lecturer' ? 'bg-blue-100 font-semibold' : 'hover:bg-blue-50'}`}>Quản lý Giảng viên</button>
          <button onClick={() => setSection('admin-reports')} className={`block w-full text-left px-4 py-2 rounded ${section==='admin-reports' ? 'bg-blue-100 font-semibold' : 'hover:bg-blue-50'}`}>Báo cáo & Thống kê</button>
          <button onClick={() => navigate('/')} className="mt-6 block w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-50">Đăng xuất</button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {section === 'admin-dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-gray-500">Tổng số Sinh viên</h3>
                <p className="text-3xl font-bold text-blue-600">{MOCK_DATA.students.length}</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-gray-500">Tổng số Giảng viên</h3>
                <p className="text-3xl font-bold text-green-600">{MOCK_DATA.lecturers.length}</p>
              </div>
            </div>
          </div>
        )}

        {section === 'admin-student' && (
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Quản lý Sinh viên</h2>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <select className="p-2 border rounded" value={filters.dept} onChange={e => setFilters(f => ({...f, dept: e.target.value}))}><option value="all">Tất cả ngành</option><option>Công nghệ thông tin</option><option>Kinh tế</option></select>
              <select className="p-2 border rounded" value={filters.cohort} onChange={e => setFilters(f => ({...f, cohort: e.target.value}))}><option value="all">Tất cả khóa</option><option>K44</option><option>K45</option></select>
              <select className="p-2 border rounded" value={filters.status} onChange={e => setFilters(f => ({...f, status: e.target.value}))}><option value="all">Tất cả tình trạng</option><option>Đang học</option><option>Đã tốt nghiệp</option><option>Thôi học</option></select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="bg-gray-100"><th className="p-3">Mã SV</th><th className="p-3">Họ tên</th><th className="p-3">Email</th><th className="p-3">Lớp</th><th className="p-3">Tình trạng</th><th className="p-3">Hành động</th></tr></thead>
                <tbody>
                  {filteredStudents.length ? filteredStudents.map(s => (
                    <tr key={s.id}>
                      <td className="p-3 border-b">{s.id}</td>
                      <td className="p-3 border-b">{s.name}</td>
                      <td className="p-3 border-b">{s.contact.email}</td>
                      <td className="p-3 border-b">{s.courseInfo.className}</td>
                      <td className="p-3 border-b">{s.status}</td>
                      <td className="p-3 border-b"><a className="text-blue-600 hover:underline">Sửa</a> | <a className="text-red-600 hover:underline">Xóa</a></td>
                    </tr>
                  )) : <tr><td colSpan="6" className="p-4 text-center text-gray-500">Không có dữ liệu phù hợp</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {section === 'admin-lecturer' && (
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Quản lý Giảng viên</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="bg-gray-100"><th className="p-3">Mã GV</th><th className="p-3">Họ tên</th><th className="p-3">Email</th><th className="p-3">Khoa</th><th className="p-3">Hành động</th></tr></thead>
                <tbody>
                  {MOCK_DATA.lecturers.map(l => (
                    <tr key={l.id}>
                      <td className="p-3 border-b">{l.id}</td>
                      <td className="p-3 border-b">{l.name}</td>
                      <td className="p-3 border-b">{l.email}</td>
                      <td className="p-3 border-b">{l.department}</td>
                      <td className="p-3 border-b"><a className="text-blue-600 hover:underline">Sửa</a> | <a className="text-red-600 hover:underline">Xóa</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {section === 'admin-reports' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Báo cáo & Thống kê</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Phân bổ sinh viên theo Tình trạng</h3>
                <canvas ref={studentStatusRef} />
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Phân bổ sinh viên theo Ngành</h3>
                <canvas ref={studentDeptRef} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
