import PropTypes from 'prop-types';

import classes from './ErrorContainer.module.css';

import Card from './Card';

ErrorContainer.propTypes = {
  children: PropTypes.node,
};
function ErrorContainer({ children }) {
  return (
    <Card className={classes['error-container']}>
      <h3>UhOh!</h3>
      {children}
    </Card>
  );
}

export default ErrorContainer;
