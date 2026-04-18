import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import ProtectedRoute from './components/ProtectedRoute'
import useAuth from './hooks/useAuth'
import MainLayout from './layouts/MainLayout'

const Home = lazy(() => import('./pages/Home'))
const MemberHome = lazy(() => import('./pages/MemberHome'))
const About = lazy(() => import('./pages/About'))
const Categories = lazy(() => import('./pages/Categories'))
const Franchise = lazy(() => import('./pages/Franchise'))
const FranchiseDetail = lazy(() => import('./pages/FranchiseDetail'))
const Plans = lazy(() => import('./pages/Plans'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function PageTransition({ children }) {
  const MotionDiv = motion.div

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionDiv>
  )
}

function PublicLandingRoute() {
  const { isAuthenticated, isReady } = useAuth()

  if (!isReady) {
    return <LoadingScreen />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Home />
}

function AuthScreenRoute({ children }) {
  const { isAuthenticated, isReady } = useAuth()

  if (!isReady) {
    return <LoadingScreen />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function App() {
  const location = useLocation()

  return (
    <Suspense fallback={<MainLayout><LoadingScreen /></MainLayout>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route index element={<PageTransition><PublicLandingRoute /></PageTransition>} />
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <PageTransition><MemberHome /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="about"
              element={
                <ProtectedRoute>
                  <PageTransition><About /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="categories"
              element={
                <ProtectedRoute>
                  <PageTransition><Categories /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="franchise"
              element={
                <ProtectedRoute>
                  <PageTransition><Franchise /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="franchise/:slug"
              element={
                <ProtectedRoute>
                  <PageTransition><FranchiseDetail /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="plans"
              element={
                <ProtectedRoute>
                  <PageTransition><Plans /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="contact"
              element={
                <ProtectedRoute>
                  <PageTransition><Contact /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={
                <AuthScreenRoute>
                  <PageTransition><Login /></PageTransition>
                </AuthScreenRoute>
              }
            />
            <Route
              path="register"
              element={
                <AuthScreenRoute>
                  <PageTransition><Register /></PageTransition>
                </AuthScreenRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <PageTransition><Dashboard /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default App
