import Navbar from "./Navbar"
import SiderBar from "./Sidebar"

const Layout = ({ children }: any) => {
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navbar />
    {/* <SiderBar/> */}
    {children}
  </div>
}


export default Layout