//fetch url
let url = new URLSearchParams(window.location.search);
let conatct_id = Number(url.get("id"));
// console.log(conatct_id);
const $ = (id) => document.getElementById(id);
//fetch all recode
let contacts = JSON.parse(localStorage.getItem("contactDetails")) || [];
// console.log(contacts);

//fine index
let detailsIndex = contacts.findIndex((item) => {
    return item.id == conatct_id;
});
// console.log(detailsIndex);
const initials = contacts[detailsIndex].companyName
    ? contacts[detailsIndex].companyName
        .split(" ")
        .map((n) => n[0] + n[1])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "";
// console.log(initials);
const favourite = contacts[detailsIndex].favourite;
// console.log(favourite);

$('record-id-pill').innerHTML = `ID :- ${contacts[detailsIndex].id}`
$('details-avatar').innerText = initials;
$('details-name').innerHTML = contacts[detailsIndex].companyName;
$('details-manger-name').innerHTML = contacts[detailsIndex].managerName;
$('favTag').innerHTML = favourite ? `<span class="vip-pill" title="Favorited VIP Contact">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  Favorite Partner
                </span>`: "";
$('action-button').innerHTML = `<a href="tel:- +91 ${contacts[detailsIndex].phoneNumber}" class="btn btn-primary" title="Initiate direct phone call">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Call Now</span>
              </a>
              <a href="mailto: ${contacts[detailsIndex].emailAddress}" class="btn btn-glass" title="Compose an email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>Send Email</span>
              </a>`
$('phoneNumber').innerHTML = `<span class="info-label">Mobile (Primary)</span>
                  <a href="tel:+91 ${contacts[detailsIndex].phoneNumber}" class="info-link" >+91 ${contacts[detailsIndex].phoneNumber}</a>`
$('emailBox').innerHTML = `<span class="info-label">Corporate Email</span>
                  <a href="mailto: ${contacts[detailsIndex].emailAddress}" class="info-link">${contacts[detailsIndex].emailAddress}</a>`                


