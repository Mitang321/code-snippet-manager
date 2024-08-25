import React, { useState } from "react";
import "./SnippetList.css";

const SnippetList = ({ snippets, onEdit, onDelete }) => {
  const [activeSnippet, setActiveSnippet] = useState(null);

  const toggleSnippet = (id) => {
    setActiveSnippet(activeSnippet === id ? null : id);
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="snippet-list">
      {snippets.map((snippet) => (
        <div className="snippet-item" key={snippet.id}>
          <div
            className="snippet-title"
            onClick={() => toggleSnippet(snippet.id)}
          >
            <h3>{snippet.title}</h3>
            <p className="snippet-category">{snippet.category}</p>
          </div>
          {activeSnippet === snippet.id && (
            <div className="snippet-content">
              <pre>
                <code>{snippet.code}</code>
              </pre>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(snippet.code)}
              >
                Copy
              </button>
              <div className="snippet-actions">
                <button onClick={() => onEdit(snippet)}>Edit</button>
                <button onClick={() => onDelete(snippet.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SnippetList;
