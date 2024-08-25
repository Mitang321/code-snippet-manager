import React from "react";
import "./SnippetList.css";

const SnippetList = ({ snippets, onEdit, onDelete }) => {
  const handleCopy = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => alert("Code copied to clipboard"))
      .catch((err) => console.error("Failed to copy code:", err));
  };

  return (
    <div className="snippet-list">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="snippet-item">
          <div
            className="snippet-title"
            onClick={() =>
              document
                .getElementById(`content-${snippet.id}`)
                .classList.toggle("visible")
            }
          >
            <h3>{snippet.title}</h3>
          </div>
          <div id={`content-${snippet.id}`} className="snippet-content">
            <button
              className="copy-button"
              onClick={() => handleCopy(snippet.code)}
            >
              Copy Code
            </button>
            <p className="snippet-category">{snippet.category}</p>
            <pre>{snippet.code}</pre>
          </div>
          <div className="snippet-actions">
            <button onClick={() => onEdit(snippet)}>Edit</button>
            <button onClick={() => onDelete(snippet.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnippetList;
