
import React, { useState } from 'react';
import { User } from '../types';

interface HeaderProps {
  activeTab: 'dashboard' | 'history' | 'hr';
  setActiveTab: (tab: 'dashboard' | 'history' | 'hr') => void;
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, user, onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'var(--white)',
    borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 140,
    boxShadow: 'var(--shadow-sm)'
  };

  const navContainerStyle: React.CSSProperties = {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '0 1rem',
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const badgeStyle: React.CSSProperties = {
    fontSize: '8px',
    fontWeight: 900,
    textTransform: 'uppercase',
    padding: '0.125rem 0.375rem',
    borderRadius: '4px',
    border: '1px solid var(--slate-200)',
    backgroundColor: 'var(--slate-100)',
    color: 'var(--slate-600)',
    marginRight: '0.5rem'
  };

  return (
    <header style={headerStyle}>
      <div style={navContainerStyle}>
        <div className="flex items-center gap-2">
          <div style={{width: '40px', height: '40px', padding: '2px', background: 'var(--white)', borderRadius: '50%', boxShadow: 'var(--shadow-sm)'}}>
            <img 
               src="https://upload.wikimedia.org/wikipedia/vi/1/1b/Huy_hi%E1%BB%87u_C%C3%B4ng_an_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam.png" 
               alt="Huy hiệu" 
               style={{width: '100%', height: '100%', objectFit: 'contain'}}
             />
          </div>
          <div style={{display: 'none'}} className="sm-block">
            <h1 style={{fontWeight: 900, color: 'var(--police-red)', fontSize: '0.875rem', textTransform: 'uppercase', lineHeight: 1}}>Nam Đông Hà</h1>
            <p style={{fontSize: '8px', color: 'var(--police-gold)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em'}}>Quản trị Đơn vị</p>
          </div>
        </div>

        <nav style={{display: 'flex', gap: '4px', background: 'var(--slate-50)', padding: '4px', borderRadius: '12px', border: '1px solid var(--slate-100)'}}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '0.375rem 1rem',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'dashboard' ? 'var(--police-red)' : 'transparent',
              color: activeTab === 'dashboard' ? 'var(--white)' : 'var(--slate-500)'
            }}
          >
            Nhiệm vụ
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{
              padding: '0.375rem 1rem',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'history' ? 'var(--police-red)' : 'transparent',
              color: activeTab === 'history' ? 'var(--white)' : 'var(--slate-500)'
            }}
          >
            Lịch sử
          </button>
          {user.role === 'Quản lý' && (
            <button
              onClick={() => setActiveTab('hr')}
              style={{
                display: 'none',
                padding: '0.375rem 1rem',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'hr' ? 'var(--police-red)' : 'transparent',
                color: activeTab === 'hr' ? 'var(--white)' : 'var(--slate-500)'
              }}
              className="sm-flex"
            >
              Cán bộ
            </button>
          )}
        </nav>

        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--slate-100)'}}>
          <div style={{textAlign: 'right'}}>
            <div className="flex items-center">
              <span style={badgeStyle}>{user.role}</span>
              <p style={{fontWeight: 'bold', color: 'var(--navy-900)', fontSize: '0.875rem'}}>{user.name}</p>
            </div>
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              style={{fontSize: '9px', fontWeight: 900, color: 'var(--police-red)', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', marginTop: '2px'}}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-content animate-zoom" style={{maxWidth: '24rem', textAlign: 'center'}}>
            <div style={{marginBottom: '1.5rem'}}>
              <div style={{width: '64px', height: '64px', background: '#fef2f2', color: 'var(--police-red)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem', border: '1px solid #fee2e2'}}>
                <i className="fa-solid fa-person-running"></i>
              </div>
              <h3 style={{fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--navy-900)'}}>Xác nhận Đăng xuất</h3>
              <p style={{fontSize: '12px', color: 'var(--slate-500)', marginTop: '0.5rem', lineHeight: 1.5}}>
                Đồng chí có chắc chắn muốn kết thúc phiên làm việc không? Trân trọng.
              </p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem'}}>
              <button onClick={() => setShowLogoutConfirm(false)} className="btn btn-outline">Hủy bỏ</button>
              <button onClick={onLogout} className="btn btn-primary">Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
