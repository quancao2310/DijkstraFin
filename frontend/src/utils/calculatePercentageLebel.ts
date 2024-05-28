export function calculatePercentagesLabel(
  names: string[],
  amounts: number[]
): string[] {
  const totalAmount = amounts.reduce((sum, amount) => sum + amount, 0);
  const percentages = amounts.map((amount) => (amount / totalAmount) * 100);
  const result = names.map(
    (name, index) => `${name} (${percentages[index].toFixed(0)}%)`
  );
  return result;
}
