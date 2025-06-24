import React from 'react';
import { Users, Building2, UserCheck, CalendarClock } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RecentEmployeesTable from '../components/dashboard/RecentEmployeesTable';
import DepartmentsList from '../components/dashboard/DepartmentsList';
import { useNavigate } from 'react-router-dom';
import { departments, employees, employeeStats, departmentStats } from '../data/mockData';

const HRDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleViewDepartment = (id: string) => {
    navigate(`/departments/${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back to your HR management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={employeeStats.total}
          icon={<Users size={24} />}
          change={8}
          changeLabel="from last month"
          colorClass="bg-blue-500"
        />
        <StatCard
          title="Active Employees"
          value={employeeStats.active}
          icon={<UserCheck size={24} />}
          change={5}
          changeLabel="from last month"
          colorClass="bg-green-500"
        />
        <StatCard
          title="Departments"
          value={departmentStats.total}
          icon={<Building2 size={24} />}
          colorClass="bg-teal-500"
        />
        <StatCard
          title="On Leave"
          value={employeeStats.onLeave}
          icon={<CalendarClock size={24} />}
          change={-2}
          changeLabel="from last month"
          colorClass="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentEmployeesTable employees={employees.slice(0, 5)} />
        </div>
        <div>
          <DepartmentsList 
            departments={departments.slice(0, 4)} 
            onViewDepartment={handleViewDepartment} 
          />
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;