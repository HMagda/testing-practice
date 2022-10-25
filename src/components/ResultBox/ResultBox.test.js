import ResultBox from "./ResultBox";
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {convertPLNToUSD} from "../../utils/convertPLNToUSD";
import {convertUSDToPLN} from "../../utils/convertUSDToPLN";


describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it("should render proper info about conversion PLN -> USD", () => {
    const testCases = [
      {amount: 100, from: "PLN", to: "USD"},
      {amount: 20, from: "PLN", to: "USD"},
      {amount: 200, from: "PLN", to: "USD"},
      {amount: 345, from: "PLN", to: "USD"},
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      const output = screen.getByTestId("output");

      let convertedAmount = convertPLNToUSD(testObj.amount);
      const expectedContent =
        testObj.from + " " + testObj.amount + ".00 = " + convertedAmount;

      expect(output).toHaveTextContent(expectedContent);

      cleanup();
    }
  });

  it("should render proper info about conversion USD -> PLN", () => {
    const testCases = [
      {amount: 100, from: "USD", to: "PLN"},
      {amount: 20, from: "USD", to: "PLN"},
      {amount: 200, from: "USD", to: "PLN"},
      {amount: 345, from: "USD", to: "PLN"},
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      const output = screen.getByTestId("output");

      let convertedAmount = convertUSDToPLN(testObj.amount);

      const expectedContent = "$" + testObj.amount + ".00 = " + convertedAmount;

      expect(output).toHaveTextContent(expectedContent);

      cleanup();
    }
  });

  it("should render proper info about conversion to the same type", () => {
    const testCases = [
      {amount: 100, from: "PLN", to: "PLN"},
      {amount: 20, from: "PLN", to: "PLN"},
      {amount: 200, from: "USD", to: "USD"},
      {amount: 345, from: "USD", to: "USD"},
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      const output = screen.getByTestId("output");
      let currencyPrefix = testObj.from === "PLN" ? "PLN " : "$";
      const expectedContent =
        currencyPrefix +
        testObj.amount +
        ".00 = " +
        currencyPrefix +
        testObj.amount +
        ".00";

      expect(output).toHaveTextContent(expectedContent);

      cleanup();
    }
  });

  it('should render "Wrong value..." when input is lower than zero', () => {
    const testCases = [
      {amount: -100, from: "USD", to: "PLN"},
      {amount: -20, from: "USD", to: "PLN"},
      {amount: -200, from: "USD", to: "PLN"},
      {amount: -345, from: "USD", to: "PLN"},
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );

      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent("Wrong Value...");

      cleanup();
    }
  });
});
