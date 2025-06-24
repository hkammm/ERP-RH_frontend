import React from 'react';
import { Department, Employee } from '../../types';
import Avatar from '../ui/Avatar';

interface OrgChartProps {
  departments: Department[];
  employees: Employee[];
}

const OrgChart: React.FC<OrgChartProps> = ({ departments, employees }) => {
  // Get department manager info
  const getDepartmentManager = (departmentId: string) => {
    const department = departments.find(d => d.id === departmentId);
    if (!department || !department.managerId) return null;
    
    return employees.find(e => e.id === department.managerId);
  };
  
  // Get employees for a department
  const getDepartmentEmployees = (departmentId: string) => {
    return employees.filter(e => e.departmentId === departmentId && !e.manager);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Organizational Chart</h3>
      
      <div className="overflow-auto pb-6">
        <div className="min-w-max">
          {/* Root node */}
          <div className="flex justify-center mb-8">
            <div className="bg-blue-100 text-blue-800 py-3 px-6 rounded-lg shadow-sm border border-blue-200">
              <p className="text-lg font-medium">Organization</p>
            </div>
          </div>
          
          {/* Vertical line */}
          <div className="flex justify-center">
            <div className="w-px h-12 bg-gray-300"></div>
          </div>
          
          {/* Departments level */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center gap-x-12">
              {departments.map((department) => (
                <div key={department.id} className="flex flex-col items-center">
                  <div className="bg-teal-100 text-teal-800 py-2 px-4 rounded-lg shadow-sm border border-teal-200 w-48 text-center">
                    <p className="font-medium">{department.name}</p>
                    <p className="text-xs text-teal-600">{department.employeeCount} employees</p>
                  </div>
                  
                  {/* Vertical line */}
                  <div className="w-px h-8 bg-gray-300"></div>
                  
                  {/* Department manager */}
                  {(() => {
                    const manager = getDepartmentManager(department.id);
                    if (!manager) return null;
                    
                    return (
                      <div className="flex flex-col items-center">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 shadow-sm flex flex-col items-center w-40">
                          <Avatar 
                            src={manager.avatar} 
                            name={`${manager.firstName} ${manager.lastName}`} 
                            size="md" 
                          />
                          <p className="mt-2 font-medium text-sm">{manager.firstName} {manager.lastName}</p>
                          <p className="text-xs text-gray-500">{manager.position}</p>
                        </div>
                        
                        {/* Vertical line to team members */}
                        {getDepartmentEmployees(department.id).length > 0 && (
                          <div className="w-px h-8 bg-gray-300"></div>
                        )}
                        
                        {/* Team members */}
                        {getDepartmentEmployees(department.id).length > 0 && (
                          <div className="flex flex-wrap justify-center gap-4 max-w-md">
                            {getDepartmentEmployees(department.id).slice(0, 3).map((employee) => (
                              <div 
                                key={employee.id}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col items-center w-32"
                              >
                                <Avatar 
                                  src={employee.avatar} 
                                  name={`${employee.firstName} ${employee.lastName}`} 
                                  size="sm" 
                                />
                                <p className="mt-1 font-medium text-xs">{employee.firstName}</p>
                                <p className="text-xs text-gray-500 truncate w-full text-center">{employee.position}</p>
                              </div>
                            ))}
                            {getDepartmentEmployees(department.id).length > 3 && (
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm flex items-center justify-center w-20 h-16">
                                <p className="text-xs text-gray-500">+{getDepartmentEmployees(department.id).length - 3} more</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgChart;