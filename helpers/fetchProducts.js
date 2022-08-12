const fetchProducts = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  try {
    if (!query) throw new Error('You must provide an url'); 
    const api = await fetch(url);
    const data = await api.json();
    return data;
    // console.log(data.value);
} catch (error) { return error; } 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
