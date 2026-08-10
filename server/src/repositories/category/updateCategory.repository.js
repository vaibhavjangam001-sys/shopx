import { Category } from '../../models/index.js';

const updateCategoryRepository = async (categoryId, updateDetails) => {
  return Category.findByIdAndUpdate(
    categoryId,
    {
      $set: updateDetails,
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
};

export default updateCategoryRepository;
