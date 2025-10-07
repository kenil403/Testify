import { useState } from "react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

// Pages
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import apiAuth from "./api/auth.js";
import apiTests from "./api/tests.js";
import LearnPage from "./pages/LearnPage.jsx";
import LearnContentPage from "./pages/LearnContentPage.jsx";
import TestSelectionPage from "./pages/TestSelectionPage.jsx";
import DepartmentSelectionPage from "./pages/DepartmentSelection.jsx";
import TestInstructionsPage from "./pages/TestInstructionsPage.jsx";
import TestAreaPage from "./pages/TestAreaPage.jsx";
import TestResultPage from "./pages/TestResultPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import AptitudeSolutionPage from "./pages/AptitudeSolutionPage.jsx";
import TechnicalSolutionPage from "./pages/TechnicalSolutionPage.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
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
    window.scrollTo(0, 0);
  };

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
      testQuestions: null
    });
  };

  const startPracticeTest = ({ topic, returnPage }) => {
    // Always reset test state first
    resetTestState();
    
    // Determine question count based on topic
    const questionCount = topic === 'Aptitude' ? 60 : 10;
    setTestState({
      started: false,
      finished: false,
      currentQuestion: 0,
      answers: Array(questionCount).fill(null),
      markedForReview: Array(questionCount).fill(false),
      score: 0,
      selectedCategory: topic,
      returnPage
    });
    navigate("test-instructions");
  };

  const handleLogin = async (email, password) => {
    // Admin local fallback
    if (email === "admin123@gmail.com" && password === "Admin@123") {
      setCurrentUser({ 
        name: "Admin User", 
        email: "admin123@gmail.com", 
        department: "Administration",
        mobile: "9876543200",
        role: "Admin"
      });
      navigate("admin-dashboard");
      return;
    }

    try {
      const data = await apiAuth.login({ email, password });
      apiAuth.setToken(data.token);
      setCurrentUser(data.user);
      if (data.user && data.user.role === 'Admin') navigate('admin-dashboard');
      else navigate('dashboard');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (name, email, password, department, mobile, role) => {
    try {
      const data = await apiAuth.register({ name, email, password, department, mobile, role });
      apiAuth.setToken(data.token);
      setCurrentUser(data.user);
      if (data.user && data.user.role === 'Admin') navigate('admin-dashboard');
      else navigate('dashboard');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || (err?.response?.data?.errors ? err.response.data.errors.map(e=>e.msg).join(', ') : 'Register failed');
      alert(msg);
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
    navigate("auth");
  };

  const renderPage = () => {
    // If admin is logged in, only allow admin dashboard
    if (currentUser && currentUser.role === "Admin") {
      if (page === "admin-dashboard") {
        return (
          <AdminDashboard 
            navigate={navigate} 
            adminUser={currentUser} 
            handleLogout={handleLogout}
          />
        );
      } else {
        // Redirect admin to admin dashboard for any other page
        navigate("admin-dashboard");
        return null;
      }
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
      case "test-selection": return <TestSelectionPage navigate={navigate} setTestState={setTestState} />;
      case "department-selection": return <DepartmentSelectionPage navigate={navigate} startTest={(dept) => {
        resetTestState();
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
      }} />;
      case "test-instructions": return <TestInstructionsPage navigate={navigate} testState={testState} setTestState={setTestState} />;
      case "test-area": return <TestAreaPage navigate={navigate} testState={testState} setTestState={setTestState} addTestResult={addTestResult} selectedCategory={testState.selectedCategory || "Aptitude"} />;
      case "test-result": return <TestResultPage 
        navigate={navigate} 
        testState={testState} 
        resetTest={() => setTestState({
          started: false,
          finished: false,
          currentQuestion: 0,
          answers: Array(10).fill(null),
          markedForReview: Array(10).fill(false),
          score: 0,
        })}
      />;
      case "dashboard": return <DashboardPage navigate={navigate} user={currentUser} />;
      case "about": return <AboutUsPage navigate={navigate} />;
      case "contact": return <ContactUsPage navigate={navigate} />;
      case "privacy-policy": return <PrivacyPolicyPage navigate={navigate} />;
      case "technical-solutions": return <TechnicalSolutionPage navigate={navigate} />;
      case "aptitude-solutions": return <AptitudeSolutionPage navigate={navigate} />;
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
