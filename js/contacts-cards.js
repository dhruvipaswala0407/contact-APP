let contacts = JSON.parse(localStorage.getItem("contactDetails")) || [];
const $ = (id) => document.getElementById(id);
const container = $("contacts-container");

const renderEmptyState = (isSearch) => `
  <div style="text-align: center; width: 100%; grid-column: 1 / -1; padding: 3rem 1rem;">
    <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">
      ${isSearch ? "No matching contacts found" : "No business contacts yet"}
    </h3>
    <p style="color: var(--text-muted); margin-bottom: 1.25rem;">
      ${
        isSearch
          ? "We couldn't find any records matching your search."
          : "Your directory is currently empty. Add your first corporate record to get started."
      }
    </p>
    ${
      isSearch
        ? `<button type="button" id="clear-search-btn" class="btn btn-sm btn-glass">Clear Search</button>`
        : `<a href="add-contact.html" class="btn btn-sm btn-primary">+ Add First Contact</a>`
    }
  </div>
`;
const renderCards = (allContacts) => {
  $("contacts-badge").innerText = `${allContacts.length} contacts`;

  if (allContacts.length === 0) {
    const storageSearch = contacts.length > 0;
    container.innerHTML = renderEmptyState(storageSearch);

    const clearBtn = $("clear-search-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        $("search-input").value = "";
        renderCards(contacts);
      });
    }
    return;
  }
  let htmlContent = "";

  allContacts.forEach((contact) => {
    const initials = contact.companyName
      ? contact.companyName
          .split(" ")
          .map((n) => n[0] + n[1])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "";
    const isFav = contact.favourite === true;
    htmlContent += `
    <article class="glass-panel glass-panel-hover contact-card ${isFav ? 'contact-card-active':""} " data-id="${contact.id}">
    ${isFav ? '<div class="contact-active1"></div>' : ""}
        <div>
          <div class="card-header-row">
            <div class="company-avatar-badge" style="background: linear-gradient(135deg, hsl(230, 80%, 55%) 0%, hsl(275, 85%, 48%) 100%);">
              ${initials}
            </div>
            <div class="card-titles">
              <h3 class="card-company-name" title="${contact.companyName}">${contact.companyName}</h3>
              <div class="card-manager-name">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>${contact.managerName}</span>
              </div>
            </div>
           
            <label id="ToggleFavorite" class="fav-star-btn ${isFav ? 'ActiveChecked': ""}">
              <svg class="${isFav ? 'fav-checkbox-active' :""}" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </label>
          </div>

          <div class="card-contact-list">
            <div class="contact-item-row">
              <div class="item-left">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <a href="tel:${contact.phoneNumber}" class="item-link" title="Call ${contact.companyName}">${contact.phoneNumber}</a>
              </div>
            </div>

            <div class="contact-item-row">
              <div class="item-left">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <a href="mailto:${contact.emailAddress}" class="item-link" title="Email ${contact.companyName}">${contact.emailAddress}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer-row">
          <a href="contact-details.html?id=${contact.id}" class="btn btn-sm btn-glass btn-view-details" title="View Details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            View Details
          </a>
          <a href="edit-contact.html?id=${contact.id}" class="btn btn-sm btn-glass">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit
          </a>
          <a href="#delete-modal" class="btn btn-sm btn-danger">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete
          </a>
        </div>
    </article>
    `;
  });
  container.innerHTML = htmlContent;
};
renderCards(contacts);

//delete function
let deletId = null;
container.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".btn-danger");
  if (!deleteBtn) return;

  const card = deleteBtn.closest(".contact-card");
  if (!card) return;

  deletId = card.dataset.id;
  const targetContact = contacts.find(
    (item) => String(item.id) === String(deletId),
  );
  if (!targetContact) return;

  $("modal-user-name").innerText = targetContact.managerName;
  $("modal-company-name").innerText = targetContact.companyName;
});
const modal_ConfirmBtn = $("modal-confirm-btn");
const modal_Canclebtn = $("modal-cancel-btn");
// cancle
modal_Canclebtn.addEventListener("click", () => {
  deletId = null;
});
// confirm
modal_ConfirmBtn.addEventListener("click", () => {
  if (deletId === null) return;
  contacts = contacts.filter((item) => String(item.id) !== String(deletId));
  localStorage.setItem("contactDetails", JSON.stringify(contacts));
  deletId = null;
  renderCards(contacts);
});
//search function
const inputCard = $("search-input");
inputCard.addEventListener("input", (e) => {
  const keyWords = e.target.value.trim().toLowerCase();
  const results = contacts.filter((contact) => {
    return contact.companyName.toLowerCase().includes(keyWords);
  });
  renderCards(results);
});

//favourite function
let favId = null;
container.addEventListener("click", (e) => {
  const favBtn = e.target.closest(".fav-star-btn");
  if (!favBtn) return;
  const card = favBtn.closest(".contact-card");
  if (!card) return;
  favId = card.dataset.id;

  let favArray = JSON.parse(localStorage.getItem("favouriteDetails")) || [];
  let index = contacts.findIndex((contact) => {return contact.id == favId;});
  let favouriteindex = favArray.findIndex((contact) => {return contact.id == favId;});
  if (index === -1) return

  if (favouriteindex !== -1) {
    const favRemove = favArray.filter((contact) => {return contact.id != favId;});
    contacts[index].favourite = false;
    localStorage.setItem("favouriteDetails", JSON.stringify(favRemove));
  } else {
    contacts[index].favourite = true;
    favArray.push(contacts[index]);
    localStorage.setItem("favouriteDetails", JSON.stringify(favArray));
  }
  localStorage.setItem("contactDetails", JSON.stringify(contacts));
   renderCards(contacts);
});
