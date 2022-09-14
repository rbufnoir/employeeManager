import { checkRegisterForm, checkLoginForm, checkLogin, disconnect } from "./checkForm.js"
import { addToDatabase } from "./database.js"
import { encryptData } from "./utilities.js";

window.onload = () => {
    checkLogin();
};

document.getElementById('inscriptionForm').addEventListener('input', (e) => {
    if(e.target.type === "text")
        checkRegisterForm(e.target,
                new RegExp("^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$"),
                e.target.labels[0].textContent.slice(0, -1) + " must be two characters long and cannot contains numbers or special characters");
    else if (e.target.type === "password")
        checkRegisterForm(e.target,
                new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[&$%!?<>,;:]).{8,30}$"),
                'Password must be 8 characters long and must contains a capital letter, a number and at least and special character');
    else if (e.target.type === "email")
        checkRegisterForm(e.target,
                new RegExp("^[a-zA-Z0-9]{1,}\.?[a-zA-Z0-9]+@[a-zA-Z0-9]{2,10}\.(?:com|fr|org|io|gmail)$"),
                "Invalid mail adress");
});

document.getElementById('inscriptionSubmit').addEventListener('click', addToDatabase);

document.getElementById('loginSubmit').addEventListener('click', async () => {
    const pwd = await encryptData(document.getElementById('loginPassword').value);
    checkLoginForm(document.getElementById('loginUsername').value, pwd);
});

document.getElementById('disconnectBtn').addEventListener('click', disconnect);

fetch('http://localhost:3000/employees/4', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({prix: "Infini"})
})