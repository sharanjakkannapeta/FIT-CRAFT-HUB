// FIT CRAFT HUB - Main JavaScript

// Cart Management
const Cart = {
  items: [],

  init() {
    this.items = JSON.parse(localStorage.getItem('fitcraft_cart')) || [];
    this.updateCartCount();
  },

  save() {
    localStorage.setItem('fitcraft_cart', JSON.stringify(this.items));
    this.updateCartCount();
  },

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }
    
    this.save();
    showToast(`${product.name} added to cart!`);
  },

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  },

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.save();
    }
  },

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  },

  updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = this.getItemCount();
    cartCountElements.forEach(el => {
      el.textContent = count;
    });
  },

  clear() {
    this.items = [];
    this.save();
  }
};

// Toast Notification
function showToast(message) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.navbar-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
      }
    });
  }
}

// Product Filtering
function initProductFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productsContainer = document.getElementById('products-container');

  if (!filterButtons.length || !productsContainer) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter and render products
      renderProducts(category);
    });
  });
}

// Render Products
function renderProducts(category = 'all') {
  const container = document.getElementById('products-container');
  if (!container || typeof products === 'undefined') return;

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);

  container.innerHTML = filteredProducts.map(product => `
    <div class="product-card fade-in-up" data-product-id="${product.id}">
      <a href="product.html?id=${product.id}" class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
      </a>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="btn btn-primary btn-small add-to-cart-btn" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');

  // Add event listeners to new buttons
  initAddToCartButtons();
}

// Render Featured Products
function renderFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container || typeof products === 'undefined') return;

  const featuredProducts = products.filter(p => p.featured);

  container.innerHTML = featuredProducts.map(product => `
    <div class="product-card fade-in-up">
      <a href="product.html?id=${product.id}" class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <span class="product-badge">Featured</span>
      </a>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="btn btn-primary btn-small add-to-cart-btn" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');

  // Add event listeners
  initAddToCartButtons();
}

// Add to Cart Buttons
function initAddToCartButtons() {
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = parseInt(btn.dataset.productId);
      const product = products.find(p => p.id === productId);
      
      if (product) {
        Cart.addItem(product);
      }
    });
  });
}

// Product Detail Page
function initProductDetail() {
  const productDetails = document.getElementById('product-detail-container');
  if (!productDetails || typeof products === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (!product) {
    productDetails.innerHTML = `
      <div class="cart-empty">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <a href="shop.html" class="btn btn-primary">Browse Products</a>
      </div>
    `;
    return;
  }

  productDetails.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-gallery">
        <div class="product-main-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
      </div>
      <div class="product-details">
        <span class="product-category">${product.category}</span>
        <h1>${product.name}</h1>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p class="product-description">${product.description}</p>
        
        <div class="quantity-selector">
          <label>Quantity:</label>
          <div class="quantity-input">
            <button type="button" id="qty-decrease">-</button>
            <input type="number" id="quantity" value="1" min="1" max="10">
            <button type="button" id="qty-increase">+</button>
          </div>
        </div>
        
        <div class="product-actions">
          <button class="btn btn-primary" id="add-to-cart-detail">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
          <a href="cart.html" class="btn btn-secondary">View Cart</a>
        </div>
      </div>
    </div>
  `;

  // Quantity Controls
  const qtyInput = document.getElementById('quantity');
  const qtyDecrease = document.getElementById('qty-decrease');
  const qtyIncrease = document.getElementById('qty-increase');
  const addToCartBtn = document.getElementById('add-to-cart-detail');

  qtyDecrease.addEventListener('click', () => {
    const currentVal = parseInt(qtyInput.value);
    if (currentVal > 1) qtyInput.value = currentVal - 1;
  });

  qtyIncrease.addEventListener('click', () => {
    const currentVal = parseInt(qtyInput.value);
    if (currentVal < 10) qtyInput.value = currentVal + 1;
  });

  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(qtyInput.value);
    Cart.addItem(product, quantity);
  });
}

// Cart Page
function initCartPage() {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) return;

  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) return;

  if (Cart.items.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items yet.</p>
        <a href="shop.html" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    return;
  }

  const subtotal = Cart.getTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  cartContainer.innerHTML = `
    <div class="cart-content">
      <div class="cart-items">
        ${Cart.items.map(item => `
          <div class="cart-item" data-item-id="${item.id}">
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
              <span class="product-category">${item.category}</span>
              <h3>${item.name}</h3>
              <p class="product-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
              <div class="quantity-input">
                <button type="button" class="qty-decrease" data-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" max="10" data-id="${item.id}" class="cart-qty-input">
                <button type="button" class="qty-increase" data-id="${item.id}">+</button>
              </div>
              <button class="remove-btn" data-id="${item.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
        </div>
        ${shipping > 0 ? `
          <p style="font-size: 0.85rem; color: var(--foreground-muted); margin-top: 0.5rem;">
            Free shipping on orders over $100
          </p>
        ` : ''}
        <div class="summary-row total">
          <span>Total</span>
          <span>$${total.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary" onclick="handleCheckout()">
          Proceed to Checkout
        </button>
        <a href="shop.html" class="btn btn-secondary" style="margin-top: 0.75rem;">
          Continue Shopping
        </a>
      </div>
    </div>
  `;

  // Add event listeners for cart actions
  initCartActions();
}

function initCartActions() {
  // Quantity decrease
  document.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = Cart.items.find(i => i.id === id);
      if (item && item.quantity > 1) {
        Cart.updateQuantity(id, item.quantity - 1);
        renderCart();
      }
    });
  });

  // Quantity increase
  document.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = Cart.items.find(i => i.id === id);
      if (item && item.quantity < 10) {
        Cart.updateQuantity(id, item.quantity + 1);
        renderCart();
      }
    });
  });

  // Quantity input change
  document.querySelectorAll('.cart-qty-input').forEach(input => {
    input.addEventListener('change', () => {
      const id = parseInt(input.dataset.id);
      const quantity = Math.max(1, Math.min(10, parseInt(input.value) || 1));
      Cart.updateQuantity(id, quantity);
      renderCart();
    });
  });

  // Remove button
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      Cart.removeItem(id);
      showToast('Item removed from cart');
      renderCart();
    });
  });
}

function handleCheckout() {
  showToast('Checkout functionality coming soon!');
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    
    // Simulate form submission
    showToast(`Thanks ${name}! We'll get back to you soon.`);
    form.reset();
  });
}

// Set Active Nav Link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart
  Cart.init();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Set active nav link
  setActiveNavLink();
  
  // Page-specific initializations
  const page = window.location.pathname.split('/').pop() || 'index.html';
  
  switch (page) {
    case 'index.html':
    case '':
      renderFeaturedProducts();
      break;
    case 'shop.html':
      renderProducts();
      initProductFiltering();
      break;
    case 'product.html':
      initProductDetail();
      break;
    case 'cart.html':
      initCartPage();
      break;
    case 'contact.html':
      initContactForm();
      break;
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
