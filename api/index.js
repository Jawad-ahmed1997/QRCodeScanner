import axiosInstance from "../axios"

const getProductByBarcode = async (barcode) => {
    const res = await axiosInstance.get(`/pricechecker/GetItemDetails/${barcode}`)
    return res
}

export {
    getProductByBarcode
};