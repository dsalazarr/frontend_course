import axios from "axios";
import products from "./mocks/products.json";
import user from "./mocks/user.json";
import userError from "./mocks/userError.json";
import addMoney from "./mocks/addMoney.json";
import buyProduct from "./mocks/buyProduct.json";
import refundMoney from "./mocks/refundMoney.json";
import { UUID } from "crypto";

const simulateRequest = (mock: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mock });
    }, 1000);
  });
};

const simulateErrorRequest = (mock: any, status: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ data: mock, status: status });
    }, 1000);
  });
};

const get = (url: string) => axios.get(process.env.REACT_APP_BACKEND_URL + url);
const put = (url: string, data: object) =>
  axios.put(process.env.REACT_APP_BACKEND_URL + url, data);
const post = (url: string, data: object) =>
  axios.post(process.env.REACT_APP_BACKEND_URL + url, data);

export const apiAxios = {
  getProducts: () => get("/slots"),
  getUser: (username: string) => get("/clients?username=" + username),
  addMoney: (id: UUID, amount: number) => post("/clients/", { id, amount }),
  buyProduct: (userId: UUID, slotId: UUID) =>
    post("/slots/", { id: slotId, client_id: userId }),
  refundMoney: (userId: UUID) => put("/clients/", { id: userId }),
};

export const apiMocked = {
  getProducts: () => simulateRequest(products),
  getUser: (username: string): Promise<any> => {
    if (username === "daniel.salazar@abacum.io") {
      return simulateRequest(user);
    } else {
      return simulateErrorRequest(userError, 404);
    }
  },
  addMoney: (id: UUID, amount: number): Promise<any> =>
    simulateRequest(addMoney),
  buyProduct: (client_id: UUID, id: UUID): Promise<any> =>
    simulateRequest(buyProduct),
  refundMoney: (id: UUID): Promise<any> => simulateRequest(refundMoney),
};

export const api = apiAxios;
