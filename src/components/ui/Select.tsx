import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, helperText, error, fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1 ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
