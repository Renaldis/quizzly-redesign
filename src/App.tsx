import { BrowserRouter as Router, Routes, Route } from 'react-router';
import LandingPageLayout from './app/(public)/home/_components/landing-page-layout';
import Home from './app/(public)/home/home';
import ProtectedRoute from './app/_components/protected-route';
import DashboardLayout from './app/_components/dashboard-layout';
import DashboardHome from './app/(authenticated)/dashboard/home/home';
import QuizList from './app/(authenticated)/dashboard/quiz/quizz';
import QuizActive from './app/(authenticated)/dashboard/quiz/quiz-active';
import QuizFinish from './app/(authenticated)/dashboard/quiz/quiz-finish';
import History from './app/(authenticated)/dashboard/quiz/history';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPageLayout>
              <Home />
            </LandingPageLayout>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="quizz" element={<QuizList />} />
            <Route path="quizz/active" element={<QuizActive />} />
            <Route path="quizz/result" element={<QuizFinish />} />
            <Route path="history" element={<History />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
