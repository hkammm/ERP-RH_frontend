import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, LogIn } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          HR Management System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              placeholder="Enter your email"
            />

            <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        placeholder="Enter your password"
      />

            <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <input
            id="show-password"
            name="show-password"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="show-password" className="ml-2 block text-sm text-gray-900">
            Show password
          </label>
        </div>
      </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<LogIn size={18} />}
            >
              Sign in
            </Button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Login;