import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Professions from "./pages/Professions";
import ProfessionDetail from "./pages/ProfessionDetail";
import SubjectDetail from "./pages/SubjectDetail";
import Lesson from "./pages/Lesson";
import Test from "./pages/Test";
import Exam from "./pages/Exam";
import FinalExam from "./pages/FinalExam";
import Diploma from "./pages/Diploma";
import ThesisDefense from "./pages/ThesisDefense";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import HowItWorks from "./pages/HowItWorks";
import Contacts from "./pages/Contacts";
import DemoDashboard from "./pages/DemoDashboard";
import EmployerPartner from "./pages/EmployerPartner";
import NotFound from "./pages/NotFound";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterTeacher from "./pages/RegisterTeacher";
import Layout from "./components/Layout"; // Новый универсальный layout!
import PitchDeckPage from "./pages/PitchDeckPage";



export default function App() {
  const [demoRole, setDemoRole] = useState(null);

  function handleDemoLogin(role) { setDemoRole(role); }
  function handleDemoLogout() { setDemoRole(null); }

  // Определяем режим layout
  const mode = demoRole ? "demo" : "public";

  return (
    <Router>
      <Routes>
        {/* ЕДИНЫЙ Layout для всех страниц */}
        <Route element={<Layout mode={mode} demoRole={demoRole} />}>
          {/* Витрина — всегда открыты */}
          <Route path="/" element={<Home onDemoLogin={handleDemoLogin} />} />
          <Route path="/pitch-deck" element={<PitchDeckPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/employer-partner" element={<EmployerPartner />} />
          <Route path="/register-student" element={<RegisterStudent />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} />

          {/* Demo student */}
          {demoRole === "student" && (
            <>
              <Route path="/demo" element={<DemoDashboard onLogout={handleDemoLogout} />} />
              <Route path="/professions" element={<Professions />} />
              <Route path="/professions/:id" element={<ProfessionDetail />} />
              <Route path="/professions/:id/subject/:subjectId" element={<SubjectDetail />} />
              <Route path="/professions/:id/subject/:subjectId/lesson/:lessonId" element={<Lesson />} />
              <Route path="/professions/:id/subject/:subjectId/test/:testId" element={<Test />} />
              <Route path="/professions/:id/subject/:subjectId/exam/:examId" element={<Exam />} />
              <Route path="/professions/:id/final-exam" element={<FinalExam />} />
              <Route path="/professions/:id/diploma" element={<Diploma />} />
              <Route path="/professions/:id/thesis-defense" element={<ThesisDefense />} />
              <Route path="/dashboard" element={<DemoDashboard />} />
            </>
          )}
          {/* Demo teacher */}
          {demoRole === "teacher" && (
            <>
              <Route path="/demo" element={<TeacherDashboard onLogout={handleDemoLogout} />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard onLogout={handleDemoLogout} />} />
            </>
          )}

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}
