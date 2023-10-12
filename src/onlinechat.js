import { isGetElement } from "./helpers.js";

const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute(
    "href",
    "https://fonts.googleapis.com/css?family=Lato&display=swap"
);
document.head.appendChild(link);

const spinnerDiv = document.createElement("img")
spinnerDiv.src = "./icons/spinner.gif"
spinnerDiv.className = "spinner"

const wrapSpinner = document.createElement("div")
wrapSpinner.className = "wrapSpinner"
wrapSpinner.appendChild(spinnerDiv)
// Create a form element and set some basic styles
const form = document.createElement("form");
form.style.minWidth = "250px";
form.style.margin = "0 auto";
form.style.borderRadius = "5px";
form.className = "chat-form"
form.style.display = "none"

form.addEventListener("mouseover", function () {
    form.style.boxShadow = "2px 2px 0 2px rgba(23, 162, 184, 0.20)"
})
form.addEventListener("mouseout", function () {
    form.style.boxShadow = ""
})

const h3 = document.createElement("h3")
h3.innerHTML = "Онлайн чат"
h3.className = "title"
// h3.style.color = "#fff"
// h3.style.fontFamily = "Lato, sans-serif";

const nameLabel = document.createElement("label")
nameLabel.innerHTML = 'Имя'
nameLabel.className = "name-label"

const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.name = "name";
nameInput.required = true;
nameInput.className = "name-input";

const telLabel = document.createElement("label")
telLabel.innerHTML = 'Телефон номер'
telLabel.className = "tel-label"
// telLabel.style.fontFamily = "Lato, sans-serif"
// telLabel.style.color = "#fff"

const telInput = document.createElement("input");
telInput.type = "tel";
telInput.name = "tel";
// telInput.placeholder = "Телефон номер";
telInput.required = true;
telInput.className = "tel-input";

const emailLabel = document.createElement("label")
emailLabel.innerHTML = 'Почта'
emailLabel.className = "email-label"

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.name = "email";
emailInput.required = true;
// emailInput.placeholder = "Почта";
emailInput.className = "email-input";


// Create a submit button and set its styles
const submitButton = document.createElement("input");
submitButton.type = "submit";
submitButton.value = "Отправить";
submitButton.className = "submit-btn"

const bottomDiv = document.createElement("div")
bottomDiv.className = "bottom-div"



const errorDiv = document.createElement("div")
errorDiv.className = "error-div"

const errorText = document.createElement("h4")
errorText.className = "error-text"
errorText.innerHTML = "Произошла ошибка"
errorDiv.appendChild(errorText)


export let isLoading = ""

const continueDiv = document.createElement("div")
continueDiv.className = "continueDiv"

function getLink(link) {

    const Navigate = document.createElement("a")
    Navigate.innerHTML = "Продолжить..."
    Navigate.href = link
    Navigate.target = "_blank"
    continueDiv.appendChild(Navigate)
    form.appendChild(continueDiv)
}




export function toggleSpinnerVisibility() {
    console.log(isLoading);
    if (isLoading === "pending") {
        form.appendChild(wrapSpinner)
        if (bottomDiv) {
            form.removeChild(bottomDiv)
        }
        // if (errorDiv) {
        //     form.removeChild(errorDiv)
        // }

    }
    else if (isLoading === "continue") {
        form.appendChild(continueDiv)
        console.log(isGetElement(form, wrapSpinner))
        if (isGetElement(form, wrapSpinner)) {
            form.removeChild(wrapSpinner)
        }
        if (isGetElement(form, errorDiv)) {
            form.removeChild(errorDiv)
        }
    }
    else if (isLoading === "") {
        form.appendChild(bottomDiv)
        if (isGetElement(form, continueDiv)) {
            form.removeChild(continueDiv)
        }
        if (isGetElement(form, errorDiv)) {
            form.removeChild(errorDiv)
        }
        if (isGetElement(form, wrapSpinner)) {
            form.removeChild(wrapSpinner)
        }
    } else if (isLoading === "error") {
        if (isGetElement(form, wrapSpinner)) {
            form.removeChild(wrapSpinner)
        }
        form.appendChild(errorDiv)
        form.appendChild(bottomDiv)
        if (isGetElement(form, continueDiv)) {
            form.removeChild(continueDiv)
        }
    }
}


// Add event listener for form submission
submitButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const tel = telInput.value;
    const email = emailInput.value;

    // You can add your validation logic here
    if (!name) {
        nameInput.classList.add('error')
    } else {
        nameInput.classList.remove("error")
    }
    if (!tel) {
        telInput.classList.add("error")
    } else {
        telInput.classList.remove("error")
    }
    if (!email) {
        emailInput.classList.add("error")
    } else {
        emailInput.classList.remove("error")
    }

    try {
        if (name && tel && email) {
            console.log("pen");
            isLoading = "pending"
            toggleSpinnerVisibility()
            const response = await fetch("https://wary-gossamer-ink.glitch.me/webhook/onlineChat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, number: tel, email })
            })

            if(!response.ok){
                throw new Error("Произошла ошибка с сетью! Повторите попытку позже!");
            }

            const resData = await response.json()
            if (resData.status === -1) {
                throw new Error("Ошибка с данными! Имя или номер отсутствует!");
            } else {
                isLoading = "continue"
                getLink(resData.chatRoom)
                toggleSpinnerVisibility()
            }
        }

        else {
            console.log("error");
        }
    } catch (error) {
        isLoading = "error"
        toggleSpinnerVisibility()
        console.log(error);
    }

});

nameInput.addEventListener("focus", function () {
    nameInput.classList.add("input-focus-name");
});

nameInput.addEventListener("blur", function () {
    nameInput.classList.remove("input-focus-name");
});
telInput.addEventListener("focus", function () {
    telInput.classList.add("input-focus-tel");
});

telInput.addEventListener("blur", function () {
    telInput.classList.remove("input-focus-tel");
});
emailInput.addEventListener("focus", function () {
    emailInput.classList.add("input-focus-email");
});

emailInput.addEventListener("blur", function () {
    emailInput.classList.remove("input-focus-email");
});

const topDiv = document.createElement("div");
topDiv.className = "top-div";






// Append form elements to the body
form.appendChild(topDiv)

topDiv.appendChild(h3);
bottomDiv.appendChild(nameLabel);
bottomDiv.appendChild(nameInput);
bottomDiv.appendChild(document.createElement("br"));
bottomDiv.appendChild(telLabel);
bottomDiv.appendChild(telInput);
bottomDiv.appendChild(document.createElement("br"));
bottomDiv.appendChild(emailLabel);
bottomDiv.appendChild(emailInput);
bottomDiv.appendChild(document.createElement("br"));
bottomDiv.appendChild(submitButton);

document.body.appendChild(form);
toggleSpinnerVisibility()

function isValidName(name) {
    // You can add name validation logic here if needed
    return name.length > 0;
}

function isValidPhoneNumber(tel) {
    // You can add telephone number validation logic here if needed
    // In this example, we're using a pattern attribute for basic validation
    return /^[0-9]{9}$/.test(tel);
}

function isValidEmail(email) {
    // You can add email validation logic here if needed
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
