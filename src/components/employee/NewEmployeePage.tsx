// src/pages/NewEmployeePage.tsx
import React, { useState } from 'react';
import EmployeeForm from '../../components/employee/EmployeeForm';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../services/employeeService';

const NewEmployeePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEmployee = async (data: any) => {
    try {
      setIsLoading(true);
      const result = await createEmployee(data);
      if (!result || result.error) throw new Error(result?.message || 'Something went wrong');

      alert('Employé créé avec succès !');
      navigate('/employees');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création de l\'employé');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Créer un nouvel employé</h1>
      <EmployeeForm
        onSubmit={handleCreateEmployee}
        onCancel={() => navigate('/employees')}
        isLoading={isLoading}
      />
    </div>
  );
};

export default NewEmployeePage;
