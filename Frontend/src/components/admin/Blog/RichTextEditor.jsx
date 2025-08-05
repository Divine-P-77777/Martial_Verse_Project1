import React, { useRef, useEffect } from "react";


function isEditorEmpty(ref) {
  return !ref.current || !ref.current.textContent.trim();
}

export default function RichTextEditor({
  value,
  onChange,
  isDarkMode,
  placeholder = "Type something...",
}) {
  const editorRef = useRef(null);

  // Update editor when value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  // Efficient change handler
  const updateValue = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      if (html !== value) {
        onChange(html);
      }
    }
  };

  // Toggle formatting for lists and inline styles
  const handleFormat = (command, val = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    // Lists: ensure block-level structure
    if (command === "insertUnorderedList" || command === "insertOrderedList") {
      document.execCommand(command, false, val);
      // After formatting, force a reflow for proper rendering
      setTimeout(() => {
        // Clean up empty <li> artifacts
        if (editorRef.current) {
          const lis = editorRef.current.querySelectorAll("li");
          lis.forEach(li => {
            if (!li.textContent.trim()) {
              li.parentNode.removeChild(li);
            }
          });
        }
        updateValue();
      }, 0);
    } else {
      document.execCommand(command, false, val);
      setTimeout(updateValue, 0);
    }
  };

  // Button state for toggling (optional visual feedback)
  const queryActive = (command) => {
    try {
      return document.queryCommandState(command);
    } catch {
      return false;
    }
  };

  // Plain text paste
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    if (!text) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    setTimeout(updateValue, 0);
  };

  // Show placeholder when editor is empty
  const showPlaceholder = isEditorEmpty(editorRef);

  return (
    <div className="relative">
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => handleFormat("bold")}
          title="Bold"
          className={`font-bold px-2 py-1 rounded ${queryActive("bold") ? "bg-gray-300 dark:bg-gray-700" : ""}`}
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => handleFormat("italic")}
          title="Italic"
          className={`italic px-2 py-1 rounded ${queryActive("italic") ? "bg-gray-300 dark:bg-gray-700" : ""}`}
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => handleFormat("underline")}
          title="Underline"
          className={`underline px-2 py-1 rounded ${queryActive("underline") ? "bg-gray-300 dark:bg-gray-700" : ""}`}
        >
          U
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => handleFormat("insertUnorderedList")}
          title="Bullets"
          className={`px-2 py-1 rounded ${queryActive("insertUnorderedList") ? "bg-gray-300 dark:bg-gray-700" : ""}`}
        >
          &#8226; List
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => handleFormat("insertOrderedList")}
          title="Numbered"
          className={`px-2 py-1 rounded ${queryActive("insertOrderedList") ? "bg-gray-300 dark:bg-gray-700" : ""}`}
        >
          1. List
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => {
            if (editorRef.current) editorRef.current.focus();
            const url = prompt("Enter URL:");
            if (url) handleFormat("createLink", url);
          }}
          title="Insert Link"
          className="px-2 py-1 rounded"
        >🔗</button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => handleFormat("removeFormat")}
          title="Clear formatting"
          className="px-2 py-1 rounded"
        >⨉</button>
      </div>
      <div
        ref={editorRef}
        className={`rounded border transition p-3 overflow-auto relative
          ${isDarkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
        contentEditable
        suppressContentEditableWarning
        onInput={updateValue}
        onBlur={updateValue}
        onPaste={handlePaste}
        spellCheck
        aria-label={placeholder}
        style={{
          minHeight: "150px",
          maxHeight: "200px",
          resize: "vertical",
          lineHeight: "1.6",
          borderRadius: "0.5rem"
        }}
      />
      {showPlaceholder && (
        <div
          className="absolute pointer-events-none px-3 py-2 text-gray-400 select-none"
          style={{
            top: "48px",
            left: "0",
            right: "0"
          }}
        >
          {placeholder}
        </div>
      )}
      <div className="text-xs text-gray-500 mt-1">
        <span>
          <strong>Tip:</strong> Select text, then click a format button to apply or remove formatting (e.g., Bold, Italic, List).
        </span>
      </div>
    </div>
  );
}