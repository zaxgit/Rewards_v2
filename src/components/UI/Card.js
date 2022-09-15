import PropTypes from 'prop-types';
import classes from './Card.module.css';

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

function Card({ children, className }) {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
}

export default Card;
