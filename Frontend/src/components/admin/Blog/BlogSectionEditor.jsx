import CloudinaryUploader from "../../common/Cloudinary";
import RichTextEditor from "./RichTextEditor";

export default function BlogSectionEditor({
  section,
  onChange,
  onRemove,
  showRemove,
  isDarkMode,
}) {
  return (
    <div
      className={`rounded-lg shadow-md p-4 mb-4 transition-colors ${
        isDarkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <input
        type="text"
        placeholder="Subtitle"
        value={section.subtitle}
        onChange={(e) => onChange("subtitle", e.target.value)}
        className={`w-full p-2 rounded border mb-2 ${
          isDarkMode
            ? "bg-gray-900 text-white border-gray-600"
            : "bg-gray-50 text-black border-gray-300"
        }`}
        required
      />

      <RichTextEditor
        value={section.description}
        onChange={(val) => onChange("description", val)}
        isDarkMode={isDarkMode}
      />

      <div className="mt-2">
        <CloudinaryUploader
          value={section.imageUrl}
          onUpload={(url) => onChange("imageUrl", url)}
          isDarkMode={isDarkMode}
        />
      </div>

      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={`mt-4 text-sm px-3 py-1 rounded transition ${
            isDarkMode
              ? "bg-red-700 text-white hover:bg-red-800"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          Remove Section
        </button>
      )}
    </div>
  );
}
