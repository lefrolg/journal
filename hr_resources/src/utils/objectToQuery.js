export const objectToQuery = (params) => {
  let list = [];
  if (params) {
    for (let name in params) {
      const value = params[name];
      list.push(name + "=" + value);
    }
  }
  return list.length > 0 ? "?" + list.join("&") : "";
};
