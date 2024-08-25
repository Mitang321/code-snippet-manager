import React, { useState } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import "./App.css";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [currentSnippet, setCurrentSnippet] = useState(null);

  const addSnippet = (snippet) => {
    if (currentSnippet) {
      setSnippets(
        snippets.map((s) =>
          s.id === currentSnippet.id ? { ...snippet, id: currentSnippet.id } : s
        )
      );
      setCurrentSnippet(null);
    } else {
      setSnippets([...snippets, { ...snippet, id: Date.now() }]);
    }
  };

  const editSnippet = (snippet) => {
    setCurrentSnippet(snippet);
  };

  const deleteSnippet = (id) => {
    setSnippets(snippets.filter((s) => s.id !== id));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Code Snippet Manager</h1>
        <p>Organize your code snippets efficiently.</p>
      </header>
      <div className="form-section">
        <SnippetForm onSubmit={addSnippet} currentSnippet={currentSnippet} />
      </div>
      <div className="list-section">
        <SnippetList
          snippets={snippets}
          onEdit={editSnippet}
          onDelete={deleteSnippet}
        />
      </div>
    </div>
  );
}

export default App;
