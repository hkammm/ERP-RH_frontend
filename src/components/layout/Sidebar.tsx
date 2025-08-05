import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, Building2, BarChart3, FileText, LogOut,
  User, Calendar, Briefcase, 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getAllDepartments } from '../../services/departmentService';
import { getAllEmployees } from '../../services/employeeService';
import EventModal from '../dashboard/EventModal';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const [isDepartmentManager, setIsDepartmentManager] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [departmentsList, setDepartmentsList] = useState<any[]>([]);

  useEffect(() => {
    const checkDepartmentManager = async () => {
      if (!currentUser) return;
      try {
        const token = currentUser.token;
        const departments = await getAllDepartments(token);
        setDepartmentsList(departments);
        const employees = await getAllEmployees();
        // Find all managerIds from departments
        const managerIds = departments.map((d: any) => d.managerId);
        // Find the employee whose id matches any managerId
        const managerEmployee = employees.find((emp: any) => managerIds.includes(emp.id || emp._id));
        // If current user is that employee, set as department manager
        if (managerEmployee && (managerEmployee.userId === currentUser._id || managerEmployee.userId === currentUser.employeeId)) {
          setIsDepartmentManager(true);
        } else {
          setIsDepartmentManager(false);
        }
      } catch {
        setIsDepartmentManager(false);
      }
    };
    checkDepartmentManager();
  }, [currentUser]);

  const navItems = [
    {
      label: 'Dashboard',
      icon: <BarChart3 size={20} />,
      path: '/',
      roles: ['hr_manager', 'employee'],
    },
    {
      label: 'Employees',
      icon: <Users size={20} />,
      path: '/employees',
      roles: ['hr_manager'],
    },
    {
      label: 'Departments',
      icon: <Building2 size={20} />,
      path: '/departments',
      roles: ['hr_manager'],
    },
    {
      label: 'Reports',
      icon: <FileText size={20} />, 
      path: '/reports',
      roles: ['hr_manager'],
    },
    {
      label: 'My Profile',
      icon: <User size={20} />,
      path: '/profile',
      roles: ['hr_manager', 'employee'],
    },
    {
      label: 'Leave Management',
      icon: <Calendar size={20} />,
      path: '/leave',
      roles: ['hr_manager', 'employee'],
    },
    {
      label: 'Leave Calendar',
      icon: <Calendar size={20} />,
      path: '/leave-calendar',
      roles: ['hr_manager'],
    },
    {
      label: 'Shifts List',
      icon: <Briefcase size={20} />,
      path: '/shifts-list',
      roles: ['hr_manager', 'department_manager'],
    },
    {
      label: 'Make an Event',
      icon: <Calendar size={20} />,
      path: '/make-event',
      roles: ['hr_manager'],
      isEventButton: true,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto fixed left-0 top-0">
      <div className="px-6 py-6">
        <div className="flex items-center mb-8">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-800">HR System</span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.filter(item => {
            const userRoles = [currentUser?.role];
            if (isDepartmentManager) userRoles.push('department_manager');
            return item.roles.some(r => userRoles.includes(r));
          }).map((item) => (
            item.isEventButton ? (
              <button
                key={item.path}
                onClick={() => setShowEventModal(true)}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ) : (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            )
          ))}
        </nav>
        {showEventModal && (
          <EventModal
            isHR={true}
            departmentsList={departmentsList}
            onClose={() => setShowEventModal(false)}
            onEventCreated={() => setShowEventModal(false)}
          />
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200">
        <div className="px-6 py-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;