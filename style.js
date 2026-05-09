document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DARK MODE
  ========================= */

  function toggleMode() {
    document.body.classList.toggle("light");
  }

  window.toggleMode = toggleMode;

  /* =========================
     SCROLL
  ========================= */

  function scrollProducts() {
    document.getElementById("products").scrollIntoView({
      behavior: "smooth"
    });
  }

  window.scrollProducts = scrollProducts;

  /* =========================
     CART
  ========================= */

  let cart = [];

  function addToCart(card) {

    const name = card.querySelector("h5").innerText;

    const price = card
      .querySelector(".price")
      .innerText
      .replace("$", "");

    const image = card.querySelector("img").src;

    cart.push({
      name,
      price,
      image
    });

    updateCart();
  }

  const addButtons = document.querySelectorAll(".add-btn");

  addButtons.forEach(button => {

    button.addEventListener("click", () => {

      const card = button.closest(".product-card");

      addToCart(card);

    });

  });

  function updateCart() {

    const cartItems =
      document.getElementById("cart-items");

    const cartCount =
      document.getElementById("cart-count");

    const cartTotal =
      document.getElementById("cart-total");

    if (!cartItems || !cartCount || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

      total += Number(item.price);

      cartItems.innerHTML += `

        <div class="cart-item">

          <img src="${item.image}" alt="${item.name}">

          <div>

            <h5>${item.name}</h5>

            <p>$${item.price}</p>

            <button 
              class="remove-btn"
              onclick="removeItem(${index})"
            >
              Remove
            </button>

          </div>

        </div>

      `;

    });

    cartCount.innerText = cart.length;

    cartTotal.innerText = total.toFixed(2);

  }

  function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

  }

  window.removeItem = removeItem;

  /* =========================
     CART SIDEBAR
  ========================= */

  function toggleCart() {

    document
      .getElementById("cartSidebar")
      .classList.toggle("active");

  }

  window.toggleCart = toggleCart;

  /* =========================
     CHECKOUT
  ========================= */

  function openCheckout() {

    document
      .getElementById("checkoutModal")
      .classList.add("active");

  }

  function closeCheckout() {

    document
      .getElementById("checkoutModal")
      .classList.remove("active");

  }

  function completePayment() {

    alert("Payment Successful!");

    cart = [];

    updateCart();

    closeCheckout();

    toggleCart();

  }

  window.openCheckout = openCheckout;
  window.closeCheckout = closeCheckout;
  window.completePayment = completePayment;

  /* =========================
     FLOATING SHOE
  ========================= */

  const shoe = document.getElementById("shoe");

  if (shoe) {

    let pos = 0;
    let direction = 1;

    function floatShoe() {

      pos += direction * 0.3;

      if (pos > 20) direction = -1;

      if (pos < -20) direction = 1;

      shoe.style.transform =
        `translateY(${pos}px) rotate(${pos * 0.3}deg)`;

      requestAnimationFrame(floatShoe);

    }

    floatShoe();

  }

  /* =========================
     CATEGORY PAGE
  ========================= */

  function openCategory(type) {

    const page =
      document.getElementById("categoryPage");

    const container =
      document.getElementById("categoryProducts");

    const title =
      document.getElementById("categoryTitle");

    if (!page || !container || !title) return;

    container.innerHTML = "";

    const products =
      document.querySelectorAll(".product-card");

    products.forEach(card => {

      const cat = card.getAttribute("data-category");

      if (type === "all" || cat === type) {

        const clone = card.cloneNode(true);

        const btn = clone.querySelector(".add-btn");

        if (btn) {

          btn.addEventListener("click", () => {
            addToCart(clone);
          });

        }

        container.appendChild(clone);

      }

    });

    title.innerText = type.toUpperCase();

    page.style.display = "flex";

  }

  function closeCategory() {

    document
      .getElementById("categoryPage")
      .style.display = "none";

  }

  window.openCategory = openCategory;
  window.closeCategory = closeCategory;

});