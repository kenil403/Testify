import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, LockIcon, EyeIcon, EyeSlashIcon } from '../components/icons/Icons';

const ResetPasswordPage = ({ navigate, token }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [tokenValid, setTokenValid] = useState(true);

    // Extract token from URL if not provided as prop
    const resetToken = token || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '');

    useEffect(() => {
        // Validate token format (basic check)
        if (!resetToken || resetToken.length < 32) {
            setTokenValid(false);
            setError('Invalid or missing reset token.');
        }
    }, [resetToken]);

    const validatePassword = (pass) => {
        if (!pass) return "Password is required.";
        if (pass.length < 8) return "Password must be at least 8 characters long.";
        
        // Check for at least one lowercase letter
        if (!/[a-z]/.test(pass)) return "Password must contain at least one lowercase letter.";
        
        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(pass)) return "Password must contain at least one uppercase letter.";
        
        // Check for at least one number
        if (!/\d/.test(pass)) return "Password must contain at least one number.";
        
        // Check for at least one special character
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)) {
            return "Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;':\",./<>?).";
        }
        
        return "";
    };

    const validateConfirmPassword = (pass, confirmPass) => {
        if (!confirmPass) return "Please confirm your password.";
        if (pass !== confirmPass) return "Passwords do not match.";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
        
        if (passwordError) {
            setError(passwordError);
            return;
        }
        
        if (confirmPasswordError) {
            setError(confirmPasswordError);
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch(`http://localhost:3001/api/auth/reset-password/${resetToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setResetSuccess(true);
            } else {
                if (response.status === 400 && data.message === 'Token is invalid or has expired') {
                    setTokenValid(false);
                }
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Reset password error:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        if (navigate) navigate('auth');
    };

    if (!tokenValid) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-slate-100">
                <div className="relative w-full max-w-lg mx-auto my-8">
                    <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
                        <div className="text-red-600 text-6xl mb-4">⚠️</div>
                        <h1 className="text-2xl font-bold mb-2 text-slate-800">Invalid Reset Link</h1>
                        <p className="text-slate-500 mb-6">
                            This password reset link is invalid or has expired. Please request a new password reset.
                        </p>
                        <button
                            onClick={() => navigate && navigate('forgot-password')}
                            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
                        >
                            Request New Reset Link
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-slate-100">
            <div className="relative w-full max-w-lg mx-auto my-8">
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    {/* Back Button */}
                    <div className="mb-6">
                        <button
                            onClick={handleBackToLogin}
                            className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
                        >
                            <ChevronLeftIcon />
                            Back to Login
                        </button>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <LockIcon />
                        </div>
                        <h1 className="text-2xl font-bold mb-2 text-slate-800">
                            {resetSuccess ? 'Password Reset Successful' : 'Set New Password'}
                        </h1>
                        <p className="text-slate-500">
                            {resetSuccess 
                                ? "Your password has been successfully updated. You can now log in with your new password." 
                                : "Create a strong new password for your account."
                            }
                        </p>
                    </div>

                    {resetSuccess ? (
                        /* Success State */
                        <div className="space-y-6">
                            {/* Success Message */}
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="w-5 h-5 text-green-600">✅</div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-700">{message}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleBackToLogin}
                                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
                            >
                                Go to Login
                            </button>
                        </div>
                    ) : (
                        /* Form State */
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded">
                                    <div className="flex items-start justify-between">
                                        <div className="text-sm text-red-700">{error}</div>
                                        <button 
                                            type="button" 
                                            onClick={() => setError('')} 
                                            className="text-red-500 font-bold px-2"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* New Password Input */}
                            <div>
                                <label className="block text-slate-700 font-semibold mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-green-500 transition border-gray-300"
                                        placeholder="Enter your new password"
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                
                                {/* Password Strength Indicator */}
                                {password && (
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

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-slate-700 font-semibold mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full p-3 pr-10 border rounded-md focus:ring-2 focus:ring-green-500 transition border-gray-300"
                                        placeholder="Confirm your new password"
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !password || !confirmPassword || validatePassword(password) || validateConfirmPassword(password, confirmPassword)}
                                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Resetting Password...
                                    </div>
                                ) : (
                                    'Reset Password'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;