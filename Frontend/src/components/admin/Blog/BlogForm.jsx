import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import BlogSectionEditor from "./BlogSectionEditor";

const categories = ['All', 'Philosophy', 'Training', 'Culture', 'Technique', 'History', "Others"];

const initialSection = () => ({
  id: uuidv4(),
  subtitle: "",
  description: "",
  imageUrl: "",
});

export default function BlogForm({ post, onSuccess }) {
  const { user } = useUser();
  const formRef = useRef();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [formData, setFormData] = useState({
    title: "",
    category: categories[0],
    customCategory: "",
    featured: false,
    authorName: "",
    authorLink: "",
    authorEmail: "",
    sections: [initialSection()],
  });

  const [message, setMessage] = useState(null);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        authorName: user.fullName || "",
        authorEmail: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateSection = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec, idx) =>
        idx === currentSectionIdx ? { ...sec, [key]: value } : sec
      ),
    }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, initialSection()],
    }));
    setCurrentSectionIdx(formData.sections.length);
  };

  const removeSection = (idx) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx),
    }));
    setCurrentSectionIdx(0);
  };

  const switchSection = (idx) => setCurrentSectionIdx(idx);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.title.trim()) {
      return setMessage({ type: "error", text: "Title is required." });
    }

    const cleanSections = formData.sections.map(({ id, ...rest }) => rest);

    for (let i = 0; i < cleanSections.length; i++) {
      const sec = cleanSections[i];
      if (!sec.subtitle.trim() || !sec.description.trim()) {
        return setMessage({
          type: "error",
          text: `Section ${i + 1} must have a subtitle and description.`,
        });
      }
    }

    const resolvedCategory =
      formData.category === "Others" ? formData.customCategory.trim() : formData.category;

    const payload = {
      ...formData,
      category: resolvedCategory,
      customCategory: formData.category === "Others" ? formData.customCategory.trim() : "",
      sections: cleanSections,
    };

    const API_URL =
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_API_URL
        : "http://localhost:5000";

    try {
      const headers = {
        "x-frontend-secret": import.meta.env.VITE_FRONTEND_SECRET,
        "x-user-email": user?.primaryEmailAddress?.emailAddress || "",
      };

      if (post?._id) {
        await axios.put(`${API_URL}/admin/upload/${post._id}`, payload, { headers });
        setMessage({ type: "success", text: "Post updated successfully." });
      } else {
        await axios.post(`${API_URL}/admin/upload`, payload, { headers });
        setMessage({ type: "success", text: "Post created successfully." });
      }

      setFormData({
        title: "",
        category: categories[0],
        customCategory: "",
        featured: false,
        authorName: user?.fullName || "",
        authorLink: "",
        authorEmail: user?.primaryEmailAddress?.emailAddress || "",
        sections: [initialSection()],
      });
      setCurrentSectionIdx(0);
      onSuccess();
    } catch (err) {
      console.error("Submission Error:", err);
      const serverError =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setMessage({ type: "error", text: serverError });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-6 max-w-2xl backdrop-blur-sm mx-auto p-6 rounded-lg shadow-lg ${isDarkMode
          ? "bg-gray-900/20  text-white border border-gray-800"
          : "bg-white/20 text-gray-900 border border-gray-200"
        }`}
    >
      <h2 className="text-2xl font-bold mb-2">Upload Blog Post</h2>

      {message && (
        <div
          className={`p-2 rounded ${message.type === "error"
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
            }`}
        >
          {message.text}
        </div>
      )}

      <input
        type="text"
        name="title"
        placeholder="Blog Title"
        value={formData.title}
        onChange={handleInput}
        className={`w-full p-2 border rounded ${isDarkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-gray-50 text-black border-gray-300"
          }`}
        required
      />

      <div className="space-y-2">
        <select
          name="category"
          value={formData.category}
          onChange={handleInput}
          className={`w-full p-2 border rounded ${isDarkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-gray-50 text-black border-gray-300"
            }`}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {formData.category === "Others" && (
          <input
            type="text"
            name="customCategory"
            placeholder="Enter custom category"
            value={formData.customCategory}
            onChange={handleInput}
            className={`w-full p-2 border rounded ${isDarkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-gray-50 text-black border-gray-300"
              }`}
          />
        )}
      </div>

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleInput}
        />
        Featured
      </label>

      <input
        type="text"
        value={formData.authorName}
        readOnly
        className={`w-full p-2 border bg-gray-200 rounded ${isDarkMode ? "text-gray-900" : "text-gray-700"
          }`}
        placeholder="Author Name"
      />

      <input
        type="email"
        value={formData.authorEmail}
        readOnly
        className={`w-full p-2 border bg-gray-200 rounded ${isDarkMode ? "text-gray-900" : "text-gray-700"
          }`}
        placeholder="Author Email"
      />

      <input
        type="text"
        name="authorLink"
        placeholder="Author Link (optional)"
        value={formData.authorLink}
        onChange={handleInput}
        className={`w-full p-2 border rounded ${isDarkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-gray-50 text-black border-gray-300"
          }`}
      />

      <div>
        <div className="flex gap-2 mb-4 flex-wrap">
          {formData.sections.map((section, idx) => (
            <button
              key={section.id}
              type="button"
              className={`px-3 py-1 rounded border focus:outline-none transition ${currentSectionIdx === idx
                  ? isDarkMode
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-blue-100 text-blue-700 border-blue-300"
                  : isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              onClick={() => switchSection(idx)}
            >
              Section {idx + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={addSection}
            className={`px-3 py-1 rounded border transition ${isDarkMode
                ? "bg-green-700 text-white border-green-700"
                : "bg-green-100 text-green-700 border-green-300"
              }`}
          >
            + Add Section
          </button>
        </div>

        <BlogSectionEditor
          section={formData.sections[currentSectionIdx]}
          onChange={(key, value) => updateSection(key, value)}
          onRemove={() => removeSection(currentSectionIdx)}
          showRemove={formData.sections.length > 1}
          isDarkMode={isDarkMode}
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-lg font-semibold transition ${isDarkMode
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
      >
        {post ? "Update" : "Publish"} Blog
      </button>
    </form>
  );
}

