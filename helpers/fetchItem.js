const fetchItem = async (query) => {
  const url = `https://api.mercadolibre.com/items/${query}`; 
  
  try {
    if (!query) throw new Error('You must provide an url'); 
    const api = await fetch(url);
    const data = await api.json();
    return data;
    // console.log(data.value);
} catch (error) { return error; } 
};
//  console.log(fetchItem('MLB1615760527'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
