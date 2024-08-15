import React, { useEffect } from "react";
import { lazy, Suspense } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./pages/Header";
const Home = lazy(() => import("./pages/Home"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Insights = lazy(() => import("./pages/Insights"));
const PrivacyPolicy = lazy(() => import("./pages/Privacy"));
const Competitor = lazy(() => import("./pages/Competitor"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const TOS = lazy(() => import("./pages/TOS"));
const Footer = lazy(() => import("./pages/Footer"));

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-slate-950">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/competitor-analysis" element={<Competitor />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms-of-service" element={<TOS />} />
          </Routes>
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
