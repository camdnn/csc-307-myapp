// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form.tsx";

type Person = {
  name: string;
  job: string;
};

function MyApp() {
  const [characters, setCharacters] = useState<Person[]>([]);

  function removeOneCharacter(index: number): void {
    const updated = characters.filter((_, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person: Person): void {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
