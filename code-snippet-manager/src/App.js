import React, { useState } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import "./App.css";

const App = () => {
  const [snippets, setSnippets] = useState([]);
  const [editingSnippet, setEditingSnippet] = useState(null);

  const addSnippet = (snippet) => {
    setSnippets([...snippets, { ...snippet, id: Date.now() }]);
  };

  const editSnippet = (updatedSnippet) => {
    setSnippets(
      snippets.map((snippet) =>
        snippet.id === updatedSnippet.id ? updatedSnippet : snippet
      )
    );
    setEditingSnippet(null);
  };

  const deleteSnippet = (id) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Code Snippet Manager</h1>
        <p>Manage and organize your code snippets with ease.</p>
      </header>
      <div className="form-section">
        <SnippetForm
          addSnippet={addSnippet}
          editSnippet={editSnippet}
          currentSnippet={editingSnippet}
        />
      </div>
      <div className="list-section">
        <SnippetList
          snippets={snippets}
          onEdit={setEditingSnippet}
          onDelete={deleteSnippet}
        />
      </div>
    </div>
  );
};

export default App;
