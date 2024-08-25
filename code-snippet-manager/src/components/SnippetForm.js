import React, { useState, useEffect } from "react";
import "./SnippetForm.css";

const SnippetForm = ({ onSubmit, currentSnippet }) => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (currentSnippet) {
      setTitle(currentSnippet.title);
      setCode(currentSnippet.code);
      setCategory(currentSnippet.category);
    }
  }, [currentSnippet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, code, category });
    setTitle("");
    setCode("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="snippet-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., JavaScript, Python"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="code">Code</label>
        <textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows="10"
          required
        />
      </div>
      <button type="submit" className="submit-button">
        {currentSnippet ? "Update Snippet" : "Add Snippet"}
      </button>
    </form>
  );
};

export default SnippetForm;
