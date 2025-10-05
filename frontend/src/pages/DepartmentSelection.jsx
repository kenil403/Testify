import React from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';

const DepartmentSelectionPage = ({ navigate, startTest }) => {
    const departments = ['Mechanical Engineering', 'Computer Engineering', 'Electronics & Communication', 'Chemical Engineering', 'Civil Engineering', 'Electrical Engineering'];
    return (
        <div className="container mx-auto">
            <button onClick={() => navigate('test-selection')} className="p-2 rounded-full hover:bg-slate-200 transition-colors mb-8">
                <ChevronLeftIcon />
            </button>
            <h1 className="text-4xl font-bold text-center mb-10">Select Your Department</h1>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <ul className="space-y-4">
                    {departments.map(dept => (
                        <li key={dept}>
                           <button 
                                onClick={() => startTest(dept)} 
                                className="w-full text-left p-4 rounded-lg border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all duration-300"
                            >
                                <span className="text-lg font-semibold text-slate-700">{dept}</span>
                           </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DepartmentSelectionPage;
