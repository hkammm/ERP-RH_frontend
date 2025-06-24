import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Trash2, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import OrgChart from '../components/orgChart/OrgChart';
import Modal from '../components/ui/Modal';
import DepartmentForm from '../components/department/DepartmentForm';
import { departments, employees, getDepartmentById, getEmployeeById } from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';

const DepartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [department, setDepartment] = useState(getDepartmentById(id || ''));
  const [departmentEmployees, setDepartmentEmployees] = useState(
    employees.filter(e => e.departmentId === id)
  );
  const [manager, setManager] = useState(
    department?.managerId ? getEmployeeById(department.managerId) : null
  );
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!department) {
      navigate('/departments');
    }
  }, [department, navigate]);

  const handleUpdateDepartment = (data: Partial<Department>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (department) {
        const updatedDepartment = {
          ...department,
          name: data.name || department.name,
          description: data.description || department.description,
          managerId: data.managerId || department.managerId,
        };
        setDepartment(updatedDepartment);
        
        // Update manager if changed
        if (data.managerId && data.managerId !== department.managerId) {
          setManager(getEmployeeById(data.managerId));
        }
      }
      
      setIsLoading(false);
      setIsEditModalOpen(false);
    }, 1000);
  };

  const handleDeleteDepartment = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      navigate('/departments');
    }, 1000);
  };

  if (!department) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/departments')}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-2"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Departments
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{department.name}</h1>
          <p className="text-gray-500 mt-1">{department.description}</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<Edit size={16} />}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            leftIcon={<Trash2 size={16} />}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card title="Department Information">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Department Name</p>
                <p className="font-medium">{department.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Created Date</p>
                <p className="font-medium">
                  {new Date(department.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Number of Employees</p>
                <div className="flex items-center">
                  <Badge variant="primary" className="mr-2">{department.employeeCount}</Badge>
                  <Users size={16} className="text-gray-400" />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Department Manager</p>
                {manager ? (
                  <div className="flex items-center">
                    <Avatar
                      src={manager.avatar}
                      name={`${manager.firstName} ${manager.lastName}`}
                      size="md"
                    />
                    <div className="ml-3">
                      <p className="font-medium">
                        {manager.firstName} {manager.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{manager.position}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm italic text-gray-500">No manager assigned</p>
                )}
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card title="Department Members">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hire Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {departmentEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar src={employee.avatar} name={`${employee.firstName} ${employee.lastName}`} size="sm" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.firstName} {employee.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={
                            employee.status === 'active'
                              ? 'success'
                              : employee.status === 'on_leave'
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {employee.status === 'active'
                            ? 'Active'
                            : employee.status === 'on_leave'
                            ? 'On Leave'
                            : 'Resigned'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <OrgChart departments={[department]} employees={departmentEmployees} />

      {/* Edit Department Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Department"
      >
        <DepartmentForm
          department={department}
          onSubmit={handleUpdateDepartment}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Department"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteDepartment} isLoading={isLoading}>
              Delete
            </Button>
          </>
        }
      >
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete the department "{department.name}"?
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This action cannot be undone. All employees in this department will need to be
            reassigned.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default DepartmentDetail;