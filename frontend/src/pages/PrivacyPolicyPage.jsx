import React from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';

const PrivacyPolicyPage = ({ navigate }) => (
    <div className="container mx-auto max-w-4xl">
        <button type="button" onClick={() => navigate('home')} className="p-2 rounded-full hover:bg-slate-200 transition-colors mb-8">
            <ChevronLeftIcon />
        </button>
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <div className="bg-white p-10 rounded-lg shadow-lg text-slate-700 space-y-6 leading-relaxed prose prose-lg">
            <h2>Introduction</h2>
            <p>Welcome to Testify. We are committed to protecting your privacy...</p>
            <h2 className="mt-4">Academic Integrity</h2>
            <p>Testify is a tool to aid your learning and preparation. Any form of cheating, sharing of account information, or misuse of the testing materials is strictly prohibited and may result in the termination of your account.</p>

        </div>
    </div>
);

export default PrivacyPolicyPage;
