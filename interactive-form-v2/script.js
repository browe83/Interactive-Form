// Techdegree-Project-3
// JavaScript by Brandon Rowe
// Thank you for your time and expertise :)

const form = document.querySelector("form");
const nameInput = document.getElementById("name");
nameInput.focus();

const yourJobRoleInput = document.getElementById("other-title");
const selectJobRole = document.getElementById("title");
const selectJobRoleOptions = document.getElementById("title").options;

yourJobRoleInput.hidden = true;

//Hides or shows "Your Job Role" input field depending on user selection.

selectJobRole.addEventListener("change", () => {
  const eventTarget = event.target.value;

  if (selectJobRoleOptions[5].value === eventTarget) {
    yourJobRoleInput.hidden = false;
  } else {
    yourJobRoleInput.hidden = true;
  }
});

// Creates "select theme" option in design drop down menu.  Hides or shows color menu and options depending on user selections.

const selectTheme = document.getElementById("design");
const selectThemeOptions = document.getElementById("design").options;
selectThemeOptions[0].style.display = "none";

const selectColor = document.getElementById("color");
const selectColorOptions = document.getElementById("color").options;
const selectThemeOption = document.createElement("option");
selectThemeOption.textContent = "Please select a T-shirt theme";
selectColor.insertBefore(selectThemeOption, selectColorOptions[0]);
selectColorOptions[0].selected = true;
const colorDiv = document.getElementById("colors-js-puns");
colorDiv.hidden = true;

selectTheme.addEventListener("change", () => {
  colorDiv.hidden = false;
  for (let i = 0; i < selectThemeOptions.length; i++) {
    const eventTarget = event.target.value;

    if (eventTarget === selectThemeOptions[1].value) {
      selectColorOptions[1].selected = true;
      selectColorOptions[0].hidden = true;
      selectColorOptions[1].hidden = false;
      selectColorOptions[2].hidden = false;
      selectColorOptions[3].hidden = false;
      selectColorOptions[4].hidden = true;
      selectColorOptions[5].hidden = true;
      selectColorOptions[6].hidden = true;
    } else if (eventTarget === selectThemeOptions[2].value) {
      selectColorOptions[4].selected = true;
      selectColorOptions[0].hidden = true;
      selectColorOptions[1].hidden = true;
      selectColorOptions[2].hidden = true;
      selectColorOptions[3].hidden = true;
      selectColorOptions[4].hidden = false;
      selectColorOptions[5].hidden = false;
      selectColorOptions[6].hidden = false;
    }
  }
});

// Creates a container that tabulates the total cost of selected activities and prevents user from selecting conflicting activities.
const totalActivityCostContainer = document.createElement("div");
const activityContainer = document.getElementsByClassName("activities");
activityContainer[0].appendChild(totalActivityCostContainer);
const activitiesCheckboxes = document.querySelectorAll(".activities input");
let totalActivityCost = 0;

activityContainer[0].addEventListener("change", (e) => {
  const clicked = e.target;
  const activityCost = parseInt(clicked.getAttribute("data-cost"));

  if (clicked.checked) {
    totalActivityCost += activityCost;
  } else {
    totalActivityCost -= activityCost;
  }

  totalActivityCostContainer.textContent = `Total: $ ${totalActivityCost}`;

  for (let i = 0; i < activitiesCheckboxes.length; i++) {
    const clickedDayTime = clicked.getAttribute("data-day-and-time");
    const checkboxDayTime = activitiesCheckboxes[i].getAttribute(
      "data-day-and-time"
    );
    if (
      clickedDayTime === checkboxDayTime &&
      clicked !== activitiesCheckboxes[i]
    ) {
      if (clicked.checked) {
        activitiesCheckboxes[i].disabled = true;
      } else {
        activitiesCheckboxes[i].disabled = false;
      }
    }
  }
});

// Hides or shows payment options and/or input fields depending on user selections.

const paymentMethod = document.getElementById("payment");
const ccInfo = document.getElementById("credit-card");
const payPal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
payPal.hidden = true;
bitcoin.hidden = true;
paymentMethod[1].selected = true;
paymentMethod[0].hidden = true;

paymentMethod.addEventListener("change", (e) => {
  eventTarget = e.target.value;

  if (eventTarget === paymentMethod[1].value) {
    ccInfo.hidden = false;
    payPal.hidden = true;
    bitcoin.hidden = true;
  } else if (eventTarget === paymentMethod[2].value) {
    ccInfo.hidden = true;
    payPal.hidden = false;
    bitcoin.hidden = true;
  } else if (eventTarget === paymentMethod[3].value) {
    ccInfo.hidden = true;
    payPal.hidden = true;
    bitcoin.hidden = false;
  }
});

// Validates user input and provides user with appropriate error messages.
const displayErrorMsg = (divId, errorMsg, target) => {
  if (document.getElementById(divId) === null) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    errorDiv.id = divId;
    target.parentNode.insertBefore(errorDiv, target);
  }
  document.getElementById(divId).textContent = errorMsg;
};
const nameValidator = (e) => {
  const nameInputValue = nameInput.value;

  if (nameInputValue.length > 0) {
    nameInput.style.borderColor = "#5e97b0";
    document.getElementById("name-error-msg").textContent = "";
    return true;
  } else {
    displayErrorMsg("name-error-msg", "Please enter a valid name", nameInput);
    nameInput.style.borderColor = "red";
    return false;
  }
};

nameInput.addEventListener("blur", nameValidator);
nameInput.addEventListener("input", nameValidator);

const email = document.getElementById("mail");
const emailValidator = () => {
  const emailValue = email.value;
  const emailRegex = /^[^@]+@[^@.]+\.[a-z]{2,3}$/i;
  if (emailRegex.test(emailValue)) {
    document.getElementById("email-error-msg").textContent = "";
    email.style.borderColor = "#5e97b0";
    return true;
  } else {
    displayErrorMsg("email-error-msg", "Please enter a valid email", email);
    email.style.borderColor = "red";
    return false;
  }
};

email.addEventListener("blur", emailValidator);
email.addEventListener("input", emailValidator);

const activitiesValidator = () => {
  for (let i = 0; i < activitiesCheckboxes.length; i++) {
    if (activitiesCheckboxes[i].checked) {
      document.getElementById("acitivities-error-msg").textContent = "";
      return true;
    }
  }
  displayErrorMsg(
    "acitivities-error-msg",
    "Please select 1 or more activities",
    activityContainer[0]
  );
  return false;
};

const ccInput = document.getElementById("cc-num");
const ccNumValidator = () => {
  const ccInputValue = ccInput.value;
  const ccNumRegex = /^\d{13,16}$/;
  const ccNumRegex2 = /^\d{1,12}$/;
  const ccNumRegex3 = /\d{17,}/;
  if (ccNumRegex.test(ccInputValue)) {
    ccInput.style.borderColor = "#5e97b0";
    document.getElementById("ccNum-error-msg").textContent = "";
    return true;
  }
  if (ccNumRegex2.test(ccInputValue) || ccNumRegex3.test(ccInputValue)) {
    displayErrorMsg(
      "ccNum-error-msg",
      "Please enter a number that is between 13 and 16 digits long",
      ccInput
    );
    ccInput.style.borderColor = "red";
    return false;
  } else {
    displayErrorMsg(
      "ccNum-error-msg",
      "Please enter a valid credit card number",
      ccInput
    );
    ccInput.style.borderColor = "red";
    return false;
  }
};

ccInput.addEventListener("blur", ccNumValidator);

const ccZipCode = document.getElementById("zip");
const ccZipValidator = () => {
  const ccZipValue = ccZipCode.value;
  const ccZipRegex1 = /^\d{5}$/;
  const ccZipRegex2 = /^\d{1,4}$/;
  const ccZipRegex3 = /\d{6,}/;
  if (ccZipRegex1.test(ccZipValue)) {
    document.getElementById("zip-error-msg").textContent = "";
    ccZipCode.style.borderColor = "#5e97b0";
    return true;
  } else if (ccZipRegex2.test(ccZipValue) || ccZipRegex3.test(ccZipValue)) {
    displayErrorMsg(
      "zip-error-msg",
      "Please enter a valid zip code with 5 digits",
      ccZipCode
    );
    ccZipCode.style.borderColor = "red";
    return false;
  } else {
    displayErrorMsg(
      "zip-error-msg",
      "Please enter a valid zip code",
      ccZipCode
    );
    ccZipCode.style.borderColor = "red";
    return false;
  }
};

ccZipCode.addEventListener("blur", ccZipValidator);

const cvvNum = document.getElementById("cvv");
const cvvNumValidator = () => {
  const cvvNumValue = cvvNum.value;
  const cvvRegex = /^\d{3}$/;
  const cvvRegex2 = /^\d{1,2}$/;
  const cvvRegex3 = /\d{4,}/;
  if (cvvRegex.test(cvvNumValue)) {
    document.getElementById("cvv-error-msg").textContent = "";
    cvvNum.style.borderColor = "#5e97b0";
    return true;
  } else if (cvvRegex2.test(cvvNumValue) || cvvRegex3.test(cvvNumValue)) {
    displayErrorMsg(
      "cvv-error-msg",
      "Please enter a number that is 3 digits long",
      cvvNum
    );
    cvvNum.style.borderColor = "red";
    return false;
  } else {
    displayErrorMsg("cvv-error-msg", "Please enter a valid cvv", cvvNum);
    cvvNum.style.borderColor = "red";
    return false;
  }
};

cvvNum.addEventListener("blur", cvvNumValidator);

form.addEventListener("submit", (e) => {
  if (!nameValidator()) {
    e.preventDefault();
  }
  if (!emailValidator()) {
    e.preventDefault();
  }
  if (!activitiesValidator()) {
    e.preventDefault();
  }

  if (paymentMethod[1].selected) {
    if (!ccNumValidator()) {
      e.preventDefault();
    }
    if (!ccZipValidator()) {
      e.preventDefault();
    }
    if (!cvvNumValidator()) {
      e.preventDefault();
    }
  }
});
