import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const SnippetForm = ({ addSnippet, editSnippet, currentSnippet }) => {
  const [title, setTitle] = useState(
    currentSnippet ? currentSnippet.title : ""
  );
  const [code, setCode] = useState(currentSnippet ? currentSnippet.code : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentSnippet) {
      editSnippet({ ...currentSnippet, title, code });
    } else {
      addSnippet({ title, code });
    }
    setTitle("");
    setCode("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <FormGroup>
        <Label for="title">Snippet Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter snippet title"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="code">Code</Label>
        <Input
          type="textarea"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here"
          required
        />
      </FormGroup>
      <Button color="primary" type="submit">
        {currentSnippet ? "Update Snippet" : "Add Snippet"}
      </Button>
    </Form>
  );
};

export default SnippetForm;
