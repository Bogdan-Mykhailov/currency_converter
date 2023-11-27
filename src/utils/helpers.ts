export const convertToNumber = (value: string) => {
  const floatValue = parseFloat(value);
  const roundedValue = Math.round(floatValue * 10) / 10;
  return roundedValue % 1 === 0
    ? roundedValue.toFixed(0)
    : roundedValue.toFixed(1);
}
