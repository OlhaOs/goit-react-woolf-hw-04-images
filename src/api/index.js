import { instance } from './api';
const apiKey = '40165777-28b273f2689ebe229ca897fee';

export const getSearchImageApi = async (query, page) => {
  const data =
    await instance(`?key=${apiKey}&q=${query}&page=${page}&per_page=12
  `);

  return data;
};
