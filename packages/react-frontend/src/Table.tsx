// src/Table.jsx

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
  _id: string;
  name: string;
  job: string;
};

type TableBodyProps = {
  characterData: Character[];
  removeCharacter: (id: string) => void;
};

function TableBody(props: TableBodyProps) {
  const rows = props.characterData.map((row: Character, index: number) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeCharacter(row._id)}>Delete</button>
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
