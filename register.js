// Get all the input fields
const form = document.getElementById('form');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const dateOfBirthInput = document.getElementById('dateOfBirth');
const phoneNumberInput = document.getElementById('phoneNumber');
const emailInput = document.getElementById('email');
const stateInput = document.getElementById('state');
const cityInput = document.getElementById('city');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  if (validateForm()) {
    form.reset();
    window.location.href="login.html";
 
  }
});

document.getElementById('state').addEventListener('change', populateCities);

function validateInput(event) {
  const input = event.target;
  const inputValue = input.value;
  const correctValue = inputValue.replace(/[^a-zA-Z]/g, '');
  if (inputValue !== correctValue) {
    input.value = correctValue;
  }
}

firstNameInput.addEventListener('input', validateInput);
lastNameInput.addEventListener('input', validateInput);
dateOfBirthInput.addEventListener('input', calculateAge);

const today = new Date().toISOString().split('T')[0];
dateOfBirthInput.setAttribute('min', '1900-01-01');
dateOfBirthInput.setAttribute('max', today);
dateOfBirthInput.addEventListener('input', function() {
  const selectedDate = new Date(this.value);
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    this.value = '';
  }
});

function validateForm() {
  let isValid = true;

  if (!validateFirstName()) {
    isValid = false;
  }
  if (!validateLastName()) {
    isValid = false;
  }
  if (!validateDateOfBirth()) {
    isValid = false;
  }
  if (!validatePhoneNumber()) {
    isValid = false;
  }
  if (!validateEmail()) {
    isValid = false;
  }
  if (!validateState()) {
    isValid = false;
  }
  if (!validateCity()) {
    isValid = false;
  }
  if (!validateUsername()) {
    isValid = false;
  }
  if (!validatePassword()) {
    isValid = false;
  }
  if (!validateConfirmPassword()) {
    isValid = false;
  }

  return isValid;
}

function validateFirstName() {
  if (firstNameInput.value.trim() === '') {
    showError(firstNameInput, 'First name is required');
    return false;
  } else {
    showSuccess(firstNameInput);
    return true;
  }
}

function validateLastName() {
  if (lastNameInput.value.trim() === '') {
    showError(lastNameInput, 'Last name is required');
    return false;
  } else {
    showSuccess(lastNameInput);
    return true;
  }
}



function validateDateOfBirth() {
  if (dateOfBirthInput.value === '') {
    showError(dateOfBirthInput, 'Date of birth is required');
    return false;
  } else {
    showSuccess(dateOfBirthInput);
    return true;
  }
}

function calculateAge() {
    const today = new Date();
    var dob = new Date(dateOfBirthInput.value);
    var age = today.getFullYear() - dob.getFullYear();
    var monthdiff=today.getMonth()-dob.getMonth();

    if( monthdiff<0 || ( monthdiff === 0 && today.getDate() < dob.getDate()))
    {
      age--;
    }
    if(age <0){
      document.getElementById('age').value='';

    }else{
    document.getElementById('age').value=age;
    }
    
  }
  var dobInput=document.getElementById('dob');
  dobInput.addEventListener('change',calculateAge);

function validatePhoneNumber() {
  if (phoneNumberInput.value.trim() === '') {
    showError(phoneNumberInput, 'Phone number is required');
    return false;
  } else if (phoneNumber.value.trim().length !== 10) {
    showError(phoneNumberInput, 'Phone number must have exactly 10 digits');
    return false;
  } else {
    showSuccess(phoneNumberInput);
    return true;
  }
}

function validateEmail() {
  const emailValue = emailInput.value.trim();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailValue === '') {
    showError(emailInput, 'Email is required');
    return false;
  } else if (!emailRegex.test(emailValue)) {
    showError(emailInput, 'Invalid email format');
    return false;
  } else {
    showSuccess(emailInput);
    return true;
  }
}

function validateState() {
  if (stateInput.value === '--select--') {
    showError(stateInput, 'Select your state');
    return false;
  } else {
    hideError(stateInput);
    return true;
  }
}

function validateCity() {
  if (cityInput.value === '--select--') {
    showError(cityInput, 'Select your city');
    return false;
  } else {
    hideError(cityInput);
    return true;
  }
}

function validateUsername() {
  const digitRegex = /[0-9]/;
  if (usernameInput.value.trim() === '') {
    showError(usernameInput, 'Username is required');
    return false;
  } else if (!digitRegex.test(usernameInput.value.trim())) {
    showError(usernameInput, 'Username must contain alphabets and digits');
    return false;
  } else {
    showSuccess(usernameInput);
    return true;
  }
}

function validatePassword() {
  const passwordValue = passwordInput.value.trim();
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  if (passwordValue === '') {
    showError(passwordInput, 'Password is required');
    return false;
  } else if (
    !uppercaseRegex.test(passwordValue) ||
    !lowercaseRegex.test(passwordValue) ||
    !digitRegex.test(passwordValue) ||
    !specialCharRegex.test(passwordValue)
  ) {
    showError(
      passwordInput,
      'Password must contain at least uppercase letter, lowercase letter, digit, and special character'
    );
    return false;
  } else if (passwordValue.length < 8) {
    showError(passwordInput, 'Your password must be at least 8 characters long');
    return false;
  } else {
    showSuccess(passwordInput);
    return true;
  }
}

function validateConfirmPassword() {
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (confirmPasswordValue === '') {
    showError(confirmPasswordInput, 'Confirm password is required');
    return false;
  } else if (confirmPasswordValue !== passwordValue) {
    showError(confirmPasswordInput, 'Passwords do not match');
    return false;
  } else {
    showSuccess(confirmPasswordInput);
    return true;
  }
}

function showError(input, message) {
  const inputBox = input.parentElement;
  const errorElement = inputBox.querySelector('.error');

  inputBox.classList.add('error');
  errorElement.textContent = message;
}

function hideError(input) {
  const inputBox = input.parentElement;
  const errorElement = inputBox.querySelector('.error');

  inputBox.classList.remove('error');
  errorElement.textContent = ''; // Clear the error message
}

function populateCities() {
  var stateInput = document.getElementById('state');
  var cityInput = document.getElementById('city');

  cityInput.innerHTML = '<option>--select--</option>';

  var selectedState = stateInput.value.toLowerCase();

  if (selectedState === 'kerala') {
    populateCityOptions(['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'], cityInput);
  } else if (selectedState === 'tamil nadu') {
    populateCityOptions(['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'], cityInput);
  } else if (selectedState === 'haryana') {
    populateCityOptions(['Gurgaon', 'Faridabad', 'Hisar', 'Panipat'], cityInput);
  } else if (selectedState === 'goa') {
    populateCityOptions(['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'], cityInput);
  }
}

function populateCityOptions(cities, cityInput) {
  cities.forEach(function(city) {
    var option = document.createElement('option');
    option.text = city;
    option.value = city;
    cityInput.add(option);
  });
}

function showSuccess(input) {
  const inputBox = input.parentElement;
  const errorElement = inputBox.querySelector('.error');

  inputBox.classList.remove('error');
  errorElement.textContent = ''; // Clear the error message
}
