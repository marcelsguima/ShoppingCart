const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  const api = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
    return api;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
