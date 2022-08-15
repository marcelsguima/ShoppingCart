const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const cartAdd = async (element) => {
  const itemAddBtn = await fetchItem(element);
  const { id: sku, title: name, price: salePrice } = itemAddBtn;
  const toCart = createCartItemElement({ sku, name, salePrice });
  const cartFull = document.getElementsByClassName('cart__items')[0];
  cartFull.appendChild(toCart);
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btnCartAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnCartAdd.addEventListener('click', () => { cartAdd(sku); });
  section.appendChild(btnCartAdd);

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const createList = async () => {
  const list = await fetchProducts('compudator');
  const listItem = document.getElementsByClassName('items');
  const listReturn = list.results;

  listReturn.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const search = createProductItemElement({ sku, name, image });
    listItem[0].appendChild(search);
  });
};

window.onload = () => { 
  createList();
};
