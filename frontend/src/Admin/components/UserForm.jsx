import React, { useState } from 'react';
import { DEPARTMENTS } from '../constants';

export default function UserForm({ initial, onCancel, onSave, saving }) {
  const [form, setForm] = useState(() => ({
    name: initial?.name || '',
    email: initial?.email || '',
    mobile: initial?.mobile || '',
    department: initial?.department || '',
    role: initial?.role || 'Student',
    password: '',
    confirmPassword: '',
  }));
  const [errors, setErrors] = useState({});

  const validators = {
    name: (v) => (!v.trim() ? 'Name is required' : v.trim().length < 2 ? 'Name must be at least 2 characters' : ''),
    email: (v) => {
      if (!v.trim()) return 'Email is required';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email';
    },
    mobile: (v) => {
      if (!v) return '';
      return /^[6-9]\d{9}$/.test(v) ? '' : 'Enter a valid 10-digit mobile (starts with 6-9)';
    },
    department: (v) => (!v ? 'Please select a department' : ''),
    password: (v) => {
      if (!v) return initial ? '' : 'Password is required';
      if (v.length < 8) return 'Password must be at least 8 characters';
      if (!/[a-z]/.test(v)) return 'Must contain a lowercase letter';
      if (!/[A-Z]/.test(v)) return 'Must contain an uppercase letter';
      if (!/\d/.test(v)) return 'Must contain a number';
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v)) return 'Must contain a special char';
      return '';
    },
    confirmPassword: (v) => {
      if (!initial && !v) return 'Confirm your password';
      if (form.password && v !== form.password) return 'Passwords do not match';
      return '';
    }
  };

  function setField(field, value) {
    if (field === 'mobile') value = value.replace(/\D/g, '').slice(0, 10);
    setForm((f) => ({ ...f, [field]: value }));
    if (validators[field]) setErrors((e) => ({ ...e, [field]: validators[field](value) }));
    if (field === 'password' && validators.confirmPassword) setErrors((e)=> ({ ...e, confirmPassword: validators.confirmPassword(form.confirmPassword) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = Object.fromEntries(Object.keys(validators).map((k) => [k, validators[k](form[k])]))
    if (initial && !form.password) newErrors.password = '';
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile || '',
      department: form.department,
      role: form.role, // retained for backend compatibility; UI hidden
      ...(form.password ? { password: form.password } : {}),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-slate-700 font-medium mb-1">Full Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter full name"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-slate-700 font-medium mb-1">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setField('email', e.target.value)}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="user@example.com"
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-slate-700 font-medium mb-1">Mobile</label>
        <input
          type="tel"
          value={form.mobile}
          onChange={(e) => setField('mobile', e.target.value)}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="10-digit mobile (optional)"
        />
        {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
      </div>

      <div>
        <label className="block text-slate-700 font-medium mb-1">Department</label>
        <select
          value={form.department}
          onChange={(e) => setField('department', e.target.value)}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition bg-white ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="" disabled>
            -- Select department --
          </option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department}</p>}
      </div>

      <div>
        <label className="block text-slate-700 font-medium mb-1">Set/Reset Password (optional)</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setField('password', e.target.value)}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          placeholder={initial ? 'Leave blank to keep unchanged' : 'Enter a strong password'}
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
      </div>

      {!initial && (
        <div>
          <label className="block text-slate-700 font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setField('confirmPassword', e.target.value)}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Re-enter password"
          />
          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={!!Object.values(errors).find(Boolean) || saving}
          className={`flex-1 py-2 text-white rounded-lg transition ${saving ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {saving ? 'Saving...' : initial ? 'Save Changes' : 'Create User'}
        </button>
        <button type="button" onClick={onCancel} className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
          Cancel
        </button>
      </div>
    </form>
  );
}
