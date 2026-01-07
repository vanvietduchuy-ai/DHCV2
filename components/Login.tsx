
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  masterData: User[];
}

const Login: React.FC<LoginProps> = ({ onLogin, masterData }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      setError("Vui lòng chọn đồng chí đăng nhập.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    setTimeout(() => {
      const user = masterData.find(u => u.id === selectedUserId && u.password === password);
      if (user) { onLogin(user); }
      else { setError("Mật khẩu xác thực không chính xác. Vui lòng kiểm tra lại."); }
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="login-bg">
      <div style={{width: '100%', maxWidth: '24rem', position: 'relative', zIndex: 10}}>
        <div style={{textAlign: 'center', marginBottom: '2.5rem'}}>
          <div style={{width: '120px', height: '120px', margin: '0 auto 1.5rem', background: 'var(--white)', padding: '0.5rem', borderRadius: '50%', boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)', border: '4px solid rgba(212, 175, 55, 0.2)'}}>
             <img 
               src="https://upload.wikimedia.org/wikipedia/vi/1/1b/Huy_hi%E1%BB%87u_C%C3%B4ng_an_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam.png" 
               alt="Huy hiệu CAND" 
               style={{width: '100%', height: '100%', objectFit: 'contain'}}
             />
          </div>
          <h1 style={{fontSize: '1.5rem', fontWeight: 900, color: 'var(--police-red)', textTransform: 'uppercase'}}>Hệ thống Quản trị</h1>
          <h2 style={{fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--police-gold)', textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: '0.5rem'}}>Công an Phường Nam Đông Hà</h2>
        </div>

        <form onSubmit={handleLogin} style={{background: 'rgba(255,255,255,0.95)', padding: '2.5rem', borderRadius: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', border: '1px solid var(--white)'}}>
          <div className="input-group">
            <label className="label">Đồng chí đăng nhập</label>
            <div style={{position: 'relative'}}>
              <i className="fa-solid fa-user-shield" style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--police-gold)', fontSize: '0.875rem', zIndex: 1}}></i>
              <select required value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="select" style={{paddingLeft: '2.75rem'}}>
                <option value="">-- Chọn tên cán bộ --</option>
                {masterData.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.position})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="label">Mật khẩu xác thực</label>
            <div style={{position: 'relative'}}>
              <i className="fa-solid fa-key" style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--police-gold)', fontSize: '0.875rem', zIndex: 1}}></i>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input" style={{paddingLeft: '2.75rem'}} />
            </div>
          </div>

          {error && (
            <div style={{background: '#fef2f2', borderLeft: '4px solid var(--police-red)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem'}}>
              <p style={{fontSize: '10px', color: 'var(--police-red)', fontWeight: 'bold', fontStyle: 'italic'}}>{error}</p>
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full" style={{padding: '1.25rem', opacity: isSubmitting ? 0.6 : 1}}>
            {isSubmitting ? 'Đang xác thực...' : 'Vào phiên công tác'}
          </button>
        </form>
        
        <div style={{marginTop: '3rem', textAlign: 'center'}}>
          <p style={{color: 'var(--slate-400)', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em'}}>Bản quyền © 2026 Tổ Tổng Hợp</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
