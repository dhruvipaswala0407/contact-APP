const $ = (id) => document.getElementById(id);
const defult = (e) => {
    e.preventDefault();
    console.log('submit');
}
const formValidation = () => {

}
const addCardForm = () => {
    $('field-company').value;
    $('field-manager').value;
    $('field-phone').value;
    $('field-email').value;
};


$('contact-form').addEventListener('submit', defult);