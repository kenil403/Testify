import React, { useState } from 'react';
import { UserIcon, EyeIcon, EyeSlashIcon, ChevronLeftIcon } from '../components/icons/Icons';
import apiAuth from '../api/auth';

const ProfilePage = ({ navigate, user, updateUserProfile, handleLogout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        department: user?.department || '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const departments = ['Mechanical Engineering', 'Computer Engineering', 'Electronics & Communication', 'Chemical Engineering', 'Civil Engineering', 'Electrical Engineering'];

    const validateName = (name) => {
        if (!name.trim()) return "Name is required.";
        if (name.trim().length < 2) return "Name must be at least 2 characters long.";
        if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name can only contain letters and spaces.";
        return "";
    };

    const validateEmail = (email) => {
        if (!email.trim()) return "Email is required.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) return "Please enter a valid email address.";
        return "";
    };

    const validatePassword = (pass) => {
        if (!pass) return "Password is required.";
        if (pass.length < 8) return "Password must be at least 8 characters long.";
        if (!/[A-Z]/.test(pass)) return "Password must contain at least one uppercase letter.";
        if (!/[a-z]/.test(pass)) return "Password must contain at least one lowercase letter.";
        if (!/[0-9]/.test(pass)) return "Password must contain at least one number.";
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)) return "Password must contain at least one special character.";
        return "";
    };

    const validateMobile = (mobile) => {
        if (!mobile.trim()) return "Mobile number is required.";
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) return "Please enter a valid 10-digit mobile number.";
        return "";
    };

    const validateConfirmPassword = (pass, confirmPass) => {
        if (!confirmPass) return "Please confirm your password.";
        if (pass !== confirmPass) return "Passwords do not match.";
        return "";
    };

    const handleFieldChange = (field, value) => {
        let error = '';
        
        switch (field) {
            case 'name':
                error = validateName(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'password':
                error = validatePassword(value);
                if (formData.confirmPassword) {
                    const confirmError = validateConfirmPassword(value, formData.confirmPassword);
                    setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
                }
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(formData.password, value);
                break;
            case 'mobile': {
                const numericValue = value.replace(/\D/g, '').slice(0, 10);
                error = validateMobile(numericValue);
                setFormData(prev => ({ ...prev, [field]: numericValue }));
                setErrors(prev => ({ ...prev, [field]: error }));
                return;
            }
            case 'department':
                error = value ? '' : "Please select your department.";
                break;
            default:
                break;
        }
        
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSave = async () => {
        // Clear previous messages
        setMessage('');
        setError('');

        const newErrors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            password: formData.password ? validatePassword(formData.password) : '',
            confirmPassword: formData.password ? validateConfirmPassword(formData.password, formData.confirmPassword) : '',
            mobile: user.role === 'Student' ? validateMobile(formData.mobile) : '',
            department: formData.department ? '' : "Please select your department."
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error !== '')) {
            setLoading(true);
            
            try {
                const updatePayload = {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    mobile: formData.mobile,
                    department: formData.department
                };

                // Only include password if it's provided
                if (formData.password && formData.password.trim()) {
                    updatePayload.password = formData.password;
                }

                const response = await apiAuth.updateProfile(updatePayload);
                
                // Update local user state with the updated user data
                updateUserProfile(response.user);
                
                setMessage('Profile updated successfully!');
                setIsEditing(false);
                
                // Clear password fields
                setFormData(prev => ({
                    ...prev,
                    password: '',
                    confirmPassword: ''
                }));

            } catch (err) {
                console.error('Profile update error:', err);
                const errorMessage = err?.response?.data?.message || 
                                   (err?.response?.data?.errors ? 
                                    err.response.data.errors.map(e => e.msg).join(', ') : 
                                    'Failed to update profile. Please try again.');
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            mobile: user?.mobile || '',
            department: user?.department || '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
        setMessage('');
        setError('');
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-slate-100">
            <div className="relative w-full max-w-2xl mx-auto my-8">
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("home")}
                        className="flex items-center gap-2 text-slate-600 hover:text-green-600 mb-6 transition-colors"
                    >
                        <ChevronLeftIcon />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <UserIcon />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Profile Details</h1>
                        <p className="text-slate-500">Manage your account information</p>
                    </div>

                    {/* Success/Error Messages */}
                    {message && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-5 h-5 text-green-600">✅</div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-green-700">{message}</p>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => setMessage('')} 
                                    className="ml-auto text-green-500 font-bold px-2"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-5 h-5 text-red-600">⚠️</div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => setError('')} 
                                    className="ml-auto text-red-500 font-bold px-2"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Profile Information */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                        errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                            ) : (
                                <div className="p-3 bg-slate-50 rounded-md text-slate-700">{user?.name}</div>
                            )}
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">Email Address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleFieldChange('email', e.target.value)}
                                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                            ) : (
                                <div className="p-3 bg-slate-50 rounded-md text-slate-700">{user?.email}</div>
                            )}
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Mobile (only for students) */}
                        {user?.role === 'Student' && (
                            <div>
                                <label className="block text-slate-700 font-semibold mb-2">Mobile Number</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={(e) => handleFieldChange('mobile', e.target.value)}
                                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                            errors.mobile ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="9876543210"
                                        maxLength="10"
                                    />
                                ) : (
                                    <div className="p-3 bg-slate-50 rounded-md text-slate-700">{user?.mobile}</div>
                                )}
                                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                            </div>
                        )}

                        {/* Department */}
                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">Department</label>
                            {isEditing ? (
                                <select
                                    value={formData.department}
                                    onChange={(e) => handleFieldChange('department', e.target.value)}
                                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition bg-white ${
                                        errors.department ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="" disabled>-- Select your branch --</option>
                                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                </select>
                            ) : (
                                <div className="p-3 bg-slate-50 rounded-md text-slate-700">{user?.department}</div>
                            )}
                            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                        </div>

                        {/* Password Change (only when editing) */}
                        {isEditing && (
                            <>
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-2">New Password (Optional)</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={(e) => handleFieldChange('password', e.target.value)}
                                            className={`w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                                errors.password ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>

                                {formData.password && (
                                    <div>
                                        <label className="block text-slate-700 font-semibold mb-2">Confirm New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                                                className={`w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Confirm new password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                        {!isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
                                >
                                    Edit Profile
                                </button>
                                {/* Hide dashboard button for Admin users */}
                                {user?.role !== 'Admin' && (
                                    <button
                                        onClick={() => navigate("dashboard")}
                                        className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                                    >
                                        View Dashboard
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Saving...
                                        </div>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Logout Button */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
