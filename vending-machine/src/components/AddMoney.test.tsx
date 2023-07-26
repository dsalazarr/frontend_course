import { fireEvent, render, screen } from "@testing-library/react";
import { AddMoney } from "./AddMoney";

const addMoneyMock = jest.fn((value: number) => {});

test("Clicking add-money calls the callback", () => {
  const amounts = [5.5];
  render(<AddMoney amounts={amounts} addMoneyCallback={addMoneyMock} />);
  const button = screen.getByText("5.5E");
  fireEvent.click(button);
  expect(addMoneyMock).toHaveBeenCalledWith(5.5);
});

test("AddMoney should render as many amounts as passed", () => {
  const amounts = [5.5, 10.5, 500];
  const expectedTextAmounts = ["5.5E", "10.5E", "500E"];

  render(<AddMoney amounts={amounts} addMoneyCallback={addMoneyMock} />);

  const addMoneyButtons = screen.getAllByTestId("add-money-button");
  const addMoneyTexts = addMoneyButtons.map((item) => item.textContent);

  expect(addMoneyButtons).toHaveLength(3);
  expect(addMoneyTexts).toEqual(expectedTextAmounts);
});
