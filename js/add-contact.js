const $ = (id) => document.getElementById(id);
const addCardForm = (e) => {
    e.preventDefault();
    const companyName = $('companyName').value.trim();
    const managerName = $('managerName').value.trim();
    const phoneNumber = $('phoneNumber').value.trim();
    const emailAddress = $('emailAddress').value.trim();
    if (companyName.length <= 2) {
        $('field-company').classList.add('has-error');
        return;
    } else {
        $('field-company').classList.remove('has-error');
        console.log('hello')
    }
    if (managerName.length <= 2) {
        $('field-manager').classList.add('has-error');
        return;
    } else {
        $('field-manager').classList.remove('has-error');
    }
    if (phoneNumber.length !== 10) {
        $('field-phone').classList.add('has-error');
        return;
    } else {
        $('field-phone').classList.remove('has-error');
    }
};


$('contact-form').addEventListener('submit', addCardForm);