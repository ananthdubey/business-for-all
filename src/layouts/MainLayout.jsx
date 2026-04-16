import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'
import SocialFloat from '../components/SocialFloat'
import BackgroundDecor from '../components/ui/BackgroundDecor'

function MainLayout({ children = null }) {
  return (
    <div className="min-h-screen">
      <BackgroundDecor />
      <SocialFloat />
      <ChatWidget />
      <div className="mx-auto flex min-h-screen w-full max-w-[88rem] flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 xl:px-10">
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
