import React, { useState } from "react";
import "./SnippetList.css";

const SnippetList = ({ snippets }) => {
  const [popup, setPopup] = useState(null);

  const handleCopy = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(code)
        .then(() => alert("Code copied to clipboard"))
        .catch((err) => {
          console.error("Failed to copy code:", err);
          alert("Failed to copy code. Please try again.");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Code copied to clipboard");
      } catch (err) {
        console.error("Failed to copy code:", err);
        alert("Failed to copy code. Please try again.");
      }
      document.body.removeChild(textArea);
    }
  };

  const openPopup = (snippet) => {
    setPopup(snippet);
  };

  const closePopup = () => {
    setPopup(null);
  };

  return (
    <div className="snippet-list">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="snippet-item">
          <div className="snippet-title" onClick={() => openPopup(snippet)}>
            <h3>{snippet.title}</h3>
          </div>
        </div>
      ))}
      {popup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
              ×
            </button>
            <h3>{popup.title}</h3>
            <p className="snippet-category">{popup.category}</p>
            <pre>{popup.code}</pre>
            <button
              className="copy-button"
              onClick={() => handleCopy(popup.code)}
            >
              Copy Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnippetList;
