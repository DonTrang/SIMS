// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from 'react';
import MOCK_DATA from '../data/mockData';
import { useNavigate } from 'react-router-dom';

function calculateStats(subjects){
  if(!subjects || subjects.length===0) return { totalCredits:0, gpa:'0.00' };
  const totalPoints = subjects.reduce((acc, s) => acc + (s.avg * s.credits), 0);
  const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0);
  return { totalCredits, gpa: (totalPoints/totalCredits).toFixed(2) };
}

export default function StudentDashboard(){
  const navigate = useNavigate();
  const studentId = 'SV001';
  const student = MOCK_DATA.students.find(s=>s.id === studentId);
  const studentScores = MOCK_DATA.scores[studentId] || {};
  const semesters = Object.keys(studentScores);
  const [selectedSemester, setSelectedSemester] = useState(semesters[semesters.length-1] || '');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({...student});
  const [cumulative, setCumulative] = useState({totalCredits:0, gpa:'0.00'});

  useEffect(()=>{
    const allSubjects = Object.values(studentScores).flat();
    setCumulative(calculateStats(allSubjects));
  }, [studentScores]);

  const renderSemesterTable = (sem) => {
    const subs = studentScores[sem] || [];
    const semStats = calculateStats(subs);
    return (
      <>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="bg-gray-100"><th className="p-3">Môn học</th><th className="p-3">Số tín chỉ</th><th className="p-3">Điểm TB</th></tr></thead>
            <tbody>
              {subs.map((s,i)=>(
                <tr key={i}>
                  <td className="p-3 border-b">{s.subject}</td>
                  <td className="p-3 border-b">{s.credits}</td>
                  <td className="p-3 border-b font-bold text-violet-600">{s.avg.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex justify-around text-center">
          <div className="px-4"><p className="text-sm text-gray-500">Điểm trung bình học kỳ</p><p className="font-bold text-lg">{semStats.gpa}</p></div>
          <div className="px-4 border-l"><p className="text-sm text-gray-500">Tín chỉ đạt được</p><p className="font-bold text-lg">{semStats.totalCredits}</p></div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-violet-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Cổng thông tin Sinh viên</h1>
          <div className="flex items-center gap-4">
            <button onClick={()=>navigate('/')} className="px-3 py-2 bg-red-600 rounded">Đăng xuất</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 space-y-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold">Chào {student.name}!</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <div id="student-summary-widgets" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">GPA Tích lũy</h3>
              <p id="cumulative-gpa" className="text-3xl font-bold text-violet-600">{cumulative.gpa}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Tín chỉ Tích lũy</h3>
              <p id="cumulative-credits" className="text-3xl font-bold text-violet-600">{cumulative.totalCredits}</p>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-4">Thông báo & Sự kiện</h3>
          <div className="space-y-3">
            {MOCK_DATA.announcements.map((an,i)=>(<div key={i} className="bg-violet-50 p-3 rounded"><p className="font-semibold text-violet-700">{an.title}</p><p className="text-xs text-gray-500">{an.date}</p></div>))}
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Thông tin Sinh viên</h2>
          <form onSubmit={(e)=>{e.preventDefault(); setEditing(false); alert('Cập nhật thông tin thành công!');}}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Mã Sinh viên</label>
                <input className="mt-1 w-full rounded border-gray-300 bg-gray-100" value={form.id} disabled />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Họ và tên</label>
                <input className={`mt-1 w-full rounded border-gray-300 ${editing? '':'bg-gray-100'}`} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} disabled={!editing}/>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Ngày sinh</label>
                <input type="date" className={`mt-1 w-full rounded border-gray-300 ${editing? '':'bg-gray-100'}`} value={form.dob} onChange={e=>setForm(f=>({...f,dob:e.target.value}))} disabled={!editing}/>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Số CMND/CCCD</label>
                <input className={`mt-1 w-full rounded border-gray-300 ${editing? '':'bg-gray-100'}`} value={form.nationalId} onChange={e=>setForm(f=>({...f,nationalId:e.target.value}))} disabled={!editing}/>
              </div>

              <div>
                <label className="block text-sm text-gray-700">Tình trạng học</label>
                <select className={`mt-1 block w-full rounded border-gray-300 ${editing? '':'bg-gray-100'}`} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} disabled={!editing}>
                  <option>Đang học</option><option>Bảo lưu</option><option>Đã tốt nghiệp</option><option>Thôi học</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700">Khóa học</label>
                <input className="mt-1 w-full rounded border-gray-300 bg-gray-100" value={form.courseInfo.program} disabled/>
              </div>

              <div>
                <label className="block text-sm text-gray-700">Niên khóa</label>
                <input className="mt-1 w-full rounded border-gray-300 bg-gray-100" value={form.courseInfo.academicYear} disabled/>
              </div>

              <div>
                <label className="block text-sm text-gray-700">Lớp sinh viên</label>
                <input className="mt-1 w-full rounded border-gray-300 bg-gray-100" value={form.courseInfo.className} disabled/>
              </div>

              <div>
                <label className="block text-sm text-gray-700">Số điện thoại</label>
                <input className={`mt-1 w-full rounded border-gray-300 ${editing? '':'bg-gray-100'}`} value={form.contact.phone} onChange={e=>setForm(f=>({...f,contact:{...f.contact,phone:e.target.value}}))} disabled={!editing}/>
              </div>

              <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input className={`mt-1 w-full rounded border-gray-300 ${editing? '':'bg-gray-100'}`} value={form.contact.email} onChange={e=>setForm(f=>({...f,contact:{...f.contact,email:e.target.value}}))} disabled={!editing}/>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700">Địa chỉ thường trú</label>
                <input className={`mt-1 w-full rounded border-gray-300 ${editing? '':'bg-gray-100'}`} value={form.contact.address} onChange={e=>setForm(f=>({...f,contact:{...f.contact,address:e.target.value}}))} disabled={!editing}/>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button type="button" onClick={()=>setEditing(true)} className={`px-4 py-2 rounded text-white bg-violet-600 ${editing ? 'hidden':''}`}>Chỉnh sửa</button>
              <button type="submit" className={`px-4 py-2 rounded text-white bg-green-600 ${editing ? '' : 'hidden'}`}>Lưu thay đổi</button>
              <button type="button" onClick={()=>{ setForm({...student}); setEditing(false); }} className={`px-4 py-2 rounded bg-gray-500 text-white ${editing ? '' : 'hidden'}`}>Hủy</button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Lịch học</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="bg-gray-100"><th className="p-3">Thứ</th><th className="p-3">Thời gian</th><th className="p-3">Môn học</th><th className="p-3">Phòng</th></tr></thead>
              <tbody>
                {Object.entries(MOCK_DATA.schedules[studentId].reduce((acc, entry)=>{ if(!acc[entry.day]) acc[entry.day]=[]; acc[entry.day].push(entry); return acc; }, {})).map(([day, entries])=>{
                  return entries.map((entry, idx)=>(
                    <tr key={day+idx}>
                      {idx===0 && <td className="p-3 border-b font-semibold" rowSpan={entries.length}>{day}</td>}
                      <td className="p-3 border-b">{entry.time}</td>
                      <td className="p-3 border-b">{entry.subject}</td>
                      <td className="p-3 border-b">{entry.room}</td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Kết quả học tập</h2>
          <div className="mb-4 flex gap-3">
            {semesters.map(sem=>(
              <button key={sem} onClick={()=>setSelectedSemester(sem)} className={`px-4 py-2 rounded ${selectedSemester===sem ? 'border-b-4 border-violet-600 font-semibold' : 'bg-gray-100'}`}>{sem}</button>
            ))}
          </div>
          {selectedSemester && renderSemesterTable(selectedSemester)}
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Thông tin học phí</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border"><h3 className="text-gray-500">Phải đóng</h3><p className="text-xl font-bold">{MOCK_DATA.tuition[studentId].due}</p></div>
            <div className="bg-white p-4 rounded-lg border"><h3 className="text-gray-500">Đã đóng</h3><p className="text-xl font-bold">{MOCK_DATA.tuition[studentId].paid}</p></div>
            <div className="bg-white p-4 rounded-lg border"><h3 className="text-gray-500">Trạng thái</h3><p className="text-xl font-bold text-green-600">{MOCK_DATA.tuition[studentId].status}</p></div>
          </div>
          <h3 className="text-xl font-bold mb-2">Lịch sử giao dịch</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="bg-gray-100"><th className="p-3">Ngày</th><th className="p-3">Số tiền</th><th className="p-3">Phương thức</th></tr></thead>
              <tbody>{MOCK_DATA.tuition[studentId].history.map((h,i)=>(<tr key={i}><td className="p-3 border-b">{h.date}</td><td className="p-3 border-b">{h.amount}</td><td className="p-3 border-b">{h.method}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
