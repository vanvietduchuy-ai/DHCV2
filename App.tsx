
import React, { useState, useEffect, useRef } from 'react';
import { analyzeDocument } from './services/geminiService';
import { Task, User } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Login from './components/Login';
import PasswordChange from './components/PasswordChange';
import HRManagement from './components/HRManagement';

const INITIAL_USERS: User[] = [
  { id: '1', username: 'thang.ld', email: 'thang.ld@ndh.ca.gov.vn', password: '123456', name: "Lê Đình Thắng", role: "Quản lý", position: "Tổ trưởng", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '2', username: 'tuan.lq', email: 'tuan.lq@ndh.ca.gov.vn', password: '123456', name: "Lê Quốc Tuấn", role: "Quản lý", position: "Tổ phó", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '3', username: 'hao.nt', email: 'hao.nt@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Thị Hảo", role: "Quản lý", position: "Tổ phó", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '4', username: 'dao.pta', email: 'dao.pta@ndh.ca.gov.vn', password: '123456', name: "Phan Thị Anh Đào", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '5', username: 'huong.nt', email: 'huong.nt@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Thị Hường", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '6', username: 'trang.nq', email: 'trang.nq@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Quỳnh Trang", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '7', username: 'hang.cp', email: 'hang.cp@ndh.ca.gov.vn', password: '123456', name: "Cao Phương Hằng", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '8', username: 'suong.ntt', email: 'suong.ntt@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Thị Thu Sương", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '9', username: 'nguyen.nd', email: 'nguyen.nd@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Đình Nguyên", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '10', username: 'quynh.hh', email: 'quynh.hh@ndh.ca.gov.vn', password: '123456', name: "Hoàng Hương Quỳnh", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '11', username: 'linh.nk', email: 'linh.nk@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Khánh Linh", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '12', username: 'hai.hp', email: 'hai.hp@ndh.ca.gov.vn', password: '123456', name: "Hoàng Phi Hải", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '13', username: 'hue.ntn', email: 'hue.ntn@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Thị Như Huế", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '14', username: 'huy.vvd', email: 'huy.vvd@ndh.ca.gov.vn', password: '123456', name: "Văn Viết Đức Huy", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '15', username: 'chung.lq', email: 'chung.lq@ndh.ca.gov.vn', password: '123456', name: "Lê Quang Chung", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '16', username: 'dat.dvt', email: 'dat.dvt@ndh.ca.gov.vn', password: '123456', name: "Dương Văn Tiến Đạt", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 }
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'hr'>('dashboard');
  const [inputText, setInputText] = useState('');
  const [selectedOfficerId, setSelectedOfficerId] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successTask, setSuccessTask] = useState<Task | null>(null);
  const [imageFile, setImageFile] = useState<{ data: string, mimeType: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showInputModal, setShowInputModal] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user_cap_v13');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    
    const savedTasks = localStorage.getItem('tasks_cap_v13');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    
    const savedUsers = localStorage.getItem('users_cap_v13');
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    else {
      setUsers(INITIAL_USERS);
      localStorage.setItem('users_cap_v13', JSON.stringify(INITIAL_USERS));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks_cap_v13', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('users_cap_v13', JSON.stringify(users));
  }, [users]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('auth_user_cap_v13', JSON.stringify(user));
    if (user.password === '123456') setShowPasswordChange(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('auth_user_cap_v13');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImageFile({ data: base64String, mimeType: file.type });
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!currentUser || !selectedOfficerId) {
      setError("Vui lòng chọn cán bộ tiếp nhận.");
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeDocument(inputText, imageFile || undefined);
      const officer = users.find(u => u.id === selectedOfficerId);
      if (!officer) throw new Error("Cán bộ không tồn tại");

      const newTask: Task = {
        id: crypto.randomUUID(),
        ...analysis,
        officer: officer.name,
        ownerId: officer.id,
        ownerEmail: officer.email,
        createdByEmail: currentUser.email,
        commanderName: currentUser.name,
        status: 'Đang làm',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        rawInput: inputText,
        prestige: 100,
        points: 0
      };

      setTasks(prev => [newTask, ...prev]);
      setSuccessTask(newTask);
      setInputText('');
      setPreviewUrl(null);
      setImageFile(null);
      setSelectedOfficerId("");
      setShowInputModal(false);
      setActiveTab('dashboard');
    } catch (err: any) {
      console.error(err);
      setError("Hệ thống trích xuất văn bản gặp lỗi. Đồng chí vui lòng thử lại.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleToggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const isCompleting = t.status === 'Đang làm';
        let awardedPoints = 0;
        let penaltyPrestige = 0;

        if (isCompleting) {
          const deadline = new Date(t.deadline).getTime();
          if (Date.now() <= deadline) { awardedPoints = 10; }
          else { awardedPoints = 5; penaltyPrestige = 10; }

          setUsers(prevUsers => prevUsers.map(u => {
            if (u.id === t.ownerId) {
              return {
                ...u,
                points: (u.points || 0) + awardedPoints,
                prestige: Math.max(0, (u.prestige || 100) - penaltyPrestige)
              };
            }
            return u;
          }));
        }

        return {
          ...t,
          status: isCompleting ? 'Hoàn thành' : 'Đang làm',
          completedAt: isCompleting ? Date.now() : undefined,
          updatedAt: Date.now(),
          points: awardedPoints,
          prestige: 100 - penaltyPrestige
        };
      }
      return t;
    }));
  };

  const handleUpdatePassword = (newPassword: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, password: newPassword };
      setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
      localStorage.setItem('auth_user_cap_v13', JSON.stringify(updatedUser));
      setShowPasswordChange(false);
      alert("Đồng chí đã cập nhật mật khẩu thành công!");
    }
  };

  const deleteTask = (id: string) => {
    if (window.confirm("Đồng chí có chắc chắn muốn xóa nhiệm vụ này?")) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  if (!currentUser) return <Login onLogin={handleLogin} masterData={users} />;

  const visibleTasks = currentUser.role === 'Quản lý' || currentUser.role === 'Super Admin'
    ? tasks.filter(t => t.ownerEmail === currentUser.email || t.createdByEmail === currentUser.email)
    : tasks.filter(t => t.ownerEmail === currentUser.email);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
           <div className="emblem-container">
             <img src="https://upload.wikimedia.org/wikipedia/vi/1/1b/Huy_hi%E1%BB%87u_C%C3%B4ng_an_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam.png" alt="Huy hiệu" />
           </div>
           <h1 style={{fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center'}}>Công an Phường</h1>
           <p style={{fontSize: '11px', color: 'var(--police-gold)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '0.5rem', textAlign: 'center', letterSpacing: '0.25em'}}>Nam Đông Hà</p>
        </div>
        
        <nav className="sidebar-nav">
          <button onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <i className="fa-solid fa-layer-group"></i> Dashboard
          </button>
          <button onClick={() => setActiveTab('history')} className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}>
            <i className="fa-solid fa-book-journal-whills"></i> Nhật ký công tác
          </button>
          {currentUser.role === 'Quản lý' && (
            <button onClick={() => setActiveTab('hr')} className={`nav-item ${activeTab === 'hr' ? 'active' : ''}`}>
              <i className="fa-solid fa-id-card-clip"></i> Quản lý Cán bộ
            </button>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-badge">
             <div className="avatar">{currentUser.name.charAt(0)}</div>
             <div style={{minWidth: 0}}>
                <p style={{fontSize: '11px', fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{currentUser.name}</p>
                <button onClick={handleLogout} style={{fontSize: '9px', fontWeight: 'bold', color: 'var(--police-gold)', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer'}}>Thoát hệ thống</button>
             </div>
          </div>
        </div>
      </aside>

      <div className="main-content">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} user={currentUser} onLogout={handleLogout} />

        <main className="container">
           {activeTab === 'dashboard' && (
             <Dashboard tasks={visibleTasks} allTasks={tasks} onDelete={deleteTask} onToggleStatus={handleToggleTaskStatus} currentUser={currentUser} />
           )}
           {activeTab === 'history' && <History tasks={visibleTasks} onDelete={deleteTask} />}
           {activeTab === 'hr' && currentUser.role === 'Quản lý' && (
             <HRManagement users={users} onUpdateUser={u => setUsers(prev => prev.map(us => us.id === u.id ? u : us))} />
           )}
        </main>

        {successTask && (
          <div className="modal-overlay">
             <div className="modal-content animate-zoom" style={{maxWidth: '28rem', textAlign: 'center'}}>
                <div style={{marginBottom: '1.5rem'}}>
                   <div style={{width: '80px', height: '80px', background: 'var(--emerald-50)', color: 'var(--emerald-600)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 1rem', fontSize: '2rem', border: '1px solid var(--emerald-100)'}}>
                      <i className="fa-solid fa-circle-check" style={{margin: 'auto'}}></i>
                   </div>
                   <h3 style={{fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--navy-900)'}}>Giao việc thành công</h3>
                   <p style={{fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '0.5rem'}}>
                      Đã phân công nhiệm vụ cho đồng chí <span style={{color: 'var(--police-red)', fontWeight: 'bold'}}>{successTask.officer}</span>.
                   </p>
                </div>

                <div style={{background: 'var(--slate-50)', padding: '1.25rem', borderRadius: '1.25rem', border: '1px solid var(--slate-200)', marginBottom: '1.5rem'}}>
                   <p style={{fontSize: '10px', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.5rem'}}>Tóm tắt nhiệm vụ</p>
                   <table style={{width: '100%', fontSize: '11px', fontWeight: 'bold', color: 'var(--navy-900)', textAlign: 'left'}}>
                      <tbody>
                         <tr>
                            <td style={{padding: '0.5rem 0', color: 'var(--slate-400)', width: '33%'}}>Số hiệu</td>
                            <td style={{padding: '0.5rem 0'}}>{successTask.number || 'Chưa rõ'}</td>
                         </tr>
                         <tr>
                            <td style={{padding: '0.5rem 0', color: 'var(--slate-400)'}}>Hạn báo cáo</td>
                            <td style={{padding: '0.5rem 0', color: 'var(--police-red)'}}>{new Date(successTask.deadline).toLocaleDateString('vi-VN')}</td>
                         </tr>
                      </tbody>
                   </table>
                </div>

                <button onClick={() => setSuccessTask(null)} className="btn btn-navy w-full">Xác nhận và đóng</button>
             </div>
          </div>
        )}

        {currentUser.role !== 'Cán bộ' && (
          <button 
            onClick={() => { setShowInputModal(true); setSuccessTask(null); }}
            className="btn btn-primary"
            style={{position: 'fixed', bottom: '5rem', right: '1.5rem', width: '3.5rem', height: '3.5rem', borderRadius: '50%', zIndex: 140, padding: 0}}
          >
            <i className="fa-solid fa-plus" style={{fontSize: '1.25rem'}}></i>
          </button>
        )}

        <nav className="mobile-nav">
           <button onClick={() => setActiveTab('dashboard')} className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
              <i className="fa-solid fa-house-shield" style={{fontSize: '1.125rem'}}></i>
              <span>Chính</span>
           </button>
           <button onClick={() => setActiveTab('history')} className={`mobile-nav-item ${activeTab === 'history' ? 'active' : ''}`}>
              <i className="fa-solid fa-clock-rotate-left" style={{fontSize: '1.125rem'}}></i>
              <span>Lịch sử</span>
           </button>
        </nav>
      </div>

      {showInputModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-zoom" style={{borderTop: '8px solid var(--police-red)'}}>
             <div className="flex justify-between items-center mb-8">
                <h3 style={{fontSize: '1.25rem', fontWeight: 900, color: 'var(--police-red)', textTransform: 'uppercase'}}>Giao nhiệm vụ nghiệp vụ</h3>
                <button onClick={() => setShowInputModal(false)} style={{width: '2.5rem', height: '2.5rem', background: 'var(--slate-100)', borderRadius: '50%', border: 'none', color: 'var(--slate-400)'}}><i className="fa-solid fa-xmark"></i></button>
             </div>
             
             <div className="space-y-4">
                <div className="input-group">
                  {!previewUrl ? (
                    <button onClick={() => fileInputRef.current?.click()} style={{width: '100%', padding: '3rem 1rem', border: '2px dashed rgba(212, 175, 55, 0.3)', borderRadius: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--slate-400)', background: 'rgba(248, 250, 252, 0.5)'}}>
                      <i className="fa-solid fa-camera-viewfinder" style={{fontSize: '2rem', color: 'rgba(212, 175, 55, 0.6)'}}></i>
                      <span style={{fontSize: '10px', fontWeight: 900, textTransform: 'uppercase'}}>Chụp văn bản chỉ đạo</span>
                    </button>
                  ) : (
                    <div style={{position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', background: 'var(--navy-950)', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <img src={previewUrl} style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}} />
                      <button onClick={() => {setPreviewUrl(null); setImageFile(null);}} style={{position: 'absolute', top: '0.75rem', right: '0.75rem', width: '2rem', height: '2rem', background: 'rgba(165, 28, 30, 0.9)', color: 'var(--white)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none'}}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} style={{display: 'none'}} accept="image/*" capture="environment" onChange={handleFileChange} />
                </div>

                <div className="input-group">
                  <label className="label">Đồng chí tiếp nhận</label>
                  <select value={selectedOfficerId} onChange={e => setSelectedOfficerId(e.target.value)} className="select">
                    <option value="">-- Chọn cán bộ --</option>
                    {users.filter(u => u.status === 'Hoạt động').map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.position})</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label className="label">Nội dung yêu cầu</label>
                  <textarea value={inputText} onChange={e => setInputText(e.target.value)} className="textarea" style={{height: '6rem', resize: 'none'}} placeholder="Nhập tóm tắt yêu cầu..." />
                </div>

                {error && <p style={{fontSize: '11px', color: 'var(--police-red)', fontWeight: 'bold', fontStyle: 'italic', borderLeft: '4px solid var(--police-red)', paddingLeft: '0.5rem'}}>{error}</p>}

                <button onClick={handleAnalyze} disabled={isAnalyzing || (!inputText && !imageFile) || !selectedOfficerId} className="btn btn-primary w-full" style={{padding: '1.25rem', opacity: (isAnalyzing || (!inputText && !imageFile) || !selectedOfficerId) ? 0.5 : 1}}>
                   {isAnalyzing ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Đang xử lý...</> : 'Xác nhận giao nhiệm vụ'}
                </button>
             </div>
          </div>
        </div>
      )}

      {showPasswordChange && <PasswordChange userName={currentUser.name} onComplete={handleUpdatePassword} />}
    </div>
  );
};

export default App;
