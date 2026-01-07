
import React, { useState } from 'react';
import { Task, User } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  currentUser: User;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onToggleStatus, currentUser }) => {
  const [expanded, setExpanded] = useState(false);
  const isOwner = currentUser.email === task.ownerEmail;
  const isCreator = currentUser.email === task.createdByEmail;

  const deadlineDate = new Date(task.deadline);
  const REFERENCE_DATE = new Date('2026-01-06');
  const isOverdue = task.status === 'Đang làm' && deadlineDate.getTime() < REFERENCE_DATE.getTime();
  const isApproaching = task.status === 'Đang làm' && !isOverdue && (deadlineDate.getTime() - REFERENCE_DATE.getTime()) <= (2 * 24 * 60 * 60 * 1000);

  const cardStyle: React.CSSProperties = {
    backgroundColor: task.status === 'Hoàn thành' ? 'var(--slate-50)' : 'var(--white)',
    borderRadius: '1.5rem',
    border: '2px solid',
    borderColor: task.status === 'Hoàn thành' ? 'var(--slate-100)' : (isOverdue ? 'rgba(165, 28, 30, 0.3)' : 'var(--slate-200)'),
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    opacity: task.status === 'Hoàn thành' ? 0.8 : 1,
    transition: 'all 0.3s'
  };

  return (
    <div style={cardStyle}>
      <div style={{padding: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem'}} onClick={() => setExpanded(!expanded)}>
        <div style={{flex: 1, minWidth: 0}}>
           <div className="flex items-center gap-2 mb-2">
              <span className={`badge ${
                task.status === 'Hoàn thành' ? 'badge-success' :
                isOverdue ? 'badge-danger' : 
                isApproaching ? 'badge-warning' :
                'badge-warning'
              }`} style={{backgroundColor: task.status === 'Đang làm' && !isOverdue && !isApproaching ? 'var(--navy-50)' : undefined, color: task.status === 'Đang làm' && !isOverdue && !isApproaching ? 'var(--navy-900)' : undefined}}>
                {task.status === 'Hoàn thành' ? '🟢 Đã hoàn thành' : 
                 isOverdue ? '🔴 Quá hạn' : 
                 isApproaching ? '⚠️ Sắp hạn' : '🔵 Đang làm'}
              </span>
              <p style={{fontSize: '10px', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.1em'}}>Số: {task.number || 'Chưa rõ'}</p>
           </div>
           
           <h3 style={{fontSize: '1rem', fontWeight: 'bold', color: 'var(--navy-900)', textDecoration: task.status === 'Hoàn thành' ? 'line-through' : 'none'}}>
             {task.content}
           </h3>
           
           <div style={{display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1.25rem'}}>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-user-tie" style={{color: 'var(--police-gold)', fontSize: '10px'}}></i>
                <span style={{fontSize: '11px', fontWeight: 'bold', color: 'var(--slate-600)'}}>Chỉ huy: <span style={{color: 'var(--navy-900)'}}>{task.commanderName}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-user-shield" style={{color: 'var(--police-red)', fontSize: '10px'}}></i>
                <span style={{fontSize: '11px', fontWeight: 'bold', color: 'var(--slate-600)'}}>Cán bộ: <span style={{color: 'var(--navy-900)'}}>{task.officer}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar-day" style={{color: 'var(--slate-400)', fontSize: '10px'}}></i>
                <span style={{fontSize: '11px', fontWeight: 900, color: isOverdue ? 'var(--police-red)' : 'var(--slate-500)'}}>Hạn: {deadlineDate.toLocaleDateString('vi-VN')}</span>
              </div>
           </div>
        </div>
        <div style={{width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: 'var(--slate-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-400)', transition: 'transform 0.3s', transform: expanded ? 'rotate(180deg)' : 'none'}}>
          <i className="fa-solid fa-chevron-down" style={{fontSize: '12px'}}></i>
        </div>
      </div>

      {expanded && (
        <div style={{padding: '0 1.5rem 2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--slate-100)'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div style={{background: 'var(--police-cream)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid rgba(212, 175, 55, 0.2)'}}>
              <p style={{fontSize: '10px', fontWeight: 900, color: 'var(--police-red)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.2em'}}>
                <i className="fa-solid fa-list-check" style={{marginRight: '0.5rem'}}></i> Yêu cầu chi tiết
              </p>
              <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                {task.nextSteps.map((step, idx) => (
                  <li key={idx} style={{display: 'flex', gap: '1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-700)'}}>
                    <div style={{width: '1.25rem', height: '1.25rem', borderRadius: '4px', background: 'var(--white)', border: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, color: 'var(--police-gold)', flexShrink: 0}}>{idx + 1}</div>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {task.status === 'Hoàn thành' && (
              <div style={{background: 'var(--emerald-50)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--emerald-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                 <div className="flex items-center gap-3">
                    <i className="fa-solid fa-award" style={{color: 'var(--emerald-600)', fontSize: '1.25rem'}}></i>
                    <div>
                       <p style={{fontSize: '10px', fontWeight: 900, color: 'var(--emerald-600)', textTransform: 'uppercase'}}>Kết quả thi đua</p>
                       <p style={{fontSize: '0.75rem', fontWeight: 'bold', color: '#065f46'}}>+{task.points} điểm | Uy tín: {task.prestige}%</p>
                    </div>
                 </div>
              </div>
            )}

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--slate-100)'}}>
               <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                  <span style={{fontSize: '9px', fontWeight: 900, color: 'var(--slate-300)', textTransform: 'uppercase'}}>Giao: {new Date(task.createdAt).toLocaleString('vi-VN')}</span>
                  {task.completedAt && <span style={{fontSize: '9px', fontWeight: 900, color: 'var(--emerald-600)', textTransform: 'uppercase'}}>Xong: {new Date(task.completedAt).toLocaleString('vi-VN')}</span>}
               </div>
               
               <div style={{display: 'flex', gap: '0.75rem'}}>
                 {isCreator && <button onClick={() => onDelete(task.id)} className="btn btn-outline" style={{padding: '0.5rem 1rem'}}>Xóa</button>}
                 {isOwner && task.status !== 'Hoàn thành' && (
                   <button onClick={() => onToggleStatus(task.id)} className="btn btn-primary" style={{padding: '0.75rem 1.5rem'}}>
                     <i className="fa-solid fa-paper-plane"></i> Báo cáo
                   </button>
                 )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
