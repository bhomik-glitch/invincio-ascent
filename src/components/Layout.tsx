import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SocialSidebar from "./SocialSidebar";
import WhatsAppChat from "./WhatsAppChat";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16 overflow-x-hidden w-full">
      <Navbar />
      <SocialSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Layout;
