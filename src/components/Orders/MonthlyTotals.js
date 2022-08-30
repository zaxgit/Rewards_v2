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

const MonthlyTotals = (props) => {
  const { calculatePoints, totalsByNumericMonth } = props;
  const groupedTotals = groupTotalsByMonth(totalsByNumericMonth, 'month');

  const monthlyTotals = groupedTotals.map((pointTotal, idx) => {
    return <td key={idx}>{calculatePoints(pointTotal)}</td>;
  });
  return <>{monthlyTotals}</>;
};

export default MonthlyTotals;
