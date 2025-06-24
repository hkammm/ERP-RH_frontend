import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { Department, Employee } from '../../types';
import { employees } from '../../data/mockData';

interface DepartmentFormProps {
  department?: Department;
  onSubmit: (data: Partial<Department>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  department,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<Department>>({
    name: '',
    description: '',
    managerId: '',
  });

  const [managers, setManagers] = useState<Employee[]>([]);

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        description: department.description,
        managerId: department.managerId,
      });
    }
    
    // Get all employees who can be managers
    const potentialManagers = employees.filter(
      (employee) => employee.manager || employee.position.toLowerCase().includes('manager')
    );
    setManagers(potentialManagers);
  }, [department]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Department Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter department name"
        required
        fullWidth
      />

      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter department description"
        fullWidth
      />

      <Select
        label="Department Manager"
        name="managerId"
        value={formData.managerId}
        onChange={handleChange}
        options={[
          { value: '', label: 'Select a manager' },
          ...managers.map((manager) => ({
            value: manager.id,
            label: `${manager.firstName} ${manager.lastName} (${manager.position})`,
          })),
        ]}
        fullWidth
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {department ? 'Update Department' : 'Create Department'}
        </Button>
      </div>
    </form>
  );
};

export default DepartmentForm;