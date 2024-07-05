import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Reviews from "./Components/Reviews";
import Insights from "./Components/Insights";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PrivacyPolicy from "./Components/Privacy";
import Competitor from "./Components/Competitor";
import VideoPlayer from "./Components/Shared/VideoModal";
import AboutUs from "./Components/AboutUs";
import TOS from "./Components/TOS";
// import { AuthContext } from "./Components/context/Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// import './App.css';

function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className={`${formOpen ? `main-parent` : "close-parent"}`}>
      <Router>
        <AppContent formOpen={formOpen} setFormOpen={setFormOpen} />
      </Router>
    </div>
  );
}
function AppContent({ formOpen, setFormOpen }) {
  const location = useLocation();
  // const authContext = useContext(AuthContext);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on navigation
    // console.log("auth Context : ", authContext);
  }, [location.pathname]);

  const handleFormClose = () => {
    setFormOpen(false);
  };
  return (
    <div onClick={handleFormClose} className="flex flex-col min-h-screen">
      <Header formOpen={formOpen} setFormOpen={setFormOpen} />
      <div className="flex-grow bg-slate-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/video-player" element={<VideoPlayer />} />
          <Route path="/competitor-analysis" element={<Competitor />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-of-service" element={<TOS />} />
        </Routes>
      </div>
      <div
        className="flex flex-end align-baseline"
        style={{
          position: "",
          bottom: 0,
          left: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}

export default App;
