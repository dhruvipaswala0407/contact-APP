let favContacts = JSON.parse(localStorage.getItem("favouriteDetails")) || [];
const $ = (id) => document.getElementById(id);
const favContainer = $("favourite-contacts-list"); 
const contacts = JSON.parse(localStorage.getItem("contactDetails"))|| [];
$('total-contacts-count').innerHTML= contacts.length;
 // Card Print
const renderCards = (allContacts) => {
  $("home-section-badge").innerText = `${allContacts.length} VIP contacts`;
$("stat-card").innerText = `${allContacts.length}`

let htmlContent = "";

  allContacts.slice(0,3).forEach((contact) => {
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

    </article>
    `;
  });
  favContainer.innerHTML = htmlContent;
};

renderCards(favContacts);