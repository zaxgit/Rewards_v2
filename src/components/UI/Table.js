const Table = (props) => {
  const { headers } = props;

  const headerTags = headers.map((header, idx) => {
    return <th key={idx}>{header}</th>;
  });

  return (
    <table className={props.className}>
      <thead>
        <tr>{headerTags}</tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};

export default Table;
