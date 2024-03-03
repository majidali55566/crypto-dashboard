/* eslint-disable react/prop-types */
import { useEffect } from "react";
import SideBar from "./Sidebar";
import SidebarModal from "./SideModal";

function SidebarWithOrWithoutModal({
  isSidebarOpen,
  closeSidebar,
  isMediumScreen,
  setIsMediumScreen,
}) {
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMediumScreen ? (
        <SidebarModal
          closeSidebar={closeSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      ) : (
        <SideBar />
      )}
    </div>
  );
}

export default SidebarWithOrWithoutModal;
