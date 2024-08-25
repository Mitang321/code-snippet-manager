import React, { useState, useEffect } from "react";
import "./SnippetForm.css";

const SnippetForm = ({ onSubmit, currentSnippet, githubToken }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const snippet = { title, code, category };
    await onSubmit(snippet, githubToken);
    setTitle("");
    setCode("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="snippet-form">
      <h2 className="form-title">
        {currentSnippet ? "Update Snippet" : "Add Snippet"}
      </h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter snippet title"
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
          placeholder="Enter your code here"
        />
      </div>
      <button type="submit" className="submit-button">
        {currentSnippet ? "Update Snippet" : "Add Snippet"}
      </button>
    </form>
  );
};

export default SnippetForm;
