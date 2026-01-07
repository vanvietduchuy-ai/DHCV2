
import React from 'react';
import { Task, User } from '../types';
import TaskCard from './TaskCard';

interface DashboardProps {
  tasks: Task[];
  allTasks: Task[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  currentUser: User;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, allTasks, onDelete, onToggleStatus, currentUser }) => {
  const isManager = currentUser.role !== 'Cán bộ';
  const myTasks = tasks.filter(t => t.ownerEmail === currentUser.email);
  const assignedByMe = allTasks.filter(t => t.createdByEmail === currentUser.email && t.ownerEmail !== currentUser.email);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      <div className="dashboard-header">
         <div style={{position: 'relative', zIndex: 1}}>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
               <span style={{padding: '0.25rem 0.75rem', background: 'var(--police-gold)', color: 'var(--navy-900)', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', borderRadius: '0.5rem'}}>
                  06/01/2026
               </span>
               <span style={{padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)'}}>
                  {currentUser.position}
               </span>
            </div>
            
            <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem'}}>
               <div>
                  <h2 style={{fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.25rem'}}>
                     Chào đồng chí, <span style={{color: 'var(--police-gold)'}}>{currentUser.name}</span>
                  </h2>
                  <p style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500}}>Báo cáo tình hình công tác trong ngày.</p>
               </div>
               
               <div className="stats-grid">
                  <div className="stat-card">
                     <p style={{fontSize: '9px', fontWeight: 900, color: 'var(--police-gold)', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.1em'}}>Điểm thi đua</p>
                     <p style={{fontSize: '1.5rem', fontWeight: 900}}>{currentUser.points || 0}</p>
                  </div>
                  <div className="stat-card">
                     <p style={{fontSize: '9px', fontWeight: 900, color: 'var(--police-gold)', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.1em'}}>Độ uy tín</p>
                     <p style={{fontSize: '1.5rem', fontWeight: 900, color: '#4ade80'}}>{currentUser.prestige || 100}%</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <section>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', padding: '0 0.5rem'}}>
           <h3 style={{fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
             <div style={{width: '0.5rem', height: '1.5rem', background: 'var(--police-red)', borderRadius: '1rem'}}></div>
             Nhiệm vụ trực tiếp đảm nhiệm
           </h3>
           <span style={{background: 'var(--slate-100)', color: 'var(--slate-500)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '10px', fontWeight: 'bold'}}>{myTasks.length} nhiệm vụ</span>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
          {myTasks.length === 0 ? (
            <div style={{padding: '5rem 0', background: 'var(--white)', borderRadius: '2.5rem', border: '2px dashed var(--slate-200)', textAlign: 'center', color: 'var(--slate-300)'}}>
               <i className="fa-solid fa-clipboard-check" style={{fontSize: '2.5rem', opacity: 0.1, marginBottom: '1rem'}}></i>
               <p style={{fontSize: '0.75rem', fontWeight: 'bold', fontStyle: 'italic'}}>Chưa có nhiệm vụ nào.</p>
            </div>
          ) : (
            myTasks.sort((a,b) => b.updatedAt - a.updatedAt).map(task => (
              <TaskCard key={task.id} task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} currentUser={currentUser} />
            ))
          )}
        </div>
      </section>

      {isManager && assignedByMe.length > 0 && (
        <section style={{marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--slate-200)'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', padding: '0 0.5rem'}}>
             <h3 style={{fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
               <div style={{width: '0.5rem', height: '1.5rem', background: 'var(--police-gold)', borderRadius: '1rem'}}></div>
               Giám sát nhiệm vụ đã phân công
             </h3>
             <span style={{background: 'var(--slate-100)', color: 'var(--slate-500)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '10px', fontWeight: 'bold'}}>{assignedByMe.length} cán bộ</span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            {assignedByMe.sort((a,b) => b.updatedAt - a.updatedAt).map(task => (
              <TaskCard key={task.id} task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} currentUser={currentUser} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
