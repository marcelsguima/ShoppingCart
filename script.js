const cart = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const cartSaved = document.querySelector('.cart__items');

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
saveCartItems(cartSaved.innerHTML);
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
  const btnCartAdd = createCustomElement('button', 'item__add', 'Adicionar ao cart!');
  btnCartAdd.addEventListener('click', () => {
        cartAdd(sku); 
            });
  section.appendChild(btnCartAdd);

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const carregando = () => {
  const text = document.createElement('p');
  text.className = 'loading';
  text.innerText = 'carregando...';
  document.body.appendChild(text);
};

const pararCarregamento = () => {
  const text = document.querySelector('.loading');
  text.remove();
};

const createList = async () => {
  carregando();
  const list = await fetchProducts('compudator');
  pararCarregamento();
  const listItem = document.getElementsByClassName('items');
  const listReturn = list.results;

  listReturn.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const search = createProductItemElement({ sku, name, image });
    listItem[0].appendChild(search);
  });
};

emptyCart.addEventListener('click', () => {
  while (cart.firstChild) {
    cart.removeChild(cart.firstChild);
    localStorage.clear();
  }
});

window.onload = async () => { 
  await createList();
  cartSaved.innerHTML = getSavedCartItems();
    };
