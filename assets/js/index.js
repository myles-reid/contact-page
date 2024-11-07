'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function selectAll(selector, scope = document) {
  return scope.querySelectorAll(selector);
}

function listen(event, element, callback) {
  return element.addEventListener(event, callback);
}

function create(element, scope = document) {
  return scope.createElement(element);
}

function addChild(element, child) {
  return element.appendChild(child);
}

function addFirstChild(element, child) {
  return element.insertBefore(child, element.firstChild);
}

function addClass(element, text) {
  return element.classList.add(text);
}

function removeClass(element, text) {
  return element.classList.remove(text);
}

function toggleClass(element, text) {
  return element.classList.toggle(text);
}

const nameInput = select('#name');
const emailInput = select('#email');
const cityInput = select('#city');
const contactWrapper = select('.contacts');
const nameOutput = select('.name-info');
const emailOutput = select('.email-info');
const cityOutput = select('.city-info');
const submitBtn = select('.submit');
const counter = select('.contact-count');

class Contact {
  #name;
  #email;
  #city;

  constructor(name, email, city) {
    if (!Contact.validateNoun(name)) {
      addClass(nameInput, 'error');
      nameInput.setAttribute('title', 'Please enter a valid name');
    } else {
      this.name = name;
    }

    if (!Contact.validateEmail(email)) {
      addClass(emailInput, 'error');
      emailInput.setAttribute('title', 'Please enter a valid email');
    } else {
      this.email = email;
    }

    if (!Contact.validateNoun(city)) {
      addClass(cityInput, 'error');
      cityInput.setAttribute('title', 'Please enter a valid City');
    } else {
      this.city = city;
    }
  }

  static validateNoun(name) {
    const pattern = /^[A-Za-z\s'-]{2,50}$/;
    return pattern.test(name.trim());
  }

  static validateEmail(email) {
    const pattern = /^[\w.-]+@[a-zA-Z0-9\d.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email.trim());
  }



  set name(name) {
    if (Contact.validateNoun(name)) {
      this.#name = name.trim();
    } 
  }

  set email(email) {
    if (Contact.validateEmail(email)) {
      this.#email = email.trim();
    } 
  }

  set city(city) {
    if (Contact.validateNoun(city)) {
      this.#city = city.trim();
    }
  }

  get name() { return this.#name; }
  get email() { return this.#email; }
  get city() { return this.#city; }
}

const { log } = console;
let isFirstSubmit = true;
const contacts = [];

function newContact(name, email, city) {
  const contact = new Contact(name, email, city);

  if (contact.name !== undefined && 
      contact.email !== undefined && 
      contact.city !== undefined) {
        contacts.push(contact)
      }
}

function createContactBox() {
contactWrapper.innerHTML = '';

for (let contact of contacts) {
  const div = create('div');
  const name = create('p');
  const email = create('p');
  const city = create('p');
  const nameSpan = create('SPAN');
  const emailSpan = create('SPAN');
  const citySpan = create('SPAN');
   
  addFirstChild(contactWrapper, div);

  name.innerText = 'Name: ';
  email.innerText = 'Email: ';
  city.innerText = 'City: ';
  nameSpan.innerText = `${contact.name}`;
  emailSpan.innerText = `${contact.email}`;
  citySpan.innerText = `${contact.city}`;

  addChild(name, nameSpan);
  addChild(email, emailSpan);
  addChild(city, citySpan);
  addChild(div, name);
  addChild(div, email);
  addChild(div, city);
  
  addClass(div, 'contact-tile');
  addClass(nameSpan, 'info');
  addClass(emailSpan, 'info');
  addClass(citySpan, 'info');

  div.onclick = function() {
    contacts.splice(contacts[contact], 1);
    createContactBox();
  };
}
 
  counter.innerText = contacts.length;
}


function clearInputs() {
  if (Contact.validateEmail(emailInput.value)) removeClass(emailInput, 'error');
  if (Contact.validateNoun(nameInput.value)) removeClass(nameInput, 'error');
  if (Contact.validateNoun(cityInput.value)) removeClass(cityInput, 'error');

  let nameHasError = nameInput.classList.contains('error');
  let emailHasError = emailInput.classList.contains('error');
  let cityHasError = cityInput.classList.contains('error');
  if (!nameHasError && !emailHasError && !cityHasError && !isFirstSubmit
      && (nameInput.value || emailInput.value || cityInput.value)) 
      {
      nameInput.value = '';
      emailInput.value = '';
      cityInput.value = '';
    }

}

listen('click', submitBtn, () => {
  let name = nameInput.value;
  let email = emailInput.value;
  let city = cityInput.value;
  newContact(name, email, city);
  if (isFirstSubmit) {
    isFirstSubmit = false; 
  } 
  if (contacts.length >= 1) {
    createContactBox()
    clearInputs();
    submitBtn.disabled = true;
  }
});

function checkInputs() {
  let name = nameInput.value;
  let email = emailInput.value;
  let city = cityInput.value;
  submitBtn.disabled = !(name && email && city);
}


listen ('input', nameInput, () => { checkInputs() });
listen ('input', emailInput, () => { checkInputs() });
listen ('input', cityInput, () => { checkInputs() });


