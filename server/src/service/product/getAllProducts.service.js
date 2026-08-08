import { getAllProductsRepository } from "../../repositories/product/index.js";

const getAllProductsService = async () => {
    return await getAllProductsRepository();
}

export default getAllProductsService;