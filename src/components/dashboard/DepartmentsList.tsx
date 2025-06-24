import React from 'react';
import { Department } from '../../types';
import { Users, ChevronRight } from 'lucide-react';

interface DepartmentsListProps {
  departments: Department[];
  onViewDepartment: (id: string) => void;
}

const DepartmentsList: React.FC<DepartmentsListProps> = ({ departments, onViewDepartment }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Departments Overview</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {departments.map((department) => (
          <li key={department.id}>
            <button
              onClick={() => onViewDepartment(department.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <Users size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{department.name}</p>
                  <p className="text-sm text-gray-500">{department.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 text-right">
                  <span className="text-sm font-semibold text-gray-900">{department.employeeCount}</span>
                  <p className="text-xs text-gray-500">Employees</p>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsList;