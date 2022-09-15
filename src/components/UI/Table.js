import PropTypes from 'prop-types';
import classes from './Table.module.css';

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string.isRequired),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function Table({ headers, children, className }) {
  const headerTags = headers.map((header, idx) => {
    return <th key={idx}>{header}</th>;
  });

  return (
    <table className={`${classes.table} ${className}`}>
      <thead>
        <tr>{headerTags}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default Table;
