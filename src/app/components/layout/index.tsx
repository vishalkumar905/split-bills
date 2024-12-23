import { Toaster } from "../ui/toaster"
import Navbar from "./Navbar"

const Layout = ({ children }: any) => {
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navbar />
    {/* <SiderBar/> */}
    {children}
    <Toaster />
  </div>
}


export default Layout