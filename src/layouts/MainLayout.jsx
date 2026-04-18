import { Outlet, useLocation } from 'react-router-dom'
import BackToTopButton from '../components/BackToTopButton'
import Footer from '../components/Footer'
import MobileFloatingCTA from '../components/MobileFloatingCTA'
import Navbar from '../components/Navbar'
import ScrollProgress from '../components/ScrollProgress'
import SocialFloat from '../components/SocialFloat'
import useAuth from '../hooks/useAuth'
import BackgroundDecor from '../components/ui/BackgroundDecor'

function MainLayout({ children = null }) {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const showPublicEnhancements = !isAuthenticated && ['/', '/login', '/register'].includes(location.pathname)

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <BackgroundDecor />
      {showPublicEnhancements ? <SocialFloat /> : null}
      <BackToTopButton />
      {showPublicEnhancements ? <MobileFloatingCTA /> : null}
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] flex-col px-4 py-4 pb-24 sm:px-6 sm:py-6 sm:pb-8 lg:px-8 lg:py-8 xl:px-10">
        <Navbar />
        <main className="flex-1 py-8 sm:py-10 lg:py-14">
          {children ?? <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
