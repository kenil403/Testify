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
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('Student');
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
        department: '',
        role: ''
    });

    // UX: Track field interaction to avoid showing errors while typing initially
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        mobile: false,
        department: false,
        role: false
    });
    const [submitAttempted, setSubmitAttempted] = useState(false);

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
        if (pass.length < 8) return "Password must be at least 8 characters long.";
        
        // Check for at least one lowercase letter
        if (!/[a-z]/.test(pass)) return "Password must contain at least one lowercase letter.";
        
        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(pass)) return "Password must contain at least one uppercase letter.";
        
        // Check for at least one number
        if (!/\d/.test(pass)) return "Password must contain at least one number.";
        
        // Check for at least one special character - fixed regex
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)) {
            return "Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;':\",./<>?).";
        }
        
        return "";
    };

    const getPasswordStrength = (pass) => {
        if (!pass) return { strength: 0, text: '', color: '' };
        
        let score = 0;
        const checks = {
            length: pass.length >= 8,
            lowercase: /[a-z]/.test(pass),
            uppercase: /[A-Z]/.test(pass),
            numbers: /\d/.test(pass),
            special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)
        };
        
        score = Object.values(checks).filter(Boolean).length;
        
        if (score < 3) return { strength: score, text: 'Weak', color: 'text-red-500' };
        if (score < 5) return { strength: score, text: 'Medium', color: 'text-yellow-500' };
        return { strength: score, text: 'Strong', color: 'text-green-500' };
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

    const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

    // Real-time validation
    const handleFieldChange = (field, value) => {
        // Allow spaces in full name while typing; trim other fields except passwords
        const v = (field === 'password' || field === 'confirmPassword' || field === 'name') ? value : value.trim();
        let error = '';
        
        switch (field) {
            case 'name':
                error = validateName(v);
                setName(v);
                break;
            case 'email':
                // normalize to lowercase email
                const em = v.toLowerCase();
                error = validateEmail(em);
                setEmail(em);
                break;
            case 'password':
                // For login, only require non-empty password; for signup enforce strength
                error = isLoginView ? (v ? '' : 'Password is required.') : validatePassword(v);
                setPassword(v);
                // Also validate confirm password if it exists
                if (confirmPassword) {
                    const confirmError = validateConfirmPassword(v, confirmPassword);
                    setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
                }
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(password, v);
                setConfirmPassword(v);
                break;
            case 'department':
                error = v ? '' : "Please select your department.";
                setDepartment(v);
                break;
            case 'role':
                error = v ? '' : "Please select your role.";
                setRole(v);
                break;
            default:
                break;
        }
        
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    // Determine if form is valid to enable/disable submit proactively
    const isFormValid = () => {
        if (isLoginView) {
            // Login requires a valid email and a non-empty password
            const emailOk = validateEmail(email) === '';
            const passOk = !!password;
            return emailOk && passOk;
        } else {
            // Signup requires all validators to pass
            const nameOk = validateName(name) === '';
            const emailOk = validateEmail(email) === '';
            const passOk = validatePassword(password) === '';
            const confirmOk = validateConfirmPassword(password, confirmPassword) === '';
            const mobileOk = validateMobile(mobile) === '';
            const roleOk = !!role;
            // Department is only required for Student role
            const deptOk = role === 'Admin' ? true : !!department;
            return nameOk && emailOk && passOk && confirmOk && mobileOk && roleOk && deptOk;
        }
    };

    const validateAllFields = () => {
        const newErrors = {
            name: !isLoginView ? validateName(name) : '',
            email: validateEmail(email),
            // On login, only ensure a non-empty password; on signup enforce full strength
            password: isLoginView ? (password ? '' : 'Password is required.') : validatePassword(password),
            confirmPassword: !isLoginView ? validateConfirmPassword(password, confirmPassword) : '',
            mobile: !isLoginView ? validateMobile(mobile) : '',
            role: !isLoginView ? (role ? '' : "Please select your role.") : '',
            // Department is only required for Student role
            department: !isLoginView ? (role === 'Admin' ? '' : (department ? '' : "Please select your department.")) : ''
        };
        
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // clear previous server errors
        setServerError('');
        setSubmitAttempted(true);
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
                const payload = { name, email, password, mobile, role };
                // Only include department for Student role
                if (role === 'Student') {
                    payload.department = department;
                }
                const data = await apiAuth.register(payload);
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
            department: '',
            role: ''
        });
        setTouched({ name: false, email: false, password: false, confirmPassword: false, mobile: false, department: false, role: false });
        setSubmitAttempted(false);
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
                                    <label className="block text-slate-700 font-semibold mb-2">Role</label>
                                    <select 
                                        value={role} 
                                        onChange={(e) => {
                                            handleFieldChange('role', e.target.value);
                                            // Reset department when switching to Admin
                                            if (e.target.value === 'Admin') {
                                                setDepartment('');
                                                setErrors(prev => ({ ...prev, department: '' }));
                                            }
                                        }} 
                                        onBlur={() => markTouched('role')}
                                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition bg-white ${
                                            ((touched.role || submitAttempted) && errors.role) ? 'border-red-500' : 'border-gray-300'
                                        }`} 
                                        required
                                        aria-invalid={((touched.role || submitAttempted) && !!errors.role) || undefined}
                                    >
                                        <option value="Student">Student</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                    {(touched.role || submitAttempted) && errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => handleFieldChange('name', e.target.value)} 
                                        onBlur={() => markTouched('name')}
                                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                            ((touched.name || submitAttempted) && errors.name) ? 'border-red-500' : 'border-gray-300'
                                        }`} 
                                        placeholder="Enter your full name" 
                                        required 
                                        minLength={2}
                                        pattern="^[A-Za-z ]{2,}$"
                                        title="Name should be at least 2 characters and contain only letters and spaces"
                                        autoComplete="name"
                                        aria-invalid={((touched.name || submitAttempted) && !!errors.name) || undefined}
                                    />
                                    {(touched.name || submitAttempted) && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-2">Mobile Number</label>
                                    <input 
                                        type="tel" 
                                        value={mobile} 
                                        onChange={(e) => handleMobileChange(e.target.value)} 
                                        onBlur={() => markTouched('mobile')}
                                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                            ((touched.mobile || submitAttempted) && errors.mobile) ? 'border-red-500' : 'border-gray-300'
                                        }`} 
                                        placeholder="9876543210" 
                                        maxLength="10"
                                        required 
                                        pattern="^[6-9][0-9]{9}$"
                                        title="Enter a valid 10-digit mobile number starting with 6-9"
                                        autoComplete="tel"
                                        aria-invalid={((touched.mobile || submitAttempted) && !!errors.mobile) || undefined}
                                    />
                                    {(touched.mobile || submitAttempted) && errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                                </div>
                                {role === 'Student' && (
                                    <div>
                                        <label className="block text-slate-700 font-semibold mb-2">Department</label>
                                        <select 
                                            value={department} 
                                            onChange={(e) => handleFieldChange('department', e.target.value)} 
                                            onBlur={() => markTouched('department')}
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition bg-white ${
                                                ((touched.department || submitAttempted) && errors.department) ? 'border-red-500' : 'border-gray-300'
                                            }`} 
                                            required
                                            aria-invalid={((touched.department || submitAttempted) && !!errors.department) || undefined}
                                        >
                                            <option value="" disabled>-- Select your branch --</option>
                                            {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                        </select>
                                        {(touched.department || submitAttempted) && errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                                    </div>
                                )}
                            </>
                        )}
                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => handleFieldChange('email', e.target.value)} 
                                onBlur={() => markTouched('email')}
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                    ((touched.email || submitAttempted) && errors.email) ? 'border-red-500' : 'border-gray-300'
                                }`} 
                                placeholder="you@example.com" 
                                required 
                            />
                            {(touched.email || submitAttempted) && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={password} 
                                    onChange={(e) => handleFieldChange('password', e.target.value)} 
                                    onBlur={() => markTouched('password')}
                                    className={`w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                        ((touched.password || submitAttempted) && errors.password) ? 'border-red-500' : 'border-gray-300'
                                    }`} 
                                    placeholder="••••••••" 
                                    required 
                                    minLength={!isLoginView ? 8 : undefined}
                                    autoComplete={isLoginView ? 'current-password' : 'new-password'}
                                    aria-invalid={((touched.password || submitAttempted) && !!errors.password) || undefined}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            {(touched.password || submitAttempted) && errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            {!isLoginView && password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-slate-600">Password Strength:</span>
                                        <span className={`font-semibold ${getPasswordStrength(password).color}`}>
                                            {getPasswordStrength(password).text}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                getPasswordStrength(password).strength < 3 
                                                    ? 'bg-red-500' 
                                                    : getPasswordStrength(password).strength < 5 
                                                    ? 'bg-yellow-500' 
                                                    : 'bg-green-500'
                                            }`}
                                            style={{ width: `${(getPasswordStrength(password).strength / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="mt-2 text-xs text-slate-600">
                                        <p>Password must contain:</p>
                                        <ul className="list-disc list-inside mt-1 space-y-1">
                                            <li className={password.length >= 8 ? 'text-green-600' : 'text-slate-500'}>
                                                At least 8 characters
                                            </li>
                                            <li className={/[a-z]/.test(password) ? 'text-green-600' : 'text-slate-500'}>
                                                One lowercase letter
                                            </li>
                                            <li className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-slate-500'}>
                                                One uppercase letter
                                            </li>
                                            <li className={/\d/.test(password) ? 'text-green-600' : 'text-slate-500'}>
                                                One number
                                            </li>
                                            <li className={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? 'text-green-600' : 'text-slate-500'}>
                                                One special character
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                        {!isLoginView && (
                             <div>
                                <label className="block text-slate-700 font-semibold mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        value={confirmPassword} 
                                        onChange={(e) => handleFieldChange('confirmPassword', e.target.value)} 
                                        onBlur={() => markTouched('confirmPassword')}
                                        className={`w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                            ((touched.confirmPassword || submitAttempted) && errors.confirmPassword) ? 'border-red-500' : 'border-gray-300'
                                        }`} 
                                        placeholder="••••••••" 
                                        required 
                                        autoComplete="new-password"
                                        aria-invalid={((touched.confirmPassword || submitAttempted) && !!errors.confirmPassword) || undefined}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {(touched.confirmPassword || submitAttempted) && errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>
                        )}
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!isFormValid()}
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
