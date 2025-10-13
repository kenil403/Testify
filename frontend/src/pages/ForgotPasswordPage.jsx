import React, { useState } from 'react';
import { ChevronLeftIcon, MailIcon } from '../components/icons/Icons';

const ForgotPasswordPage = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const validateEmail = (email) => {
        if (!email.trim()) return "Email is required.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) return "Please enter a valid email address.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setEmailSent(true);
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Forgot password error:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        if (navigate) navigate('auth');
    };

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
                            <MailIcon />
                        </div>
                        <h1 className="text-2xl font-bold mb-2 text-slate-800">
                            {emailSent ? 'Check Your Email' : 'Forgot Password?'}
                        </h1>
                        <p className="text-slate-500">
                            {emailSent 
                                ? "We've sent a password reset link to your email address." 
                                : "No worries! Enter your email address and we'll send you a link to reset your password."
                            }
                        </p>
                    </div>

                    {emailSent ? (
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

                            {/* Instructions */}
                            <div className="text-center space-y-4">
                                <div className="text-sm text-slate-600">
                                    <p className="mb-2">Didn't receive the email? Check your spam folder.</p>
                                    <p>The reset link will expire in 10 minutes.</p>
                                </div>
                                
                                <button
                                    onClick={() => {
                                        setEmailSent(false);
                                        setMessage('');
                                        setEmail('');
                                    }}
                                    className="text-green-600 hover:underline font-semibold"
                                >
                                    Try another email address
                                </button>
                            </div>
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

                            {/* Email Input */}
                            <div>
                                <label className="block text-slate-700 font-semibold mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 transition ${
                                        error ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your email address"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !email.trim()}
                                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending Reset Link...
                                    </div>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>

                            {/* Back to Login Link */}
                            <div className="text-center">
                                <p className="text-sm text-slate-600">
                                    Remember your password?{' '}
                                    <button
                                        type="button"
                                        onClick={handleBackToLogin}
                                        className="font-semibold text-green-600 hover:underline"
                                    >
                                        Back to Login
                                    </button>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;