import PropTypes from 'prop-types';

import classes from './Container.module.css';

Container.propTypes = {
  children: PropTypes.node,
};
function Container({ children }) {
  return <div className={classes.container}>{children}</div>;
}

export default Container;
