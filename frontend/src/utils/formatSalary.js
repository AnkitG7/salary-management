export default function formatSalary(salary, currency) {
  const numericSalary = Number(salary);

  const hasDecimals = !Number.isInteger(numericSalary);

  const formattedSalary = numericSalary.toLocaleString(undefined, {
    minimumFractionDigits: hasDecimals ? 2 : 0,

    maximumFractionDigits: 2,
  });

  return `${formattedSalary} ${currency}`;
}
