import React from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';

const AboutUsPage = ({ navigate }) => (
    <div className="container mx-auto max-w-4xl">
        <button type="button" onClick={() => navigate('home')} className="p-2 rounded-full hover:bg-slate-200 transition-colors mb-8">
            <ChevronLeftIcon />
        </button>
        <h1 className="text-4xl font-bold mb-6 text-center">About Testify</h1>
        <div className="bg-white p-10 rounded-lg shadow-lg text-lg text-slate-700 space-y-4 leading-relaxed">
            <p>Testify was born from a simple idea: to provide a centralized, efficient, and accessible platform for students to prepare for their campus placements. We understand the challenges and anxieties that come with placement season, and our mission is to equip students with the knowledge and practice they need to excel.</p>
            <p>Our platform offers a comprehensive library of study materials across various domains—from general aptitude and logical reasoning to core technical subjects for different engineering and computer application fields. Each resource is carefully curated to be relevant to the current industry standards and typical placement exam patterns.</p>
            <p>Beyond just learning, we emphasize practice. Our mock test engine is designed to simulate the real test environment, complete with timers and a diverse question bank. This ensures that students not only test their knowledge but also improve their time management and exam-taking strategies. The detailed performance analysis and dashboard help students identify their strengths and weaknesses, allowing for a more focused preparation.</p>
            <p>We are a team of passionate educators and developers committed to student success. Welcome to Testify!</p>
        </div>
    </div>
);

export default AboutUsPage;
