import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Poems from "./pages/Poems";
import PoemDetails from "./pages/PoemDetails";
import About from "./pages/About";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EditPoem from "./pages/admin/EditPoem";   // ✅ NEW

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* 🔥 Scroll to top on route change */}
      <ScrollToTop />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow pt-24">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/about" element={<About />} />
          <Route path="/poems/title/:title" element={<PoemDetails />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* ✅ Manage Poems Page */}
          <Route path="/admin/poem/edit" element={<EditPoem />} />

          {/* ✅ Edit Poem */}
          <Route path="/admin/poem/edit/:id" element={<EditPoem />} />

        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;