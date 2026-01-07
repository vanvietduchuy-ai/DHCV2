
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface HRManagementProps {
  users: User[];
  onUpdateUser: (user: User) => void;
}

const HRManagement: React.FC<HRManagementProps> = ({ users, onUpdateUser }) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser({ ...user });
  };

  const handleSave = () => {
    if (editingUser) {
      onUpdateUser(editingUser);
      setEditingUser(null);
      alert("Cập nhật thông tin cán bộ thành công!");
    }
  };

  const roles: UserRole[] = ['Super Admin', 'Quản lý', 'Cán bộ'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Quản lý Nhân sự</h2>
            <p className="text-xs text-slate-500">Danh sách Cán bộ Chiến sĩ trong đơn vị</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors flex items-center gap-2">
            <i className="fa-solid fa-user-plus"></i>
            Thêm CBCS mới
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                <th className="px-6 py-4">Đồng chí</th>
                <th className="px-6 py-4">Chức vụ / Đơn vị</th>
                <th className="px-6 py-4">Quyền hạn</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-[10px] text-slate-500">ID: {user.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold text-slate-700">{user.position}</div>
                    <div className="text-[10px] text-slate-500">{user.department}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      user.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'Quản lý' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      user.status === 'Hoạt động' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
                    >
                      <i className="fa-solid fa-user-pen"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-purple-600 p-6 text-white flex items-center justify-between">
              <h3 className="text-lg font-bold">Chỉnh sửa thông tin CBCS</h3>
              <button onClick={() => setEditingUser(null)} className="text-white/80 hover:text-white">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <div className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Họ và tên</label>
                  <input 
                    type="text" 
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Quyền hạn</label>
                  <select 
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value as UserRole})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Chức vụ</label>
                  <input 
                    type="text" 
                    value={editingUser.position}
                    onChange={(e) => setEditingUser({...editingUser, position: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Trạng thái</label>
                  <select 
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({...editingUser, status: e.target.value as any})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Khóa">Khóa tài khoản</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Đặt lại mật khẩu (Ghi đè)</label>
                 <div className="flex gap-2">
                    <input 
                      type="password" 
                      placeholder="Mật khẩu mới..."
                      className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
                    />
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black">Reset</button>
                 </div>
                 <p className="text-[9px] text-slate-400 mt-1 italic">Mật khẩu sẽ được cập nhật ngay khi bấm Lưu.</p>
              </div>

              <div className="flex gap-3 pt-6">
                <button 
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 shadow-lg shadow-purple-100"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRManagement;
