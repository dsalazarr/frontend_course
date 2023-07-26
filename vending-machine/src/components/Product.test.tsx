import { fireEvent, render, screen } from "@testing-library/react";
import { ProductItem } from "../models/ProductItem";
import { Product } from "./Product";

const buyProduct = jest.fn((productItem: ProductItem) => {});

test("Clicking buy calls the callback", () => {
  const productId = "8cded8e1-d36a-4eda-907c-8f7d888596ee";
  const productName = "product";
  const productPrice = 5.5;
  render(
    <Product
      buyProduct={buyProduct}
      id={productId}
      name={productName}
      price={productPrice}
    />
  );
  const button = screen.getByText("Buy");
  fireEvent.click(button);
  expect(buyProduct).toHaveBeenCalledWith({
    id: productId,
    name: productName,
    price: productPrice,
  });
});
