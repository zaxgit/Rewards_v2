import Table from '../UI/Table';
import MonthlyTotals from './MonthlyTotals';
const calculatePoints = (transactions) => {
  const points = transactions
    .map((amount) => {
      if (amount > 50 && amount <= 100) {
        return amount - 50;
      } else if (amount > 100) {
        let pointsAmount = amount - 100;
        pointsAmount = pointsAmount * 2 + 50;
        return pointsAmount;
      } else {
        return 0;
      }
    })
    .reduce((acc, pointAmount) => {
      return acc + pointAmount;
    });
  return points;
};

const calculateTotalPoints = (orders) => {
  // Get an array of all order totals
  const orderTotals = orders.map((order) => {
    return order.total;
  });
  // Get point value for totals
  const totalPoints = calculatePoints(orderTotals);
  return totalPoints;
};

const getNumericMonths = (orders) => {
  // Change date format to numeric month
  const totalsByNumericMonths = orders
    .map((order) => {
      const month = new Date(order.date).getMonth() + 1;
      return { month, total: order.total };
    })
    //Sort totals by month to have an expected order
    .sort((a, b) => {
      return a.month - b.month;
    });

  return totalsByNumericMonths;
};

const getMonthsAsStrings = (totalsByNumericMonth) => {
  // Return a new array with no duplicates
  const months = totalsByNumericMonth
    .reduce((prevInit, current) => {
      if (!prevInit.includes(current.month)) {
        return prevInit.concat(current.month);
      }
      return prevInit;
    }, [])
    // Check numeric month value and return an array of string value months
    .map((month) => {
      switch (month) {
        case 1: {
          return 'Jan';
        }
        case 2: {
          return 'Feb';
        }
        case 3: {
          return 'Mar';
        }
        case 4: {
          return 'Apr';
        }
        case 5: {
          return 'May';
        }
        case 6: {
          return 'Jun';
        }
        case 7: {
          return 'Jul';
        }
        case 8: {
          return 'Aug';
        }
        case 9: {
          return 'Oct';
        }
        case 10: {
          return 'Sep';
        }
        case 11: {
          return 'Nov';
        }
        case 12: {
          return 'Dec';
        }
        default: {
          break;
        }
      }
      return null;
    });
  return months;
};

const PointDetails = (props) => {
  const { orders } = props;

  const totalPoints = calculateTotalPoints(orders);

  const totalsByNumericMonth = getNumericMonths(orders);

  const monthsAsStrings = getMonthsAsStrings(totalsByNumericMonth);

  return (
    <>
      <h3>POINTS</h3>
      <Table headers={['Total', ...monthsAsStrings]}>
        <tr>
          <td>{totalPoints}</td>
          <MonthlyTotals
            totalsByNumericMonth={totalsByNumericMonth}
            calculatePoints={calculatePoints}
          />
        </tr>
      </Table>
    </>
  );
};

export default PointDetails;
