import React, { useEffect, useState } from 'react';
import { CalendarClock, Clock, FileText, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import StatCard from '../components/dashboard/StatCard';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { getMyEmployeeProfile } from '../services/employeeService';
import { Employee, Department } from '../types';

const EmployeeDashboard: React.FC = () => {
  const { currentUser } = useAuth();
    if (!currentUser) {
    return <p className="text-center text-gray-500">Veuillez vous connecter...</p>;
  }
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employee = await getMyEmployeeProfile();
        setEmployeeData(employee);

        // Charger le département correspondant
        const deptResponse = await fetch(`http://localhost:5000/api/departments/${employee.departmentId}`);
        const deptData = await deptResponse.json();
        setDepartment(deptData);
      } catch (error) {
        console.error('Erreur lors du chargement des données employé :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, {employeeData?.firstName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Available Leave Days"
          value="14"
          icon={<CalendarClock size={24} />}
          colorClass="bg-blue-500"
        />
        <StatCard
          title="Pending Approvals"
          value="2"
          icon={<FileText size={24} />}
          colorClass="bg-amber-500"
        />
        <StatCard
          title="Department Members"
          value={department?.employeeCount || 0}
          icon={<Users size={24} />}
          colorClass="bg-green-500"
        />
        <StatCard
          title="Working Hours"
          value="176h"
          icon={<Clock size={24} />}
          change={3}
          changeLabel="this month"
          colorClass="bg-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card title="Your Information">
            {employeeData ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <Avatar
                    src={employeeData.avatar}
                    name={`${employeeData.firstName} ${employeeData.lastName}`}
                    size="xl"
                  />
                  <h3 className="mt-4 text-lg font-medium">{employeeData.firstName} {employeeData.lastName}</h3>
                  <p className="text-gray-500">{employeeData.position}</p>
                  <Badge variant="primary" className="mt-2">
                    {department?.name}
                  </Badge>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium">{employeeData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm font-medium">{employeeData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hire Date</p>
                      <p className="text-sm font-medium">
                        {new Date(employeeData.hireDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge variant={employeeData.status === 'active' ? 'success' : 'warning'} size="sm" className="mt-1">
                        {employeeData.status === 'active' ? 'Active' : 'On Leave'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading your employee information...</p>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title="Upcoming Events">
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-blue-50 rounded-md">
                <div className="flex-shrink-0 bg-blue-500 text-white rounded-md w-12 h-12 flex items-center justify-center">
                  <span>15</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-semibold">Team Meeting</h4>
                  <p className="text-xs text-gray-600">June 15, 2025 • 10:00 AM - 11:30 AM</p>
                  <p className="text-xs text-gray-500 mt-1">Weekly team sync with your department members</p>
                </div>
              </div>

              <div className="flex items-start p-3 bg-green-50 rounded-md">
                <div className="flex-shrink-0 bg-green-500 text-white rounded-md w-12 h-12 flex items-center justify-center">
                  <span>22</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-semibold">Training Session</h4>
                  <p className="text-xs text-gray-600">June 22, 2025 • 2:00 PM - 4:00 PM</p>
                  <p className="text-xs text-gray-500 mt-1">New product training for all employees</p>
                </div>
              </div>

              <div className="flex items-start p-3 bg-amber-50 rounded-md">
                <div className="flex-shrink-0 bg-amber-500 text-white rounded-md w-12 h-12 flex items-center justify-center">
                  <span>30</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-semibold">Monthly Review</h4>
                  <p className="text-xs text-gray-600">June 30, 2025 • 11:00 AM - 12:00 PM</p>
                  <p className="text-xs text-gray-500 mt-1">One-on-one performance review with your manager</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
