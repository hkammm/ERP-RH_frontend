import { User, Department, Employee } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'hr_manager',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'employee',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const departments: Department[] = [
  {
    id: '1',
    name: 'Human Resources',
    managerId: '1',
    description: 'Oversees recruitment, employee development, and organizational culture',
    employeeCount: 8,
    createdAt: '2023-01-15T08:00:00Z',
  },
  {
    id: '2',
    name: 'Engineering',
    managerId: '3',
    description: 'Responsible for product development and technical implementation',
    employeeCount: 24,
    createdAt: '2023-01-15T08:00:00Z',
  },
  {
    id: '3',
    name: 'Marketing',
    managerId: '5',
    description: 'Handles brand strategy, campaigns, and market research',
    employeeCount: 12,
    createdAt: '2023-02-01T08:00:00Z',
  },
  {
    id: '4',
    name: 'Finance',
    managerId: '7',
    description: 'Manages budgeting, accounting, and financial planning',
    employeeCount: 10,
    createdAt: '2023-02-01T08:00:00Z',
  },
  {
    id: '5',
    name: 'Sales',
    managerId: '9',
    description: 'Drives revenue through customer acquisition and relationship management',
    employeeCount: 18,
    createdAt: '2023-03-15T08:00:00Z',
  },
];

export const employees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, New York, NY',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    departmentId: '1',
    position: 'HR Director',
    hireDate: '2020-01-15',
    status: 'active',
    contractType: 'full_time',
    manager: true,
    userId: '1'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '234-567-8901',
    address: '456 Oak St, Boston, MA',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    departmentId: '1',
    position: 'HR Specialist',
    hireDate: '2021-03-10',
    status: 'active',
    contractType: 'full_time',
    userId: '2'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    phone: '345-678-9012',
    address: '789 Pine St, Seattle, WA',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    departmentId: '2',
    position: 'Engineering Manager',
    hireDate: '2019-05-20',
    status: 'active',
    contractType: 'full_time',
    manager: true
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@example.com',
    phone: '456-789-0123',
    address: '101 Cedar St, San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    departmentId: '2',
    position: 'Senior Developer',
    hireDate: '2020-08-15',
    status: 'on_leave',
    contractType: 'full_time'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@example.com',
    phone: '567-890-1234',
    address: '202 Maple St, Chicago, IL',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    departmentId: '3',
    position: 'Marketing Director',
    hireDate: '2018-11-01',
    status: 'active',
    contractType: 'full_time',
    manager: true
  },
  {
    id: '6',
    firstName: 'Sarah',
    lastName: 'Taylor',
    email: 'sarah.taylor@example.com',
    phone: '678-901-2345',
    address: '303 Birch St, Austin, TX',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    departmentId: '3',
    position: 'Marketing Specialist',
    hireDate: '2021-02-15',
    status: 'resigned',
    contractType: 'part_time'
  }
];

export const employeeStats = {
  total: 78,
  active: 65,
  onLeave: 8,
  resigned: 5
};

export const departmentStats = {
  total: 5,
  avgEmployees: 15.6,
  largestDepartment: 'Engineering',
  smallestDepartment: 'Human Resources'
};

// Function to get all employees of a department
export const getEmployeesByDepartment = (departmentId: string): Employee[] => {
  return employees.filter(employee => employee.departmentId === departmentId);
};

// Function to get a department by id
export const getDepartmentById = (departmentId: string): Department | undefined => {
  return departments.find(department => department.id === departmentId);
};

// Function to get an employee by id
export const getEmployeeById = (employeeId: string): Employee | undefined => {
  return employees.find(employee => employee.id === employeeId);
};