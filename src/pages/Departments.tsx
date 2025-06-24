import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { departments } from '../data/mockData';
import { Department } from '../types';
import Button from '../components/ui/Button';
import DepartmentsList from '../components/dashboard/DepartmentsList';
import Modal from '../components/ui/Modal';
import DepartmentForm from '../components/department/DepartmentForm';
import { useNavigate } from 'react-router-dom';

const Departments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentList, setDepartmentList] = useState<Department[]>(departments);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleViewDepartment = (id: string) => {
    navigate(`/departments/${id}`);
  };

  const handleCreateDepartment = (data: Partial<Department>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newDepartment: Department = {
        id: (departmentList.length + 1).toString(),
        name: data.name || '',
        description: data.description || '',
        managerId: data.managerId,
        employeeCount: 0,
        createdAt: new Date().toISOString(),
      };
      
      setDepartmentList([...departmentList, newDepartment]);
      setIsLoading(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-500 mt-1">Manage your organization's departments</p>
        </div>
        <Button leftIcon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
          New Department
        </Button>
      </div>

      <DepartmentsList 
        departments={departmentList} 
        onViewDepartment={handleViewDepartment} 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Department"
      >
        <DepartmentForm
          onSubmit={handleCreateDepartment}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Departments;