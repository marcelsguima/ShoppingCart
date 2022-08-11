const fetchItem = async (query) => {
  const url = `https://api.mercadolibre.com/items/${query}`;

  const api = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
    return api;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
