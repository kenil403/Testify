import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

// Pages (lazy-loaded to reduce initial bundle size)
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx"));
import apiAuth from "./api/auth.js";
import apiTests from "./api/tests.js";
const LearnPage = lazy(() => import("./pages/LearnPage.jsx"));
const LearnContentPage = lazy(() => import("./pages/LearnContentPage.jsx"));
const TestSelectionPage = lazy(() => import("./pages/TestSelectionPage.jsx"));
const DepartmentSelectionPage = lazy(() => import("./pages/DepartmentSelection.jsx"));
const TestInstructionsPage = lazy(() => import("./pages/TestInstructionsPage.jsx"));
const TestAreaPage = lazy(() => import("./pages/TestAreaPage.jsx"));
const TestResultPage = lazy(() => import("./pages/TestResultPage.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const AdminDashboard = lazy(() => import("./Admin/AdminDashboard.jsx"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage.jsx"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage.jsx"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage.jsx"));
const TechnicalSolutionPage = lazy(() => import("./pages/TechnicalSolutionPage.jsx"));
const MechanicalSolutionPage = lazy(() => import("./pages/MechanicalSolutionPage.jsx"));
const ComputerSolutionPage = lazy(() => import("./pages/ComputerSolutionPage.jsx"));
const ElectronicsSolutionPage = lazy(() => import("./pages/ElectronicsSolutionPage.jsx"));
const ChemicalSolutionPage = lazy(() => import("./pages/ChemicalSolutionPage.jsx"));
const CivilSolutionPage = lazy(() => import("./pages/CivilSolutionPage.jsx"));
const ElectricalSolutionPage = lazy(() => import("./pages/ElectricalSolutionPage.jsx"));

export default function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [appServerError, setAppServerError] = useState('');
  const [testState, setTestState] = useState({
    started: false,
    finished: false,
    currentQuestion: 0,
    answers: Array(10).fill(null),
    markedForReview: Array(10).fill(false),
    score: 0,
    testQuestions: null, // Store the exact questions used in the test
  });

  const navigate = (newPage) => {
    setPage(newPage);
    try { sessionStorage.setItem('last_page', newPage); } catch {}
    window.scrollTo(0, 0);
  };

  // Rehydrate auth state on refresh from sessionStorage
  useEffect(() => {
    const token = apiAuth.getToken();
    const storedUser = apiAuth.getStoredUser ? apiAuth.getStoredUser() : null;

    // If no token, start at home and do not rehydrate a user
    if (!token) {
      setCurrentUser(null);
      setPage('home');
      try { if (window.location.pathname !== '/') window.history.replaceState({}, '', '/'); } catch {}
      return;
    }

    // If token exists, optimistically hydrate from stored user (if any), then validate
    if (token && storedUser) {
      setCurrentUser(storedUser);
      const last = (() => { try { return sessionStorage.getItem('last_page'); } catch { return null; } })();
      const safeLast = (last === 'admin-dashboard' && storedUser.role !== 'Admin') ? null : last;
      const desiredPre = safeLast || (storedUser.role === 'Admin' ? 'admin-dashboard' : 'dashboard');
      setPage(desiredPre);
    }

    // If token exists, validate and refresh from DB; otherwise skip
    if (token) {
      (async () => {
        try {
          const data = await apiAuth.me();
          if (data && data.user) {
            setCurrentUser(data.user);
            if (apiAuth.setStoredUser) apiAuth.setStoredUser(data.user);

            // After authenticating, prefer last page if valid for role; otherwise go to role default
            const last = (() => { try { return sessionStorage.getItem('last_page'); } catch { return null; } })();
            const safeLastAfter = (last === 'admin-dashboard' && data.user.role !== 'Admin') ? null : last;
            const desired = safeLastAfter || (data.user.role === 'Admin' ? 'admin-dashboard' : 'dashboard');
            setPage(desired);
          }
        } catch (e) {
          const status = e?.response?.status;
          if (status === 401 || status === 403) {
            console.warn('Session invalid, clearing auth');
            if (apiAuth.clearAuth) apiAuth.clearAuth();
            setCurrentUser(null);
            setPage('auth');
            return;
          } else {
            console.warn('Session validation failed (network/server). Keeping existing session.');
          }
        }
        try {
          const res = await apiTests.getTestHistory();
          if (res && Array.isArray(res.testHistory)) {
            const email = (apiAuth.getStoredUser && apiAuth.getStoredUser()?.email) || storedUser?.email;
            if (email) localStorage.setItem(`user_${email}_test_history`, JSON.stringify(res.testHistory));
            setCurrentUser(prev => ({ ...prev, testHistory: res.testHistory }));
          }
        } catch (e) {
          console.warn('Could not refresh test history on rehydrate', e);
        }
      })();
    }

    // No path-based routing; nothing to listen to here
    return () => {};
  }, []);

  const resetTestState = () => {
    setTestState({
      started: false,
      finished: false,
      currentQuestion: 0,
      answers: Array(10).fill(null),
      markedForReview: Array(10).fill(false),
      score: 0,
      selectedCategory: null,
      returnPage: null,
      testQuestions: null,
      selectedPaperNumber: null
    });
  };

  const startPracticeTest = ({ topic, returnPage }) => {
    // Always reset test state first
    resetTestState();
    let questionCount = 10; // Default to 10 questions
    let nextReturnPage = returnPage;
    if (topic === 'Aptitude') {
      questionCount = 60;
      nextReturnPage = 'test-selection'; // Always go back to test-selection for Aptitude
    }
    if (topic === 'Problem on Trains Practice') {
      questionCount = 30; // Practice test always has 30 questions
    }
    setTestState({
      started: false,
      finished: false,
      currentQuestion: 0,
      answers: Array(questionCount).fill(null),
      markedForReview: Array(questionCount).fill(false),
      score: 0,
      selectedCategory: topic,
      returnPage: nextReturnPage,
      testQuestions: null // Will be seeded in TestAreaPage
    });
    navigate("test-instructions");
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await apiAuth.login({ email, password });
      apiAuth.setToken(data.token);
      setCurrentUser(data.user);
      if (apiAuth.setStoredUser) apiAuth.setStoredUser(data.user);
      
      // Fetch and cache test history for paper assignment and dashboard
      try {
        const res = await apiTests.getTestHistory();
        if (res && Array.isArray(res.testHistory)) {
          // Cache to localStorage keyed by email for synchronous reads
          localStorage.setItem(`user_${data.user.email}_test_history`, JSON.stringify(res.testHistory));
          setCurrentUser(prev => ({ ...prev, testHistory: res.testHistory }));
        }
      } catch (e) {
        console.warn('Could not fetch test history after login', e);
      }
      
      // Redirect based on role: Admin → admin-dashboard, Student → dashboard
      if (data.user && data.user.role === 'Admin') {
        navigate('admin-dashboard');
      } else {
        navigate('dashboard');
      }
    } catch (err) {
      console.error(err);
      setAppServerError(err?.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (name, email, password, department, mobile, role) => {
    try {
      const payload = { name, email, password, mobile, role };
      // Only include department for Student role
      if (role === 'Student' && department) {
        payload.department = department;
      }
      
      const data = await apiAuth.register(payload);
      apiAuth.setToken(data.token);
      setCurrentUser(data.user);
      if (apiAuth.setStoredUser) apiAuth.setStoredUser(data.user);
      
      // Try to fetch and cache history as well
      try {
        const res = await apiTests.getTestHistory();
        if (res && Array.isArray(res.testHistory)) {
          localStorage.setItem(`user_${data.user.email}_test_history`, JSON.stringify(res.testHistory));
          setCurrentUser(prev => ({ ...prev, testHistory: res.testHistory }));
        }
      } catch (e) {
        console.warn('Could not fetch test history after register', e);
      }
      
      // Redirect based on role: Admin → admin-dashboard, Student → dashboard
      if (data.user && data.user.role === 'Admin') {
        navigate('admin-dashboard');
      } else {
        navigate('dashboard');
      }
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || (err?.response?.data?.errors ? err.response.data.errors.map(e=>e.msg).join(', ') : 'Register failed');
      setAppServerError(msg);
    }
  };

  const addTestResult = async (category, score) => {
    try {
      const payload = { category, score };
      const res = await apiTests.addTestResult(payload);
      // update local state (prepend latest)
      setCurrentUser(prev => ({ ...prev, testHistory: res.testHistory }));
    } catch (err) {
      console.error('Failed to save test result', err);
    }
  };

  const updateUserProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try { sessionStorage.removeItem('last_page'); } catch {}
    if (apiAuth.clearAuth) apiAuth.clearAuth(); else apiAuth.setToken(null);
    navigate("auth");
  };

  const renderPage = () => {
    // Render admin dashboard only when specifically on that page; don't force-redirect on refresh
    if (page === "admin-dashboard" && currentUser && currentUser.role === "Admin") {
      return (
        <AdminDashboard 
          navigate={navigate} 
          adminUser={currentUser} 
          handleLogout={handleLogout}
        />
      );
    }

    if (page.startsWith("learn-")) {
      const pathString = page.substring(6);
      const pathParts = pathString ? pathString.split("__").map(decodeURIComponent) : [];
      return <LearnContentPage pathParts={pathParts} navigate={navigate} startPracticeTest={startPracticeTest} />;
    }
    switch (page) {
      case "home": return <HomePage navigate={navigate} />;
      case "auth": return (
        <AuthPage
          navigate={navigate}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          appServerError={appServerError}
          setAppServerError={setAppServerError}
        />
      );
      case "profile": return (
        <ProfilePage 
          navigate={navigate} 
          user={currentUser} 
          updateUserProfile={updateUserProfile}
          handleLogout={handleLogout}
        />
      );
      case "learn": return <LearnPage navigate={navigate} />;
      case "test-selection":
        // Block Admin users from accessing tests
        if (currentUser?.role === 'Admin') {
          alert('Admins cannot take tests. This feature is only for students.');
          navigate('admin-dashboard');
          return null;
        }
        // Allow browsing test selection without login; we'll enforce auth when proceeding to test
        return <TestSelectionPage navigate={navigate} setTestState={setTestState} />;
      case "department-selection":
        // Block Admin users from accessing tests
        if (currentUser?.role === 'Admin') {
          alert('Admins cannot take tests. This feature is only for students.');
          navigate('admin-dashboard');
          return null;
        }
        return (
          <DepartmentSelectionPage
            navigate={navigate}
            startTest={(dept) => {
              setTestState({
                started: false,
                finished: false,
                currentQuestion: 0,
                answers: Array(10).fill(null),
                markedForReview: Array(10).fill(false),
                score: 0,
                selectedCategory: dept
              });
              navigate("test-instructions");
            }}
          />
        );
      case "test-instructions":
        // Block Admin users from accessing tests
        if (currentUser?.role === 'Admin') {
          alert('Admins cannot take tests. This feature is only for students.');
          navigate('admin-dashboard');
          return null;
        }
        return (
          <TestInstructionsPage
            navigate={navigate}
            testState={testState}
            setTestState={setTestState}
            currentUser={currentUser}
          />
        );
      case "test-area":
        // Block Admin users from accessing tests
        if (currentUser?.role === 'Admin') {
          alert('Admins cannot take tests. This feature is only for students.');
          navigate('admin-dashboard');
          return null;
        }
        return (
          <TestAreaPage
            navigate={navigate}
            testState={testState}
            setTestState={setTestState}
            addTestResult={addTestResult}
            selectedCategory={testState.selectedCategory || "Aptitude"}
            currentUser={currentUser}
          />
        );
      case "test-result":
        // Block Admin users from accessing tests
        if (currentUser?.role === 'Admin') {
          alert('Admins cannot take tests. This feature is only for students.');
          navigate('admin-dashboard');
          return null;
        }
        return (
          <TestResultPage
            navigate={navigate}
            testState={testState}
            currentUser={currentUser}
            resetTest={() => setTestState({
              started: false,
              finished: false,
              currentQuestion: 0,
              answers: Array(10).fill(null),
              markedForReview: Array(10).fill(false),
              score: 0,
              selectedPaperNumber: testState?.selectedPaperNumber
            })}
          />
        );
      case "dashboard":
        // Block Admin users from accessing student dashboard
        if (currentUser?.role === 'Admin') {
          alert('Admins cannot access student dashboard. Redirecting to admin dashboard.');
          navigate('admin-dashboard');
          return null;
        }
        return <DashboardPage navigate={navigate} user={currentUser} />;
      case "about": return <AboutUsPage navigate={navigate} />;
      case "contact": return <ContactUsPage navigate={navigate} />;
      case "privacy-policy": return <PrivacyPolicyPage navigate={navigate} />;
      case "technical-solutions": return <TechnicalSolutionPage navigate={navigate} />;
      case "mechanical-solutions": return <MechanicalSolutionPage navigate={navigate} currentUser={currentUser} testState={testState} />;
      case "computer-solutions": return <ComputerSolutionPage navigate={navigate} currentUser={currentUser} testState={testState} />;
      case "electronics-solutions": return <ElectronicsSolutionPage navigate={navigate} currentUser={currentUser} testState={testState} />;
      case "chemical-solutions": return <ChemicalSolutionPage navigate={navigate} currentUser={currentUser} testState={testState} />;
      case "civil-solutions": return <CivilSolutionPage navigate={navigate} currentUser={currentUser} testState={testState} />;
      case "electrical-solutions": return <ElectricalSolutionPage navigate={navigate} currentUser={currentUser} testState={testState} />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  // Hide Navbar and Footer during test or admin dashboard
  const isTestRunning = page === "test-area";
  const isAdminDashboard = page === "admin-dashboard";
  
  return (
    <div className={`bg-slate-50 min-h-screen font-sans text-slate-800` + (isTestRunning ? " flex flex-col" : "") }>
      {!isTestRunning && !isAdminDashboard && <Navbar navigate={navigate} currentPage={page} currentUser={currentUser} handleLogout={handleLogout} />}
      <main className={isTestRunning ? "flex-1 flex items-center justify-center p-0 m-0 min-h-screen" : "p-4 md:p-8"}>{renderPage()}</main>
      {!isTestRunning && !isAdminDashboard && <Footer navigate={navigate} />}
    </div>
  );
}
