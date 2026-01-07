
import React from 'react';
import { Task } from '../types';

interface HistoryProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ tasks, onDelete }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Nhật ký xử lý văn bản</h2>
          <p className="text-[10px] text-slate-400 italic">Lưu trữ tối đa {tasks.length} bản ghi gần nhất</p>
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <div className="py-20 bg-white rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 shadow-sm">
          <i className="fa-solid fa-clock-rotate-left text-3xl mb-3 opacity-10"></i>
          <p className="text-[11px] font-medium italic">Chưa ghi nhận lịch sử xử lý nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {tasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg p-4 border border-slate-200 card-shadow flex items-center justify-between gap-4">
               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                       {new Date(task.createdAt).toLocaleDateString('vi-VN')}
                     </span>
                     <p className="text-[10px] font-bold text-navy-600 uppercase truncate">{task.type}</p>
                  </div>
                  <h4 className="text-[12px] font-bold text-slate-700 line-clamp-1">{task.content}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Cán bộ: <span className="font-semibold">{task.officer}</span></p>
               </div>
               
               <div className="flex flex-col items-end gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                    task.priority === 'Cao' ? 'bg-red-50 text-red-600' :
                    task.priority === 'Trung bình' ? 'bg-amber-50 text-amber-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {task.priority}
                  </span>
                  <button 
                    onClick={() => onDelete(task.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-1"
                  >
                    <i className="fa-solid fa-trash-can text-xs"></i>
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
