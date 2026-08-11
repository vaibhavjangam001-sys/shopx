import { Product } from '../../models/index.js';
import { ApiFeatures } from '../../utils/index.js';

const getAllProductsRepository = async (queryParams) => {
  const query = Product.find();

  const features = new ApiFeatures(query, queryParams);

  features.search().filters().sort();

  return await features.query;
};

export default getAllProductsRepository;
