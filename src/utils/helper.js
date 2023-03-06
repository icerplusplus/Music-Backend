export const pagination = (limit = 10, page = 1, list = []) => {
  let arrFilter = [],
    i = 0,
    offset = (page - 1) * limit;

  while (arrFilter.length < limit) {
    if (i >= offset) {
      arrFilter.push(list[i]);
    }
    i++;
  }
  return {
    limit,
    page,
    data: arrFilter,
  };
};
