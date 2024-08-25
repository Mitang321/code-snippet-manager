import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

const SnippetList = ({ snippets, onEdit, onDelete }) => {
  return (
    <ListGroup>
      {snippets.map((snippet) => (
        <ListGroupItem
          key={snippet.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <h5>{snippet.title}</h5>
            <pre>{snippet.code}</pre>
          </div>
          <div>
            <Button
              color="warning"
              onClick={() => onEdit(snippet)}
              className="me-2"
            >
              Edit
            </Button>
            <Button color="danger" onClick={() => onDelete(snippet.id)}>
              Delete
            </Button>
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default SnippetList;
