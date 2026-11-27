//fetch url
let url = new URLSearchParams(window.location.search);
let conatct_id = Number(url.get("id"));
// console.log(conatct_id);
const $ = (id) => document.getElementById(id);
//fetch all recode
let contacts = JSON.parse(localStorage.getItem("contactDetails")) || [];
// console.log(contacts);

//fine index
let index = contacts.findIndex((item) => {
  return item.id == conatct_id;
});
//  console.log(index);

const captionName = document.querySelector("#edit-caption p strong");
captionName.textContent = contacts[index].companyName;

//select filde
const companyName = $("companyName");
const managerName = $("managerName");
const phoneNumber = $("phoneNumber");
const emailAddress = $("emailAddress");

//find value in index
companyName.value = contacts[index].companyName;
managerName.value = contacts[index].managerName;
phoneNumber.value = contacts[index].phoneNumber;
emailAddress.value = contacts[index].emailAddress;

//validation
const formValidation = (companyName, managerName, phoneNumber) => {
  if (companyName.length <= 2) {
    $("field-company").classList.add("has-error");
    $("companyName").focus();
    return 0;
  } else {
    $("field-company").classList.remove("has-error");
    // console.log('hello')
  }
  if (managerName.length <= 2) {
    $("field-manager").classList.add("has-error");
    $("managerName").focus();
    return 0;
  } else {
    $("field-manager").classList.remove("has-error");
  }
  if (phoneNumber.length !== 10) {
    $("field-phone").classList.add("has-error");
    $("phoneNumber").focus();
    return 0;
  } else {
    $("field-phone").classList.remove("has-error");
  }
};

//form select
const form = $("edit-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const validation = formValidation(companyName.value,managerName.value,phoneNumber.value)
  if (validation == 0) {
    return;
  }

  const data_Obj = {
    id:conatct_id,
    companyName:companyName.value,
    managerName:managerName.value,
    phoneNumber:phoneNumber.value,
    emailAddress:emailAddress.value
}

   contacts[index] = data_Obj;
  localStorage.setItem("contactDetails", JSON.stringify(contacts));
  //page change
window.location.href = 'contacts.html'
});
