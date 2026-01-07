
export type Priority = 'Cao' | 'Trung bình' | 'Thấp';
export type TaskStatus = 'Đang làm' | 'Hoàn thành';
export type UserRole = 'Super Admin' | 'Quản lý' | 'Cán bộ';

export interface User {
  id: string;
  username: string; // Tên đăng nhập duy nhất
  email: string;
  name: string;
  role: UserRole;
  position: string;
  department: string;
  status: 'Hoạt động' | 'Khóa';
  password?: string;
  points?: number;
  prestige?: number;
}

export interface Task {
  id: string;
  type: string;
  number?: string;
  content: string;
  lead: string;
  officer: string;
  ownerId: string;
  ownerEmail: string;
  createdByEmail: string;
  commanderName: string;
  deadline: string;
  priority: Priority;
  status: TaskStatus;
  nextSteps: string[];
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
  rawInput: string;
  prestige: number;
  points: number;
}

export interface AnalysisResponse {
  type: string;
  number?: string;
  content: string;
  lead: string;
  deadline: string;
  priority: Priority;
  nextSteps: string[];
}
