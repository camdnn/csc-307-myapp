// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form.tsx";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index: number): void {
    const updated = characters.filter((_, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form />
    </div>
  );
}
export default MyApp;
