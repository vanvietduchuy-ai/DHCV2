
import React, { useState } from 'react';

interface PasswordChangeProps {
  userName: string;
  onComplete: (newPwd: string) => void;
}

const PasswordChange: React.FC<PasswordChangeProps> = ({ userName, onComplete }) => {
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự để đảm bảo an ninh ngành.");
      return;
    }
    if (pwd === '123456') {
      setError("Vui lòng không sử dụng mật khẩu mặc định.");
      return;
    }
    if (pwd !== confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    onComplete(pwd);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-300">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-police-gold/10 text-police-gold rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 border border-police-gold/20 shadow-inner">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h2 className="text-xl font-black text-slate-900 uppercase">Yêu cầu Bảo mật</h2>
          <p className="text-[11px] text-slate-500 mt-2 font-medium leading-relaxed">
            Đồng chí <span className="font-bold text-police-red">{userName}</span> đang sử dụng mật khẩu mặc định. Vui lòng cập nhật mật khẩu mới để bảo vệ dữ liệu nghiệp vụ.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Mật khẩu mới</label>
            <input 
              type="password" 
              required
              placeholder="Nhập ít nhất 6 ký tự"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-police-gold outline-none shadow-inner"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              required
              placeholder="Nhập lại mật khẩu mới"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-police-gold outline-none shadow-inner"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          {error && (
            <div className="bg-red-50 border-l-4 border-police-red p-2 rounded">
               <p className="text-[10px] text-police-red font-bold italic text-center">{error}</p>
            </div>
          )}
          <button 
            type="submit"
            className="w-full py-4 bg-navy-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl"
          >
            Cập nhật và Tiếp tục
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
