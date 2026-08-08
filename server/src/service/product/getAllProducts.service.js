import { getAllProductsRepository } from "../../repository/product/index.js";

const getAllProductsService = async () => {
    return await getAllProductsRepository();
}

export default getAllProductsService;