const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const contactList = document.getElementById('contact-list');
const contactId = document.getElementById('contact-id');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function renderContacts() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="contact-info">
        <strong>${contact.name}</strong><br/>
        ${contact.email}<br/>
        ${contact.phone}
      </div>
      <div class="actions">
        <button class="edit" onclick="editContact(${index})">Edit</button>
        <button class="delete" onclick="deleteContact(${index})">Delete</button>
      </div>
    `;
    contactList.appendChild(li);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const id = contactId.value;

  if (id === '') {
    contacts.push({ name, email, phone });
  } else {
    contacts[id] = { name, email, phone };
    contactId.value = '';
    form.querySelector('button').textContent = 'Add Contact';
  }

  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
  form.reset();
});

function editContact(index) {
  const contact = contacts[index];
  nameInput.value = contact.name;
  emailInput.value = contact.email;
  phoneInput.value = contact.phone;
  contactId.value = index;
  form.querySelector('button').textContent = 'Update Contact';
}

function deleteContact(index) {
  if (confirm('Are you sure you want to delete this contact?')) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
  }
}

// Initial render
renderContacts();
