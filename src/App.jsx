import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import Topbar from "./Components/Topbar";
import Dashboard from "./pages/Dashboard";
import TimeSeriesRates from "./pages/TimeSeriesRates";
import Library from "./pages/Library";
import Payouts from "./pages/Payouts";
import Settings from "./pages/Settings";
import Shedules from "./pages/Shedules";
import { useState } from "react";
import SidebarWithOrWithoutModal from "./Components/SidebarWithOrWithoutModal.jsx";

Modal.setAppElement("#root");

function App() {
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth <= 768
  );

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="main-container">
          <SidebarWithOrWithoutModal
            isSidebarOpen={isSidebarOpen}
            closeSidebar={closeSidebar}
            isMediumScreen={isMediumScreen}
            setIsMediumScreen={setIsMediumScreen}
          />
          <main className="content">
            <Topbar openSidebar={openSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/timeSeriesRatesPage"
                element={<TimeSeriesRates />}
              />
              <Route path="/library" element={<Library />} />
              <Route path="/payouts" element={<Payouts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/shedules" element={<Shedules />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
