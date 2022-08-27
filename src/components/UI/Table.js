import classes from './Table.module.css';
const Table = (props) => {
  const { headers } = props;

  const headerTags = headers.map((header, idx) => {
    return <th key={idx}>{header}</th>;
  });

  return (
    <table className={`${classes.table} ${props.className}`}>
      <thead>
        <tr>{headerTags}</tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};

export default Table;
