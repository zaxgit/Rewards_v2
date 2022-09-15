import PropTypes from 'prop-types';
// **find new way of figuring this out**
const groupTotalsByMonth = (totalsByNumericMonth, property) => {
  // Group totals by numeric month
  const totalsGroupedByMonth = totalsByNumericMonth
    .reduce((acc, curr) => {
      let key = curr[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr.total);
      return acc;
    }, [])
    // Filter out empty array
    .filter((total) => total);
  return totalsGroupedByMonth;
};

MonthlyTotals.propTypes = {
  calculatePoints: PropTypes.func.isRequired,
  totalsByNumericMonth: PropTypes.array.isRequired,
};

function MonthlyTotals({ calculatePoints, totalsByNumericMonth }) {
  const groupedTotals = groupTotalsByMonth(totalsByNumericMonth, 'month');

  const monthlyTotals = groupedTotals.map((pointTotal, idx) => {
    return <td key={idx}>{calculatePoints(pointTotal)}</td>;
  });
  return <>{monthlyTotals}</>;
}

export default MonthlyTotals;
