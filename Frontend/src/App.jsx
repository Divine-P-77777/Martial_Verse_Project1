import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from "./components/pages/Home";

import NotFound from "./components/pages/NotFound";
import BlogDetail from "./components/pages/BlogDetail";
import BlogListing from "./components/pages/BlogListing";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/common/Login";
import About from './components/pages/About';
import Contact from './components/pages/sections/Contact';

import AccessRequest from "./components/pages/AccessRequest";
import AdminDashBoard from './components/admin/AdminDashBoard';
import AdminRequestTable from "./components/admin/AdminRequestTable"
import AdminProtectedRoute from './components/common/AdminProtectedRoute';
import BlogUpload from "./components/admin/Blog/blogUpload";

import Terms from "./components/common/Terms";
import Privacy from "./components/common/Privacy";


import useLenis from './hooks/useLenis';

import PlayList from './components/pages/PlaylistCarousel';





function App() {


  const location = useLocation();
  useLenis();



  return (
    <>

      <Navbar showScrollLinks={location.pathname === "/"} />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/about" element={<About />} />
        <Route path="/playlists" element={<PlayList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/accessrequest" element={<AccessRequest />} />


        <Route path="/admin/upload" element={
          <AdminProtectedRoute><BlogUpload /></AdminProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminProtectedRoute><AdminDashBoard /></AdminProtectedRoute>
        } />
        <Route path="/admin/access" element={
          <AdminProtectedRoute><AdminRequestTable /></AdminProtectedRoute>
        } />


        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
