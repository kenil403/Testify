import React from 'react';
import { learningData } from '../data/learningData';
import { ChevronLeftIcon, FolderIcon, PdfIcon } from '../components/icons/Icons';
import { listPdfs, buildViewUrl, buildDownloadUrl } from '../api/pdfs';
import { getToken } from '../api/auth';

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

    // If a user opens a subsection without being logged in, show a one-time alert
    const alertedRef = React.useRef(false);
    React.useEffect(() => {
        if (alertedRef.current) return;
        const token = getToken();
        if (!token && pathParts.length >= 2) {
            alertedRef.current = true;
            // Show alert, then redirect to login/signup page
            alert('Please login or sign up to access PDFs and practice tests.');
            navigate('auth');
        }
    }, [pathParts.join('__')]);

    // Special handling for Problem on Trains
    const isProblemOnTrains = pathParts.length === 2 && 
                             pathParts[0] === 'Aptitude' && 
                             pathParts[1] === 'Problem on Trains';

    const isFinalLevel = Array.isArray(data) || isProblemOnTrains;

    // Fetch PDFs from backend for Problem on Trains only (pilot)
    const [pdfs, setPdfs] = React.useState([]);
    const [loadingPdfs, setLoadingPdfs] = React.useState(false);
    React.useEffect(() => {
        let cancelled = false;
        async function load() {
            if (!isProblemOnTrains) { setPdfs([]); return; }
            setLoadingPdfs(true);
            const items = await listPdfs('Apptitude', 'Problems on Trains');
            if (!cancelled) { setPdfs(items); setLoadingPdfs(false); }
        }
        load();
        return () => { cancelled = true; };
    }, [isProblemOnTrains]);

    // Also fetch from DB for other final-level pages and map by title
    const [genericPdfs, setGenericPdfs] = React.useState([]);
    const [loadingGeneric, setLoadingGeneric] = React.useState(false);
    React.useEffect(() => {
        let cancelled = false;
        async function loadGeneric() {
            if (!Array.isArray(data) || pathParts.length < 2 || isProblemOnTrains) {
                if (!cancelled) { setGenericPdfs([]); setLoadingGeneric(false); }
                return;
            }
            setLoadingGeneric(true);
            const section = pathParts[0];
            const subsection = pathParts[1];
            const items = await listPdfs(section, subsection);
            if (!cancelled) { setGenericPdfs(items || []); setLoadingGeneric(false); }
        }
        loadGeneric();
        return () => { cancelled = true; };
    }, [Array.isArray(data), pathParts.join('||'), isProblemOnTrains]);

    const normalizeTitle = (s) => String(s || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '')
        .trim();
    const genericMap = React.useMemo(() => {
        const map = new Map();
        for (const p of genericPdfs) {
            map.set(normalizeTitle(p.title), p);
        }
        return map;
    }, [genericPdfs]);

    // (Reverted) Only Problems on Trains uses DB; other sections use static links from learningData

    // Breadcrumb Navigation
    const breadcrumbs = [...pathParts];
    const handleBreadcrumbClick = (index) => {
        const newPath = pathParts.slice(0, index + 1);
        navigate(`learn-${newPath.map(encodeURIComponent).join('__')}`);
    };
    
    // Title
    const title = pathParts.length > 0 ? pathParts[pathParts.length - 1].replace(/__/g, ' ') : "Learning Center";

    const requireAuthOrRedirect = () => {
        const token = getToken();
        if (!token) {
            navigate('auth');
            return false;
        }
        return true;
    };

    const handleStartPractice = () => {
        if (!requireAuthOrRedirect()) return;
        // Always use the correct topic and redirect for Problems on Trains Practice
        const topic = isProblemOnTrains ? 'Problem on Trains Practice' : pathParts.join(' / ');
        const returnPage = `learn-${pathParts.map(encodeURIComponent).join('__')}`;
        if (startPracticeTest) {
            // Always reset and launch the correct test flow
            startPracticeTest({ topic, returnPage });
        } else {
            window.testCategory = topic;
            window.testReturnPage = returnPage;
            navigate('test-instructions');
        }
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
                    {/* Show buttons in all subsections of any main section (length 2, data is array) */}
                    {pathParts.length === 2 && Array.isArray(data) && (
                        <div className="flex flex-col gap-2">
                            <button onClick={handleStartPractice} className="inline-flex items-center px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors">
                                Practice Test
                            </button>
                        </div>
                    )}
                </div>

                {isFinalLevel ? (
                    // Final Level: Display item with actions: Practice Test (primary) and Download PDF (secondary)
                    isProblemOnTrains ? (
                        // Special content for Problem on Trains
                        <div className="space-y-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-blue-800 mb-4">📚 Study Materials</h3>
                                {loadingPdfs ? (
                                    <div className="text-sm text-slate-500">Loading PDFs…</div>
                                ) : pdfs.length > 0 ? (
                                    <ul className="space-y-3">
                                        {pdfs.map(item => (
                                            <li key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-300">
                                                <div className="flex items-center min-w-0">
                                                    <PdfIcon />
                                                    <a
                                                        className="ml-4 font-medium text-slate-700 truncate hover:text-blue-700"
                                                        href={buildViewUrl(item.id)}
                                                        onClick={(e) => { if (!requireAuthOrRedirect()) { e.preventDefault(); } }}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title={item.title}
                                                    >
                                                        {item.title}
                                                    </a>
                                                </div>
                                                <a 
                                                    href={buildDownloadUrl(item.id)} 
                                                    onClick={(e) => { if (!requireAuthOrRedirect()) { e.preventDefault(); } }}
                                                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 font-semibold"
                                                >
                                                    Download PDF
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-sm text-slate-500">No study materials found for this topic yet.</div>
                                )}
                            </div>
                            
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-green-800 mb-4">🎯 Practice Test</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="bg-white p-3 rounded-lg border border-green-300">
                                        <span className="text-sm text-green-600 font-semibold">Questions</span>
                                        <div className="text-lg font-bold text-green-800">30</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-green-300">
                                        <span className="text-sm text-green-600 font-semibold">Duration</span>
                                        <div className="text-lg font-bold text-green-800">30 min</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-green-300">
                                        <span className="text-sm text-green-600 font-semibold">Topics</span>
                                        <div className="text-lg font-bold text-green-800">All Types</div>
                                    </div>
                                </div>
                                <p className="text-green-700 mb-4">
                                    Comprehensive practice test covering speed conversion, train crossing problems, relative speed, and more.
                                </p>
                                <button
                                    onClick={handleStartPractice}
                                    className="mt-2 px-6 py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors text-lg"
                                >
                                    Start Practice Test
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {loadingGeneric ? (
                                <div className="text-sm text-slate-500">Loading PDFs…</div>
                            ) : genericPdfs && genericPdfs.length > 0 ? (
                                <ul className="space-y-3">
                                    {genericPdfs.map(item => (
                                        <li key={item.id} className="flex items-center justify-between p-4 rounded-md bg-slate-50 hover:bg-green-100 transition-colors">
                                            <a href={buildViewUrl(item.id)} target="_blank" rel="noopener noreferrer" className="flex items-center min-w-0" onClick={(e) => { if (!requireAuthOrRedirect()) { e.preventDefault(); } }}>
                                                <PdfIcon />
                                                <span className="ml-4 font-medium text-slate-700 truncate">{item.title}</span>
                                            </a>
                                            <a href={buildDownloadUrl(item.id)} className="inline-flex items-center px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 font-semibold ml-4" onClick={(e) => { if (!requireAuthOrRedirect()) { e.preventDefault(); } }}>
                                                Download PDF
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-sm text-slate-500">No PDFs available for this section yet.</div>
                            )}
                        </div>
                    )
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
                {/* Show Problem on Trains card in every Aptitude sub-section except Problems on Trains itself */}
                {/* Problem on Trains special card removed as requested */}
            </div>
        </div>
    );
};

export default LearnContentPage;
