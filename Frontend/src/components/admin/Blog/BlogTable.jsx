import { useSelector } from "react-redux";

export default function BlogTable({ posts, page, onPageChange, onEdit, onDelete, hasMore = true }) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const tableStyle = isDarkMode
    ? "bg-gray-900/20 text-white border border-gray-800"
    : "bg-white/20 text-gray-900 border border-gray-200";

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Blog Posts</h2>
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className={`w-full text-sm rounded-xl overflow-hidden ${tableStyle}`}>
          <thead className={isDarkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}>
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Featured</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post._id} className={isDarkMode ? "border-t border-gray-800 hover:bg-gray-800/40 backdrop-blur-sm" : "border-t border-gray-200 bg-white/10 hover:bg-gray-200 backdrop-blur-sm"}>
                  <td className="p-3 font-medium">{post.title}</td>
                  <td className="p-3">{post.category}</td>
                  <td className="p-3">{post.featured ? "✅" : "❌"}</td>
                  <td className="p-3">{post.authorName}</td>
                  <td className="p-3">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 space-x-3">
                    <button
                      onClick={() => onEdit(post)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(post._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                    <a
                      href={`/blogs/${post._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-sm rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="flex items-center text-sm font-medium">Page {page}</span>
        <button
          disabled={!hasMore}
          onClick={() => onPageChange(page + 1)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-sm rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}