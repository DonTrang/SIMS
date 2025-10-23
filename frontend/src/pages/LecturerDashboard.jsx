// src/pages/LecturerDashboard.jsx
import React, { useState } from 'react';
import MOCK_DATA from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function LecturerDashboard() {
  const navigate = useNavigate();
  const lecturerId = 'GV01';
  const lecturer = MOCK_DATA.lecturers.find(l => l.id === lecturerId);
  const assignments = MOCK_DATA.assignments.filter(a => a.lecturerId === lecturerId);
  const assignmentsBySubject = assignments.reduce((acc, a) => {
    const subject = MOCK_DATA.subjects.find(s => s.id === a.subjectId);
    if (!acc[subject.id]) acc[subject.id] = { name: subject.name, classes: [] };
    acc[subject.id].classes.push(a);
    return acc;
  }, {});
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({...lecturer});

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Cổng thông tin Giảng viên</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="px-3 py-2 bg-red-600 rounded">Đăng xuất</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <nav className="flex border-b mb-6 bg-white rounded-lg shadow-sm">
          <button className="flex-1 text-center p-3" onClick={() => window.scrollTo(0,0)}>Lớp học</button>
          <button className="flex-1 text-center p-3" onClick={() => document.getElementById('lecturer-info')?.scrollIntoView()}>Thông tin cá nhân</button>
        </nav>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Các Lớp học được Phân công</h2>
            <div className="space-y-6">
              {Object.values(assignmentsBySubject).map((g, idx) => (
                <div key={idx} className="bg-white p-6 rounded shadow">
                  <h3 className="font-bold text-lg text-emerald-800 mb-3 border-b pb-2">{g.name}</h3>
                  <div className="space-y-3">
                    {g.classes.map((c, i) => {
                      const className = MOCK_DATA.classes.find(cl => cl.id === c.classId)?.name;
                      return <div key={i} className="class-card flex justify-between items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100"><span>Lớp: <strong>{className}</strong></span><span className="text-sm text-gray-500">{c.studentCount} sinh viên</span></div>;
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-gray-700 mb-2">Lịch dạy</h4>
                    <div className="space-y-1">
                      {(MOCK_DATA.lecturerSchedules[lecturerId] || []).map((s, i) => (
                        <div key={i} className="text-sm text-gray-600 flex justify-between"><span>{MOCK_DATA.classes.find(c=>c.id===s.classId)?.name || s.classId}</span><span>{s.day}, {s.time}</span><span>Phòng {s.room}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="lecturer-info" className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin Giảng viên</h2>
            <form onSubmit={(e)=>{e.preventDefault(); setEditing(false); alert('Cập nhật thành công!');}}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700">Mã Giảng viên</label>
                  <input className="mt-1 w-full rounded border-gray-300 bg-gray-100" value={form.id} disabled />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Họ và tên</label>
                  <input className={`mt-1 w-full rounded border-gray-300 ${editing ? '' : 'bg-gray-100'}`} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} disabled={!editing} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Ngày sinh</label>
                  <input type="date" className={`mt-1 w-full rounded border-gray-300 ${editing ? '' : 'bg-gray-100'}`} value={form.dob} onChange={e=>setForm(f=>({...f,dob:e.target.value}))} disabled={!editing}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Số CMND/CCCD</label>
                  <input className={`mt-1 w-full rounded border-gray-300 ${editing ? '' : 'bg-gray-100'}`} value={form.nationalId} onChange={e=>setForm(f=>({...f,nationalId:e.target.value}))} disabled={!editing}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Trình độ</label>
                  <input className={`mt-1 w-full rounded border-gray-300 ${editing ? '' : 'bg-gray-100'}`} value={form.degree} onChange={e=>setForm(f=>({...f,degree:e.target.value}))} disabled={!editing}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Học hàm</label>
                  <input className={`mt-1 w-full rounded border-gray-300 ${editing ? '' : 'bg-gray-100'}`} value={form.academicRank} onChange={e=>setForm(f=>({...f,academicRank:e.target.value}))} disabled={!editing}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Số điện thoại</label>
                  <input className={`mt-1 w-full rounded border-gray-300 ${editing ? '' : 'bg-gray-100'}`} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} disabled={!editing}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Email</label>
                  <input className={`mt-1 w-full rounded border-gray-300 ${editing ? '' : 'bg-gray-100'}`} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} disabled={!editing}/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700">Địa chỉ</label>
                  <input className={`mt-1 w-full rounded border-gray-300 ${editing ? '' : 'bg-gray-100'}`} value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} disabled={!editing}/>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button type="button" onClick={()=>setEditing(true)} className={`px-4 py-2 rounded text-white bg-emerald-600 ${editing ? 'hidden':''}`}>Chỉnh sửa</button>
                <button type="submit" className={`px-4 py-2 rounded text-white bg-green-600 ${editing ? '' : 'hidden'}`}>Lưu thay đổi</button>
                <button type="button" onClick={()=>{ setForm({...lecturer}); setEditing(false); }} className={`px-4 py-2 rounded bg-gray-500 text-white ${editing ? '' : 'hidden'}`}>Hủy</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
