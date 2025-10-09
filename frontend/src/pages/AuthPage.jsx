import React, { useState } from 'react';
import { UserIcon, UserAddIcon, EyeIcon, EyeSlashIcon } from '../components/icons/Icons';
import apiAuth from '../api/auth';

const AuthPage = ({ navigate, handleLogin, handleRegister, appServerError, setAppServerError }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('Student');
    const [department, setDepartment] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Server-side / submission error - prefer app-level error if provided
    const [localServerError, setLocalServerError] = useState('');
    const serverError = appServerError !== undefined ? appServerError : localServerError;
    const setServerError = setAppServerError !== undefined ? setAppServerError : setLocalServerError;
    
    // Enhanced error states
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        department: ''
    });

    const departments = ['Mechanical Engineering', 'Computer Engineering', 'Electronics & Communication', 'Chemical Engineering', 'Civil Engineering', 'Electrical Engineering'];

    // Enhanced validation functions
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
        if (pass.length < 6) return "Password must be at least 6 characters long.";
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

    // Handle mobile number input - only allow numbers
    const handleMobileChange = (value) => {
        // Remove any non-digit characters
        const numericValue = value.replace(/\D/g, '');
        // Limit to 10 digits
        const limitedValue = numericValue.slice(0, 10);
        setMobile(limitedValue);
        
        // Validate the mobile number
        const error = validateMobile(limitedValue);
        setErrors(prev => ({ ...prev, mobile: error }));
    };

    // Real-time validation
    const handleFieldChange = (field, value) => {
        let error = '';
        
        switch (field) {
            case 'name':
                error = validateName(value);
                setName(value);
                break;
            case 'email':
                error = validateEmail(value);
                setEmail(value);
                break;
            case 'password':
                error = validatePassword(value);
                setPassword(value);
                // Also validate confirm password if it exists
                if (confirmPassword) {
                    const confirmError = validateConfirmPassword(value, confirmPassword);
                    setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
                }
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(password, value);
                setConfirmPassword(value);
                break;
            case 'department':
                error = value ? '' : "Please select your department.";
                setDepartment(value);
                break;
            default:
                break;
        }
        
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const validateAllFields = () => {
        const newErrors = {
            name: !isLoginView ? validateName(name) : '',
            email: validateEmail(email),
            password: validatePassword(password),
            confirmPassword: !isLoginView ? validateConfirmPassword(password, confirmPassword) : '',
            mobile: !isLoginView && role === 'Student' ? validateMobile(mobile) : '',
            department: !isLoginView ? (department ? '' : "Please select your department.") : ''
        };
        
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    // clear previous server errors
    setServerError('');
        if (!validateAllFields()) {
            return;
        }

        if (isLoginView) {
            if (handleLogin) return handleLogin(email, password);
            try {
                const data = await apiAuth.login({ email, password });
                apiAuth.setToken(data.token);
                if (navigate) navigate('/dashboard');
            } catch (err) {
                console.error(err);
                const msg = err?.response?.data?.message || (err?.response?.data?.errors ? err.response.data.errors.map(e=>e.msg).join(', ') : 'Login failed');
                setServerError(msg);
            }
        } else {
            if (handleRegister) return handleRegister(name, email, password, department, mobile, role);
            try {
                const data = await apiAuth.register({ name, email, password, mobile, role, department });
                apiAuth.setToken(data.token);
                if (navigate) navigate('/dashboard');
            } catch (err) {
                console.error(err);
                const msg = err?.response?.data?.message || (err?.response?.data?.errors ? err.response.data.errors.map(e=>e.msg).join(', ') : 'Register failed');
                setServerError(msg);
            }
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            mobile: '',
            department: ''
        });
        // clear server errors when switching view
        setServerError('');
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-slate-100">
            <div className="relative w-full max-w-lg mx-auto my-8">
                 <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <div className="text-center mb-8 flex justify-center">
                        {isLoginView ? <UserIcon /> : <UserAddIcon />}
                    </div>
                    <h1 className="text-2xl font-bold mb-2 text-slate-800 text-center">{isLoginView ? 'Welcome Back!' : 'Create an Account'}</h1>
                    <p className="text-slate-500 mb-8 text-center">{isLoginView ? 'Log in to continue your journey.' : 'Join Placify and start preparing!'}</p>
                    {/* Server-side error banner */}
                    {serverError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                            <div className="flex items-start justify-between">
                                <div className="text-sm text-red-700">{serverError}</div>
                                <button type="button" onClick={() => setServerError('')} className="text-red-500 font-bold px-2">X</button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {!isLoginView && (
                            <>
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => handleFieldChange('name', e.target.value)} 
                                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                            errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`} 
                                        placeholder="Enter your full name" 
                                        required 
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-2">Role</label>
                                    <select 
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value)} 
                                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition bg-white" 
                                        required
                                    >
                                        <option value="Student">Student</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                {role === 'Student' && (
                                    <div>
                                        <label className="block text-slate-700 font-semibold mb-2">Mobile Number</label>
                                        <input 
                                            type="tel" 
                                            value={mobile} 
                                            onChange={(e) => handleMobileChange(e.target.value)} 
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                                errors.mobile ? 'border-red-500' : 'border-gray-300'
                                            }`} 
                                            placeholder="9876543210" 
                                            maxLength="10"
                                            required 
                                        />
                                        {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-2">Department</label>
                                    <select 
                                        value={department} 
                                        onChange={(e) => handleFieldChange('department', e.target.value)} 
                                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition bg-white ${
                                            errors.department ? 'border-red-500' : 'border-gray-300'
                                        }`} 
                                        required
                                    >
                                        <option value="" disabled>-- Select your branch --</option>
                                        {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                    </select>
                                    {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                                </div>
                            </>
                        )}
                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => handleFieldChange('email', e.target.value)} 
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`} 
                                placeholder="you@example.com" 
                                required 
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={password} 
                                    onChange={(e) => handleFieldChange('password', e.target.value)} 
                                    className={`w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`} 
                                    placeholder="••••••••" 
                                    required 
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
                        {!isLoginView && (
                             <div>
                                <label className="block text-slate-700 font-semibold mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        value={confirmPassword} 
                                        onChange={(e) => handleFieldChange('confirmPassword', e.target.value)} 
                                        className={`w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                        }`} 
                                        placeholder="••••••••" 
                                        required 
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
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={Object.values(errors).some(error => error !== '')}
                        >
                            {isLoginView ? 'Login' : 'Create Account'}
                        </button>
                        <p className="text-center text-sm pt-4">
                            {isLoginView ? "Don't have an account? " : "Already have an account? "}
                            <a onClick={toggleView} className="font-semibold text-green-600 hover:underline cursor-pointer">
                                {isLoginView ? 'Sign Up' : 'Login'}
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
