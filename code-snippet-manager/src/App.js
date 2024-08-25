import React, { useState } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import { saveSnippetToGitHub } from "./utils/github";
import "./App.css";

const App = () => {
  const [snippets, setSnippets] = useState([]);
  const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

  const handleAddSnippet = async (snippet) => {
    try {
      await saveSnippetToGitHub(snippet, githubToken);

      setSnippets([...snippets, snippet]);
    } catch (error) {
      console.error("Failed to save snippet:", error);
      alert("Failed to save snippet. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Code Snippet Manager</h1>
      <SnippetForm onSubmit={handleAddSnippet} githubToken={githubToken} />
      <SnippetList snippets={snippets} />
    </div>
  );
};

export default App;
