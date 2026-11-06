const contact = JSON.parse(localStorage.getItem('contactDetails')) || [];
const container = document.getElementById('contacts-container');

let htmlContent = '';

contact.forEach((contact) => {
    const initials = contact.companyName 
        ? contact.companyName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : contact.companyName.substring(0, 2).toUpperCase();
    htmlContent += `
    <article class="glass-panel glass-panel-hover contact-card">
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
          <a href="edit-contact.html?id=${contact.id}" class="btn btn-sm btn-glass">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit
          </a>
          <a href="#delete-modal" class="btn btn-sm btn-danger" data-id="${contact.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete
          </a>
        </div>
    </article>
    `;
});

container.innerHTML = htmlContent;