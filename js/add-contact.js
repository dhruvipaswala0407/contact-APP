const $ = (id) => document.getElementById(id);
const formValidation = (companyName,managerName,phoneNumber)=> {
    if (companyName.length <= 2) {
        $('field-company').classList.add('has-error');
        return 0;
    } else {
        $('field-company').classList.remove('has-error');
        // console.log('hello')
    }
    if (managerName.length <= 2) {
        $('field-manager').classList.add('has-error');
        return 0;
    } else {
        $('field-manager').classList.remove('has-error');
    }
    if (phoneNumber.length !== 10) {
        $('field-phone').classList.add('has-error');
        return 0;
    } else {
        $('field-phone').classList.remove('has-error');
    }
}
const dataArray = JSON.parse(localStorage.getItem('contactDetails')) || [];
const addCardForm = (e) => {
    e.preventDefault();
    const companyName = $('companyName').value.trim();
    const managerName = $('managerName').value.trim();
    const phoneNumber = $('phoneNumber').value.trim();
    const emailAddress = $('emailAddress').value.trim();
    const validation = formValidation(companyName,managerName,phoneNumber);
    if(validation == 0){
        return;
    }
const dataObj = {
    companyName,
    managerName,
    phoneNumber,
    emailAddress
}

dataArray.push(dataObj);
// console.log(dataArray);
localStorage.setItem('contactDetails', JSON.stringify(dataArray));
$('contact-form').reset();
};
$('contact-form').addEventListener('submit', addCardForm);