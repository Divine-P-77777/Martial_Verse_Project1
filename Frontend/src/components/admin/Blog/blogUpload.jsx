import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogForm from './BlogForm';
import BlogTable from './BlogTable';

const backgroundImages = [
  '/bg/martial1.jpg',
  '/bg/martial2.jpeg',
  '/bg/martial3.jpg',
  '/bg/martial4.jpeg',
  '/bg/martial5.jpg',
];

export default function BlogUpload() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [bgIndex, setBgIndex] = useState(0);

  const { user } = useUser();

  const API_URL =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_URL
      : 'http://localhost:5000';

  const headers = {
    'x-frontend-secret': import.meta.env.VITE_FRONTEND_SECRET,
    'x-user-email': user?.primaryEmailAddress?.emailAddress || '',
  };

  const fetchPosts = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setErrMsg('');

      const { data } = await axios.get(`${API_URL}/admin/upload`, {
        headers,
      });

      const isPrimaryAdmin = user.primaryEmailAddress?.emailAddress === 'dynamicphillic77777@gmail.com';
      const filtered = isPrimaryAdmin ? data : data.filter(post => post.authorEmail === user.primaryEmailAddress?.emailAddress);

      setPosts(filtered);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setPosts([]);
      setErrMsg(
        err?.response?.data?.error ||
        (err?.response?.status === 401 ? 'Unauthorized. Please sign in.' : 'Unable to load posts.')
      );
    } finally {
      setLoading(false);
    }
  }, [API_URL, page, user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.");
    if (!confirmed) return;
    try {
      await axios.delete(`${API_URL}/admin/upload/${id}`, { headers });
      fetchPosts();
    } catch (err) {
      console.error('Delete failed:', err);
      setErrMsg(err?.response?.data?.error || 'Delete failed.');
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
        />
      </AnimatePresence>

      <div className="relative z-10 p-6 space-y-10 pt-20 bg-white/80 dark:bg-black/70">
        <BlogForm
          post={editingPost}
          onSuccess={() => {
            fetchPosts();
            setEditingPost(null);
          }}
        />

        {loading && <p className="text-sm text-gray-500">Loading…</p>}
        {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}

        <BlogTable
          posts={posts}
          page={page}
          onPageChange={setPage}
          onEdit={setEditingPost}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
