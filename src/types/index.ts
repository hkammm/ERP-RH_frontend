export interface User {
  _id: string;
  email: string;
  role: string;
  token: string;
}

export interface Department {
  id: string;
  name: string;
  managerId?: string;
  description: string;
  employeeCount: number;
  createdAt: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  departmentId: string;
  position: string;
  hireDate: string;
  status: 'active' | 'on_leave' | 'resigned';
  contractType: 'full_time' | 'part_time' | 'contract';
  salary?: number;
  manager?: boolean;
  userId?: string;
  role: 'employee' | 'hr_manager'; // ✅ Add this line
}

export interface EmployeeStats {
  total: number;
  active: number;
  onLeave: number;
  resigned: number;
}

export interface DepartmentStats {
  total: number;
  avgEmployees: number;
  largestDepartment: string;
  smallestDepartment: string;
}
