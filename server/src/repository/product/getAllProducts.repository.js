import { Product } from "../../models/index.js";

const getAllProductsRepository = async () => {
    const products =  await Product.find();
    return products;
}

export default getAllProductsRepository;