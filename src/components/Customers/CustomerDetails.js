import PropTypes from 'prop-types';

import Orders from '../Orders/Orders';
import PointDetails from '../Orders/PointDetails';

CustomerDetails.propTypes = {
  orders: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

function CustomerDetails({ orders, id, isLoading, errorMessage }) {
  if (isLoading) {
    return <p>Customer orders loading!</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (orders.length <= 0) {
    return <p>No orders found!</p>;
  }

  if (orders.length > 0) {
    return (
      <>
        <Orders orders={orders} />
        <PointDetails orders={orders} customerId={id} />
      </>
    );
  }
}

export default CustomerDetails;
