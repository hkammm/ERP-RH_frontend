import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Download, Upload } from 'lucide-react';
import { departments } from '../data/mockData';
import { Employee } from '../types';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmployeeForm from '../components/employee/EmployeeForm';
import { createEmployee, getAllEmployees } from '../services/employeeService';

const Employees: React.FC = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 👉 Fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployeeList(data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
        alert('Failed to fetch employee list.');
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employeeList.filter((employee) => {
    const searchMatch =
      search === '' ||
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase());

    const departmentMatch = departmentFilter === '' || employee.departmentId === departmentFilter;
    const statusMatch = statusFilter === '' || employee.status === statusFilter;

    return searchMatch && departmentMatch && statusMatch;
  });

  const handleCreateEmployee = async (data: any) => {
  setIsLoading(true);
  try {
    const newEmployee = await createEmployee(data);
    setEmployeeList((prev) => [...prev, newEmployee]);
    setIsModalOpen(false);
    setSelectedEmployee(null);
  } catch (error) {
    console.error('Erreur création :', error);
    alert("Erreur lors de la création de l'employé");
  } finally {
    setIsLoading(false);
  }
};

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'on_leave':
        return <Badge variant="warning">On Leave</Badge>;
      case 'resigned':
        return <Badge variant="danger">Resigned</Badge>;
      default:
        return <Badge variant="info">{status}</Badge>;
    }
  };

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find(d => d.id === departmentId);
    return department ? department.name : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-500 mt-1">Manage your organization's employees</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<Upload size={18} />}>Import</Button>
          <Button variant="outline" leftIcon={<Download size={18} />}>Export</Button>
          <Button leftIcon={<Plus size={18} />} onClick={openCreateModal}>New Employee</Button>
        </div>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Input
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              className="pl-10"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              options={[
                { value: '', label: 'All Departments' },
                ...departments.map(d => ({ value: d.id, label: d.name }))
              ]}
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'on_leave', label: 'On Leave' },
                { value: 'resigned', label: 'Resigned' },
              ]}
            />
            <Button variant="outline" leftIcon={<Filter size={18} />}>More Filters</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
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
                  <td className="px-6 py-4 text-sm text-gray-500">{employee.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{getDepartmentName(employee.departmentId)}</td>
                  <td className="px-6 py-4">{getStatusBadge(employee.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                    {employee.contractType ? employee.contractType.replace('_', ' ') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(employee.hireDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button onClick={() => openEditModal(employee)} className="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployee(null);
        }}
        title={selectedEmployee ? 'Edit Employee' : 'Create New Employee'}
        size="xl"
      >
        <EmployeeForm
          employee={selectedEmployee || undefined}
          onSubmit={handleCreateEmployee}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedEmployee(null);
          }}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Employees;
