const createAccountBtn = document.querySelector(".create-account-btn")
const createContainer = document.querySelector(".create-container")
const loginContainer = document.querySelector(".login-container")
const loginAccountBtn = document.querySelector(".login-account-btn")

createAccountBtn.addEventListener("click", () => {
    console.log("click")
    createContainer.classList.toggle("hide")
    loginContainer.classList.toggle("hide")
    loginAccountBtn.classList.toggle("hide")
})