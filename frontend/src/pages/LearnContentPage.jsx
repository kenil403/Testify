import React from 'react';
import { learningData } from '../data/learningData';
import { ChevronLeftIcon, FolderIcon, PdfIcon } from '../components/icons/Icons';

const LearnContentPage = ({ pathParts, navigate, startPracticeTest }) => {
    // Helper to get the current data slice based on the path
    const get_current_data = (parts) => {
        let current = learningData;
        for (const part of parts) {
            if (!current || typeof current !== 'object' || Array.isArray(current)) return null;
            // Improved key matching: ignore case, spaces, underscores
            const normalizedPart = part.replace(/__/g, ' ').replace(/_/g, ' ').toLowerCase().trim();
            const key = Object.keys(current).find(k => k.replace(/_/g, ' ').toLowerCase().trim() === normalizedPart);
            if (!key) return null;
            current = current[key];
        }
        return current;
    };

    const data = get_current_data(pathParts);

    const isFinalLevel = Array.isArray(data);

    // Breadcrumb Navigation
    const breadcrumbs = [...pathParts];
    const handleBreadcrumbClick = (index) => {
        const newPath = pathParts.slice(0, index + 1);
        navigate(`learn-${newPath.map(encodeURIComponent).join('__')}`);
    };
    
    // Title
    const title = pathParts.length > 0 ? pathParts[pathParts.length - 1].replace(/__/g, ' ') : "Learning Center";

    const handleStartPractice = () => {
        const topic = pathParts.join(' / ');
        const returnPage = `learn-${pathParts.map(encodeURIComponent).join('__')}`;
        if (startPracticeTest) startPracticeTest({ topic, returnPage });
    };
    
    return (
        <div className="container mx-auto">
            <button onClick={() => navigate(pathParts.length > 1 ? `learn-${pathParts.slice(0, -1).map(encodeURIComponent).join('__')}`: 'learn')} className="p-2 rounded-full hover:bg-slate-200 transition-colors mb-8">
                <ChevronLeftIcon />
            </button>
            
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm font-semibold">
                {breadcrumbs.map((crumb, index) => (
                    <span key={index}>
                        <a onClick={() => handleBreadcrumbClick(index)} className="text-slate-500 hover:text-green-600 cursor-pointer">{crumb.replace(/__/g, ' ')}</a>
                        {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
                    </span>
                ))}
            </nav>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
                 <div className="md:flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{title}</h1>
                        <div className="w-20 h-1 bg-green-500"></div>
                    </div>
                    {isFinalLevel && (
                        <button onClick={handleStartPractice} className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors">
                            Practice Test
                        </button>
                    )}
                </div>

                {isFinalLevel ? (
                    // Final Level: Display item with actions: Practice Test (primary) and Download PDF (secondary)
                    <ul className="space-y-3">
                        {data.map(item => (
                            <li key={item.name} className="flex items-center justify-between p-4 rounded-md bg-slate-50 hover:bg-green-100 transition-colors">
                                <a href={item.path} target="_blank" rel="noopener noreferrer" className="flex items-center min-w-0">
                                    <PdfIcon />
                                    <span className="ml-4 font-medium text-slate-700 truncate">{item.name}</span>
                                </a>
                                <div className="ml-4">
                                    <a href={item.path} download className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 font-semibold">Download PDF</a>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    // Intermediate Level: Display folder links
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data && Object.keys(data).map(key => (
                            <div key={key} onClick={() => navigate(`learn-${[...pathParts, key].map(encodeURIComponent).join('__')}`)} className="p-4 rounded-lg border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all duration-300 cursor-pointer flex items-center space-x-4">
                               <FolderIcon />
                               <span className="font-semibold text-slate-800">{key}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearnContentPage;
