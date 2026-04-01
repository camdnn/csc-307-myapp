// src/Table.jsx
import React from "react";

// src/Table.jsx
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Remove Character</th>
      </tr>
    </thead>
  );
}

type Character = {
  name: string;
  job: string;
};

type TableBodyProps = {
  characterData: Character[];
  removeCharacter: (index: number) => void;
};

function TableBody(props: TableBodyProps) {
  const rows = props.characterData.map((row: Character, index: number) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}
function Table(props: TableBodyProps) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}
export default Table;
