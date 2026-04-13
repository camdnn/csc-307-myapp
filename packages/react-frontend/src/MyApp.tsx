// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form.tsx";

type Person = {
  id: string;
  name: string;
  job: string;
};

function fetchUsers(): Promise<Response> {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

function MyApp() {
  const [characters, setCharacters] = useState<Person[]>([]);

  useEffect(() => {
    try {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json.users_list));
    } catch (e) {
      console.log(e);
    }
  }, []);

  function postUser(person: Person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function removeOneCharacter(id: string): void {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });

    promise
      .then((res) => {
        if (res.status == 204) {
          const updatedList = characters.filter((user) => user.id !== id);
          setCharacters(updatedList);
        }
      })
      .catch((e) => console.log(e));
  }

  function updateList(person: Person): void {
    postUser(person)
      .then((res) => (res.status == 201 ? res.json() : undefined))
      .then((json) => {
        setCharacters([...characters, json]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
