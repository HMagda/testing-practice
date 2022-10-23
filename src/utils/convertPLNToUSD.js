export const convertPLNToUSD = (PLN) => {
  if (typeof PLN === "string") {
    return NaN;
  }

  if (typeof PLN === "undefined") {
    return NaN;
  }

  if (!isNumeric(PLN) && typeof PLN !== "string") {
    return "Error";
  }

  if (PLN < 0) {
    return "$0.00";
  }

  const PLNtoUSD = PLN / 3.5;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, " ");

  function isNumeric(str) {
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }
};
