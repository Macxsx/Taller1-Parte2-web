//1
let cart = [];

//const cards = document.querySelectorAll('.card');
const cartItems = document.getElementById('cart-items');
const btnEmpty = document.getElementById('btn-empty');
const buttons = document.querySelectorAll('.btn-add');

//const cartIcon = document.querySelector(".cart-icon");
const cartDropdown = document.querySelector(".cart-dropdown");
const cartContainer = document.querySelector(".cart-container");

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        addToCart(card);
    });
});

function addToCart(card) {
    const image = card.querySelector('img').src;
    const name = card.querySelector('h3').textContent;
    const productPrice = card.querySelector('.card-price').textContent;
    const price = parseFloat(productPrice.replace('$', ''));
    const product = { 
        name: name,
        price: price,
        image: image,
        quantity: 1,
    };
    addProduct(product);
}

function addProduct(product) {
  let existing =false;
  cart.forEach((item) => {    
    if (item.name === product.name) {
      item.quantity++;
      existing = true;
    }
  });
    if (!existing) {
        cart.push(product);
    }
  renderCart();
}


function renderCart() {    
    cartItems.innerHTML = '';
    cart.forEach((item) => {
        const carritow = document.createElement('tr');
        carritow.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
        `;
        cartItems.appendChild(carritow);
    });

    console.log(cart);
}

btnEmpty.addEventListener('click', () => {
    cart = [];
    renderCart();
    cartDropdown.style.display = "none";
});

cartContainer.addEventListener("mouseenter", () => {
    if (cart.length > 0) {
        cartDropdown.style.display = "block";
    }
});

cartContainer.addEventListener("mouseleave", () => {
    cartDropdown.style.display = "none";
});


//2
const formBook = document.getElementById("form-book");
const cardsContainer = document.querySelector(".cards-container"); 

formBook.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const type = document.getElementById("type").value;
    const mood = document.getElementById("mood").value;
    const pairing = document.getElementById("pairing").value;
    const image = document.getElementById("image").value;
    const price = parseFloat(document.getElementById("price").value);

    //(b) si el precio es menor a 1000, no se agrega y se muestra alerta
    if (price < 1000) {
        alert("The price must be at least 1.000");
        return;
    }

   //Se crea la card nueva 
    const newCard = document.createElement("article");
    newCard.classList.add("card");

    newCard.innerHTML = `
    <img src="${image}" alt="${name}">
    <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <ul class="card-attributes">
            <li><strong>Author:</strong> ${author}</li>
            <li><strong>Type:</strong> ${type}</li>
            <li><strong>Mood:</strong> ${mood}</li>
            <li><strong>Pairing:</strong> ${pairing}</li>
        </ul>
        <p class="card-price">$${price}</p>
        <button class="btn-add">Add to My Library</button>
    </div>
`;

    cardsContainer.appendChild(newCard);

    const newButton = newCard.querySelector(".btn-add");
    newButton.addEventListener("click", () => {
        addToCart(newCard);
    });

    //(a) formatear el form pa que se vacie después de enviar
    formBook.reset();
});
