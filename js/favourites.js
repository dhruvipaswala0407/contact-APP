let favContacts = JSON.parse(localStorage.getItem("favouriteDetails")) || [];
const $ = (id) => document.getElementById(id);
const favContainer = $("favourites-cards-grid");

// Empty State
const renderEmptyState = (isSearch = false) => `
  <section class="empty-state fade-in" aria-label="Favourites Directory Preview" >
    <div class="empty-icon-circle" style="background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.35); color: #f59e0b; box-shadow: 0 0 25px rgba(245, 158, 11, 0.25);">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    </div>
    <h2 class="empty-title">
      ${isSearch ? "No Matching Favourite Contacts" : "No Favourite Contacts Yet"}
    </h2>
    <p class="empty-text">
      ${
        isSearch
          ? "No starred contact matched your current search term. Try another name, company, or number."
          : "Star any partner or corporate contact in your directory to keep them pinned here for priority one-click access."
      }
    </p>
    ${
      isSearch
        ? `<button type="button" id="clear-fav-search-btn" class="btn btn-primary">Clear Search</button>`
        : `<a href="contacts.html" class="btn btn-primary">Browse Contacts Directory &rarr;</a>`
    }
  </section>
`;
// Card Print
const renderCards = (allContacts) => {
  $("section-badge").innerText = `${allContacts.length} VIP contacts`;

  if (allContacts.length === 0) {
    const isSearch = favContacts.length > 0;
    favContainer.innerHTML = renderEmptyState(isSearch);

    const clearBtn = $("clear-fav-search-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        $("search-input").value = "";
        renderCards(favContacts);
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

  favContainer.innerHTML = htmlContent;
};

renderCards(favContacts);

// Search Function
const inputCard = $("search-input");
if (inputCard) {
  inputCard.addEventListener("input", (e) => {
    const keyWords = e.target.value.trim().toLowerCase();
    const results = favContacts.filter((contact) => {
      return contact.companyName.toLowerCase().includes(keyWords);
    });
    renderCards(results);
  });
}
//favourite function
let favId = null;
favContainer.addEventListener("click", (e) => {
  const favBtn = e.target.closest(".fav-star-btn");
  if (!favBtn) return;
  const card = favBtn.closest(".contact-card");
  if (!card) return;
  favId = card.dataset.id;

  favContacts = favContacts.filter((contact) => { return contact.id != favId; });
  localStorage.setItem("favouriteDetails", JSON.stringify(favContacts));

  let allContacts = JSON.parse(localStorage.getItem("contactDetails")) || [];
  let mainIndex = allContacts.findIndex((contact) => { return contact.id == favId; });
  if (mainIndex !== -1) {
    allContacts[mainIndex].favourite = false;
    localStorage.setItem("contactDetails", JSON.stringify(allContacts));
  }

  renderCards(favContacts);
});
