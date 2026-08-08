import {
  updateProductRepository,
  getProductRepository,
} from "../../repositories/product/index.js";

const updateProductService = async (productId,updateDetails) => {

    const product = await getProductRepository(productId);

    if(!product) {
        return null;
    }

    const updatedProduct = await updateProductRepository(productId,updateDetails);

    return updatedProduct;
};

export default updateProductService;
