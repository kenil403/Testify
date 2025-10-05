import React, { useState } from 'react';
import { ChevronLeftIcon, UserIcon, EyeIcon, EyeSlashIcon } from '../components/icons/Icons';

const AdminDashboard = ({ navigate, adminUser, handleLogout }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userFormData, setUserFormData] = useState({});
    const [errors, setErrors] = useState({});

    // Mock user data - in real app, this would come from backend
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Kenil Shah",
            email: "kenilshah403@gmail.com",
            department: "Computer Engineering",
            mobile: "9876543210",
            role: "Student",
            testResults: [
                { testName: "Aptitude Test", score: 85, date: "2024-01-15", totalQuestions: 10 },
                { testName: "Programming Test", score: 92, date: "2024-01-16", totalQuestions: 10 },
                { testName: "Mechanical Test", score: 78, date: "2024-01-17", totalQuestions: 10 }
            ],
            totalTests: 3,
            averageScore: 85
        },
        {
            id: 2,
            name: "John Doe",
            email: "john.doe@example.com",
            department: "Mechanical Engineering",
            mobile: "9876543211",
            role: "Student",
            testResults: [
                { testName: "Aptitude Test", score: 72, date: "2024-01-14", totalQuestions: 10 },
                { testName: "Mechanical Test", score: 88, date: "2024-01-18", totalQuestions: 10 }
            ],
            totalTests: 2,
            averageScore: 80
        },
        {
            id: 3,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            department: "Electronics & Communication",
            mobile: "9876543212",
            role: "Student",
            testResults: [
                { testName: "Aptitude Test", score: 95, date: "2024-01-13", totalQuestions: 10 },
                { testName: "Programming Test", score: 89, date: "2024-01-19", totalQuestions: 10 },
                { testName: "Electronics Test", score: 91, date: "2024-01-20", totalQuestions: 10 }
            ],
            totalTests: 3,
            averageScore: 92
        }
    ]);

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

    const validateMobile = (mobile) => {
        if (!mobile.trim()) return "Mobile number is required.";
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) return "Please enter a valid 10-digit mobile number.";
        return "";
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setUserFormData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            department: user.department,
            role: user.role
        });
        setIsEditingUser(true);
        setErrors({});
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
            case 'mobile':
                const numericValue = value.replace(/\D/g, '').slice(0, 10);
                error = validateMobile(numericValue);
                setUserFormData(prev => ({ ...prev, [field]: numericValue }));
                setErrors(prev => ({ ...prev, [field]: error }));
                return;
            case 'department':
                error = value ? '' : "Please select your department.";
                break;
            default:
                break;
        }
        
        setUserFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSaveUser = () => {
        const newErrors = {
            name: validateName(userFormData.name),
            email: validateEmail(userFormData.email),
            mobile: validateMobile(userFormData.mobile),
            department: userFormData.department ? '' : "Please select your department."
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error !== '')) {
            const updatedUsers = users.map(user => 
                user.id === selectedUser.id 
                    ? { ...user, ...userFormData }
                    : user
            );
            setUsers(updatedUsers);
            setIsEditingUser(false);
            setSelectedUser(null);
        }
    };

    const handleCancelEdit = () => {
        setIsEditingUser(false);
        setSelectedUser(null);
        setUserFormData({});
        setErrors({});
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== userId));
            if (selectedUser && selectedUser.id === userId) {
                setSelectedUser(null);
                setIsEditingUser(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                            <p className="text-slate-600">Manage users and view test results</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-slate-600">Welcome, {adminUser?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Users List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">Users ({users.length})</h2>
                            <div className="space-y-3">
                                {users.map(user => (
                                    <div
                                        key={user.id}
                                        className={`p-4 border rounded-lg cursor-pointer transition ${
                                            selectedUser?.id === user.id 
                                                ? 'border-green-500 bg-green-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-slate-800">{user.name}</h3>
                                                <p className="text-sm text-slate-600">{user.email}</p>
                                                <p className="text-sm text-slate-500">{user.department}</p>
                                                <p className="text-sm text-green-600">Tests: {user.totalTests} | Avg: {user.averageScore}%</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditUser(user);
                                                    }}
                                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteUser(user.id);
                                                    }}
                                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="lg:col-span-1">
                        {selectedUser ? (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-slate-800 mb-4">User Details</h2>
                                
                                {isEditingUser ? (
                                    <div className="space-y-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={userFormData.name}
                                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={userFormData.email}
                                                onChange={(e) => handleFieldChange('email', e.target.value)}
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        {/* Mobile */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-2">Mobile</label>
                                            <input
                                                type="tel"
                                                value={userFormData.mobile}
                                                onChange={(e) => handleFieldChange('mobile', e.target.value)}
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                maxLength="10"
                                            />
                                            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                                        </div>

                                        {/* Department */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-2">Department</label>
                                            <select
                                                value={userFormData.department}
                                                onChange={(e) => handleFieldChange('department', e.target.value)}
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition bg-white ${
                                                    errors.department ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="" disabled>-- Select department --</option>
                                                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                            </select>
                                            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                                        </div>

                                        {/* Role */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-2">Role</label>
                                            <select
                                                value={userFormData.role}
                                                onChange={(e) => setUserFormData(prev => ({ ...prev, role: e.target.value }))}
                                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition bg-white"
                                            >
                                                <option value="Student">Student</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-4">
                                            <button
                                                onClick={handleSaveUser}
                                                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-1">Name</label>
                                            <p className="text-slate-600">{selectedUser.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-1">Email</label>
                                            <p className="text-slate-600">{selectedUser.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-1">Mobile</label>
                                            <p className="text-slate-600">{selectedUser.mobile}</p>
                                        </div>
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-1">Department</label>
                                            <p className="text-slate-600">{selectedUser.department}</p>
                                        </div>
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-1">Role</label>
                                            <p className="text-slate-600">{selectedUser.role}</p>
                                        </div>
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-1">Total Tests</label>
                                            <p className="text-slate-600">{selectedUser.totalTests}</p>
                                        </div>
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-1">Average Score</label>
                                            <p className="text-slate-600">{selectedUser.averageScore}%</p>
                                        </div>
                                    </div>
                                )}

                                {/* Test Results */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="font-semibold text-slate-800 mb-3">Test Results</h3>
                                    <div className="space-y-2">
                                        {selectedUser.testResults.map((test, index) => (
                                            <div key={index} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">{test.testName}</p>
                                                    <p className="text-xs text-slate-500">{test.date}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold text-green-600">{test.score}/{test.totalQuestions}</p>
                                                    <p className="text-xs text-slate-500">{Math.round((test.score/test.totalQuestions) * 100)}%</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                                <UserIcon />
                                <p className="text-slate-500 mt-4">Select a user to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
