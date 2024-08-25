import React, { useState } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import { Container, Row, Col } from "reactstrap";
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
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Code Snippet Manager</h1>
          <SnippetForm
            addSnippet={addSnippet}
            editSnippet={editSnippet}
            currentSnippet={editingSnippet}
          />
          <SnippetList
            snippets={snippets}
            onEdit={setEditingSnippet}
            onDelete={deleteSnippet}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
