// src/components/employee/EmployeeForm.tsx
import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Employee } from '../../types';
import { departments } from '../../data/mockData';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<Employee> & {
    password?: string;
    role: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    departmentId: '',
    position: '',
    status: 'active',
    contractType: 'full_time',
    hireDate: new Date().toISOString().split('T')[0],
    manager: false,
    password: '',
    role: 'employee',
  });

  useEffect(() => {
    if (employee) {
      setFormData((prev) => ({
        ...prev,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        address: employee.address,
        departmentId: employee.departmentId,
        position: employee.position,
        status: employee.status,
        contractType: employee.contractType,
        hireDate: employee.hireDate,
        manager: employee.manager || false,
        role: employee.role || 'employee',
      }));
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData };
    if (!employee && !formData.password) {
      alert("Le mot de passe est requis pour un nouvel employé.");
      return;
    }
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-[80vh] overflow-y-auto p-4 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
        <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Department"
          name="departmentId"
          value={formData.departmentId}
          onChange={handleChange}
          options={[
            { value: '', label: 'Select a department' },
            ...departments.map(d => ({ value: d.id, label: d.name })),
          ]}
          required
        />
        <Input label="Position" name="position" value={formData.position} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'on_leave', label: 'On Leave' },
            { value: 'resigned', label: 'Resigned' },
          ]}
        />
        <Select
          label="Contract Type"
          name="contractType"
          value={formData.contractType}
          onChange={handleChange}
          options={[
            { value: 'full_time', label: 'Full Time' },
            { value: 'part_time', label: 'Part Time' },
            { value: 'contract', label: 'Contract' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Hire Date" name="hireDate" type="date" value={formData.hireDate} onChange={handleChange} />
      </div>

      <hr className="my-6" />
      <h3 className="text-lg font-semibold">Login Informations</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required={!employee}
        />
      </div>

      <Select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={[
          { value: 'employee', label: 'Employee' },
          { value: 'hr_manager', label: 'HR Manager' },
        ]}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>
          {employee ? 'Update Employee' : 'Create Employee'}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
