// ========================================
// TASK 5: Display Current Date and Time
// ========================================
function updateDateTime() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const formattedDate = now.toLocaleString('en-US', options);
  const dateTimeElement = document.getElementById('current-datetime');
  if (dateTimeElement) dateTimeElement.textContent = formattedDate;
}
if (document.getElementById('current-datetime')) {
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// ========================================
// TASK 4: Change Background Color
// ========================================
function changeBackgroundColor() {
  const colors = ['#f5f5f0', '#e8f4f8', '#fff5e6', '#f0e6ff', '#e6ffe6', '#ffe6f0', '#fff9e6'];
  const currentColor = document.body.style.backgroundColor || '#f5f5f0';
  let newColor;
  do { newColor = colors[Math.floor(Math.random() * colors.length)]; } while (newColor === currentColor);
  document.body.style.backgroundColor = newColor;
  document.body.style.transition = 'background-color 0.5s ease';
}
const bgButton = document.getElementById('bg-color-btn');
if (bgButton) bgButton.addEventListener('click', changeBackgroundColor);

// ========================================
// TASK 1: Form Validation
// ========================================
function validateReservationForm(event) {
  event.preventDefault();
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  let isValid = true;

  const name = document.getElementById('guest-name');
  const email = document.getElementById('guest-email');
  const phone = document.getElementById('guest-phone');
  const partySize = document.getElementById('party-size');
  const date = document.getElementById('reservation-date');
  const time = document.getElementById('reservation-time');

  if (!name.value.trim() || name.value.trim().length < 2) { showError(name, 'Name must be at least 2 characters long'); isValid = false; }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) { showError(email, 'Please enter a valid email address'); isValid = false; }
  const phoneDigits = phone.value.replace(/\D/g, '');
  if (!phoneDigits || phoneDigits.length < 10) { showError(phone, 'Phone number must be at least 10 digits'); isValid = false; }
  if (!partySize.value) { showError(partySize, 'Please select party size'); isValid = false; }
  if (!date.value) { showError(date, 'Please select a date'); isValid = false; }
  else {
    const selectedDate = new Date(date.value);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (selectedDate < today) { showError(date, 'Date cannot be in the past'); isValid = false; }
  }
  if (!time.value) { showError(time, 'Please select a time'); isValid = false; }

  if (isValid) {
    alert('Reservation submitted successfully! We will contact you shortly to confirm.');
    event.target.reset();
  }
}
function showError(inputElement, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = 'var(--error)';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '5px';
  errorDiv.textContent = shp message;
  inputElement.style.borderColor = 'var(--error)';
  inputElement.parentElement.appendChild(errorDiv);
  inputElement.addEventListener('input', function() {
    inputElement.style.borderColor = '';
    const error = inputElement.parentElement.querySelector('.error-message');
    if (error) error.remove();
  }, { once: true });
}
const reservationForm = document.querySelector('#booking-header + .about-content + .contact-form');
if (reservationForm) reservationForm.addEventListener('submit', validateReservationForm);

// ========================================
// TASK 2: Accordion for FAQs
// ========================================
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-content').style.maxHeight = null;
      });
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}
if (document.querySelector('.accordion-item')) initAccordion();

// ========================================
// TASK 3: Popup Subscription Form
// ========================================
function openPopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}
function closePopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }
}
function handleSubscription(event) {
  event.preventDefault();
  const emailInput = document.getElementById('popup-email');
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }
  alert('Thank you for subscribing! You will receive our newsletter soon.');
  emailInput.value = '';
  closePopup();
}
const subscribeBtn = document.getElementById('subscribe-btn');
const closeBtn = document.getElementById('close-popup');
const popupOverlay = document.getElementById('subscription-popup');
const popupForm = document.getElementById('subscription-form');
if (subscribeBtn) subscribeBtn.addEventListener('click', openPopup);
if (closeBtn) closeBtn.addEventListener('click', closePopup);
if (popupOverlay) popupOverlay.addEventListener('click', (e) => { if (e.target === popupOverlay) closePopup(); });
if (popupForm) popupForm.addEventListener('submit', handleSubscription);

// ========================================
// LIGHT/DARK MODE
// ========================================
function initMode() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }
  updateModeButton();
}
function toggleMode() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateModeButton();
}
function updateModeButton() {
  const btn = document.getElementById('mode-toggle');
  if (btn) btn.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
}
const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) modeToggle.addEventListener('click', toggleMode);
initMode();

// ========================================
// AUTHENTICATION
// ========================================
let currentUser = null;
function loadUser() {
  const user = localStorage.getItem('currentUser');
  if (user) {
    currentUser = JSON.parse(user);
    updateAuthUI();
  }
}
function updateAuthUI() {
  const authContainer = document.getElementById('auth-container');
  if (!authContainer) return;
  if (currentUser) {
    authContainer.innerHTML = `<span>Welcome, ${currentUser.name.split(' ')[0]}!</span> <button id="logout-btn" class="button-style">Logout</button>`;
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      currentUser = null;
      updateAuthUI();
      closeAuthModal();
    });
  } else {
    authContainer.innerHTML = `<button id="open-login" class="button-style">Login</button> <button id="open-signup" class="button-style">Sign Up</button>`;
    document.getElementById('open-login')?.addEventListener('click', () => openAuthModal('login'));
    document.getElementById('open-signup')?.addEventListener('click', () => openAuthModal('signup'));
  }
}
function openAuthModal(type) {
  const modal = document.getElementById('auth-modal');
  const form = document.getElementById('auth-form');
  const title = document.getElementById('auth-title');
  const nameGroup = document.getElementById('name-group');
  modal.style.display = 'flex';
  form.dataset.type = type;
  title.textContent = type === 'login' ? 'Login' : 'Sign Up';
  nameGroup.style.display = type === 'signup' ? 'block' : 'none';
  form.reset();
  document.querySelectorAll('.error-message').forEach(el => el.remove());
}
function closeAuthModal() {
  document.getElementById('auth-modal').style.display = 'none';
}
function handleAuthSubmit(e) {
  e.preventDefault();
  const type = e.target.dataset.type;
  const name = document.getElementById('auth-name').value.trim();
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  if (type === 'signup') {
    if (!name || name.length < 2) return showFieldError('auth-name', 'Name must be at least 2 characters');
    if (!validatePassword(password)) return showFieldError('auth-password', 'Password: 8+ chars, upper, lower, number, symbol');
  }
  if (!email.includes('@') || !email.includes('.')) return showFieldError('auth-email', 'Invalid email');
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (type === 'signup') {
    if (users.find(u => u.email === email)) return showFieldError('auth-email', 'Email already exists');
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signed up! Please log in.');
    openAuthModal('login');
  } else {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return showFieldError('auth-password', 'Invalid email or password');
    localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
    currentUser = user;
    updateAuthUI();
    closeAuthModal();
  }
}
function showFieldError(id, msg) {
  const el = document.getElementById(id);
  const div = document.createElement('div');
  div.className = 'error-message';
  div.textContent = msg;
  el.parentElement.appendChild(div);
  el.style.borderColor = 'var(--error)';
}
function validatePassword(pw) {
  return pw.length >= 8 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw);
}
document.getElementById('close-auth')?.addEventListener('click', closeAuthModal);
document.getElementById('auth-form')?.addEventListener('submit', handleAuthSubmit);
loadUser();

// ========================================
// MENU: Search, Ratings, API
// ========================================
function initMenuFeatures() {
  const search = document.getElementById('menu-search');
  if (search) {
    const saved = localStorage.getItem('menuSearch') || '';
    search.value = saved;
    filterMenu(saved);
    search.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      localStorage.setItem('menuSearch', query);
      filterMenu(query);
    });
  }
  function filterMenu(query) {
    document.querySelectorAll('.menu-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });
  }
  const savedRatings = JSON.parse(localStorage.getItem('menuRatings') || '{}');
  document.querySelectorAll('.rating').forEach(container => {
    const itemName = container.dataset.item;
    const rating = savedRatings[itemName] || 0;
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.textContent = '★';
      star.className = i <= rating ? 'filled' : '';
      star.onclick = () => {
        savedRatings[itemName] = i;
        localStorage.setItem('menuRatings', JSON.stringify(savedRatings));
        container.querySelectorAll('span').forEach((s, idx) => s.className = idx < i ? 'filled' : '');
      };
      container.appendChild(star);
    }
  });
  const specialContainer = document.getElementById('daily-special');
  if (specialContainer) {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(r => r.json())
      .then(data => {
        const m = data.meals[0];
        specialContainer.innerHTML = `<div class="menu-item"><div><h3>Daily Special: ${m.strMeal}</h3><p>${m.strInstructions.substring(0, 120)}...</p></div><span class="price">$${Math.floor(Math.random() * 15 + 10)}.99</span></div>`;
      });
  }
}
initMenuFeatures();

// ========================================
// FORM VALIDATION (Contact, Reserve, Subscribe)
// ========================================
document.querySelectorAll('form').forEach(form => {
  if (form.id !== 'auth-form' && form.id !== 'subscription-form') {
    form.addEventListener('submit', (e) => {
      let valid = true;
      form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
        const val = field.value.trim();
        if (!val) { showError(field, 'This field is required'); valid = false; }
        else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(val)) { showError(field, 'Invalid email'); valid = false; }
        else if (field.id.includes('phone') && !/^\d{10,}$/.test(val.replace(/\D/g, ''))) { showError(field, 'Phone must be 10+ digits'); valid = false; }
      });
      if (!valid) e.preventDefault();
      else alert('Submitted successfully!');
    });
  }
});
function showError(field, msg) {
  const existing = field.parentElement.querySelector('.error-message');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.className = 'error-message';
  div.textContent = msg;
  field.parentElement.appendChild(div);
  field.style.borderColor = 'var(--error)';
}
