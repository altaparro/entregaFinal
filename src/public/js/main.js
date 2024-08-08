// Asume que este código está en el archivo 'main.js'

// Obtener el formulario y el botón
const formAddProduct = document.getElementById('formAddProduct');
const btnEnviar = document.getElementById('btnEnviar');
const addToCartButtons = document.querySelectorAll('.btn-secon');

// Agregar un event listener al botón "AGREGAR AL CARRITO"
addToCartButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    const productId = event.target.dataset.productId;

    try {
      // Enviar una solicitud al servidor para agregar el producto al carrito
      const response = await fetch(`/api/carts/add/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Mostrar un mensaje de éxito o actualizar la vista del carrito
        alert('Producto agregado al carrito');
      } else {
        // Manejar errores
        console.error('Error al agregar el producto al carrito');
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  });
});

// Agregar un event listener al botón "AGREGAR PRODUCTO"
btnEnviar.addEventListener('click', async () => {
  try {
    // Obtener los valores de los campos del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const img = document.getElementById('img').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const status = document.getElementById('status').value;

    // Crear un objeto con los datos del producto
    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      thumbnail: img,
      code,
      stock: parseInt(stock),
      category,
      status: status === 'true'
    };

    // Enviar la solicitud al servidor para crear el nuevo producto
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });

    if (response.ok) {
      // Limpiar el formulario
      formAddProduct.reset();
      // Recargar la lista de productos
      const productsResponse = await fetch('/api/products');
      const products = await productsResponse.json();
      renderProducts(products);
    } else {
      console.error('Error al crear el producto');
    }
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
});

// Función para renderizar la lista de productos
function renderProducts(products) {
  const containerProducts = document.getElementById('containerProducts');
  containerProducts.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-4', 'mb-4');

    productCard.innerHTML = `
      <div class="card">
        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">Precio: $${product.price}</p>
          <a href="/products/${product._id}" class="btn btn-primary">Ver Detalle</a>
          <button class="btn btn-secondary btn-secon" data-product-id="${product._id}">Agregar al carrito</button>
        </div>
      </div>
    `;

    containerProducts.appendChild(productCard);
  });
}

// Cargar la lista de productos inicialmente
fetch('/api/products')
  .then(response => response.json())
  .then(renderProducts)
  .catch(error => console.error('Error al cargar los productos:', error));