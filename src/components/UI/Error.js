import classes from './Error.module.css';
import Card from './Card';
const Error = (props) => {
  return (
    <Card className={classes.error}>
      <h3>UhOh!</h3>
      {props.children}
    </Card>
  );
};

export default Error;
