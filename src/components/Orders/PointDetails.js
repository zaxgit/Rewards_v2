import Table from '../UI/Table';

const calculatePoints = (transactions) => {
  return transactions
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

const groupByMonth = (totalsByNumericMonth, property) => {
  // Group totals by numeric month
  return (
    totalsByNumericMonth
      .reduce((acc, curr) => {
        let key = curr[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curr.total);
        return acc;
      }, [])
      // Filter out empty array
      .filter((total) => total)
  );
};

const getMonths = (orders) => {
  // Change date format to numeric month
  const totalsByNumericMonth = orders.map((order) => {
    const month = new Date(order.date).getMonth() + 1;
    return { month, total: order.total };
  });
  const sortedMonths = totalsByNumericMonth.sort((a, b) => {
    if (a.month < b.month) {
      return -1;
    } else if (a.month > b.month) {
      return 1;
    } else if (a.month === b.month) {
      return 0;
    }
  });
  return sortedMonths;
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
    });
  return months;
};

const PointDetails = (props) => {
  const { orders } = props;

  const totalPoints = calculateTotalPoints(orders);

  const totalsByNumericMonth = getMonths(orders);

  const monthsAsStrings = getMonthsAsStrings(totalsByNumericMonth);

  const groupedTotals = groupByMonth(totalsByNumericMonth, 'month');

  const monthlyTotals = groupedTotals.map((pointTotal, idx) => {
    return <td key={idx}>{calculatePoints(pointTotal)}</td>;
  });

  return (
    <Table headers={['TOTAL', ...monthsAsStrings]}>
      <tr>
        <td>{totalPoints}</td>
        {monthlyTotals}
      </tr>
    </Table>
  );
};

export default PointDetails;
