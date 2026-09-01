import { getAllUsersRepository } from '../../repositories/user/index.js';

const getAllUsersService = async (queryParams) => {
  const { users, totalUsers, currentPage, limit } =
    await getAllUsersRepository(queryParams);

  const totalPages = Math.ceil(totalUsers / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    users,
    pagination: {
      totalUsers,
      totalPages,
      currentPage,
      limit,
      hasNextPage,
      hasPreviousPage,
    },
  };
};

export default getAllUsersService;
