import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/themes/prism.css";
import "./SnippetList.css";

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Mitang321/snippets/contents",
          {
            headers: {
              Authorization: `process.env.REACT_APP_GITHUB_TOKEN;`,
            },
          }
        );
        const files = await response.json();

        if (!response.ok) {
          throw new Error(`Failed to fetch file list: ${files.message}`);
        }

        const filePromises = files.map(async (file) => {
          if (file.type === "file") {
            const fileResponse = await fetch(file.download_url);
            const fileContent = await fileResponse.text();
            return {
              title: file.name,
              code: fileContent,
              language: file.name.split(".").pop(),
            };
          }
          return null;
        });

        const loadedSnippets = (await Promise.all(filePromises)).filter(
          (snippet) => snippet !== null
        );
        setSnippets(loadedSnippets);
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    if (popup) {
      Prism.highlightAll();
    }
  }, [popup]);

  const handleCopy = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(code)
        .then(() => alert("Code copied to clipboard"))
        .catch((err) => alert("Failed to copy code. Please try again."));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Code copied to clipboard");
      } catch (err) {
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
        <div key={snippet.title} className="snippet-item">
          <div className="snippet-title" onClick={() => openPopup(snippet)}>
            <h3>{snippet.title}</h3>
          </div>
        </div>
      ))}
      {popup && (
        <div className="popup-overlay show" onClick={closePopup}>
          <div
            className="popup-content show"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close" onClick={closePopup}>
              ×
            </button>
            <h3>{popup.title}</h3>
            <pre className={`language-${popup.language}`}>
              <code>{popup.code}</code>
            </pre>
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
