import axiosInstance from "../axios"
import { PRODUCTS, PRODUCTBYBARCODE} from "./constant"


// const getAllProducts = async () => {
//     const res = await axiosInstance.get(PRODUCTS)
//     return res
// }
const getProductsByName = async (name) => {
    const response = await axiosInstance.get(`/products/name/${name}`);
    return response;
  };

const getProductById = async (id) => {
    const res = await axiosInstance.get(`${PRODUCTS}/${id}`)
    return res
}
const getProductByBarcode = async (barcode) => {
    const res = await axiosInstance.get(`/products/barcode/${barcode}`)
    return res
}

export {
    getProductsByName,getProductByBarcode,getProductById
};