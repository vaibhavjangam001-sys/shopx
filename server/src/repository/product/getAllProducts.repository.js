import { Product } from "../../models/index.js";

const getAllProductsRepository = async () => {
    return await Product.find();
}

export default getAllProductsRepository;