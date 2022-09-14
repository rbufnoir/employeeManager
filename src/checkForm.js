import { Employee } from "./Employee.js";
import { User } from "./User.js";
import { checkRegisterCompletion } from './userDisplay.js'

export function checkRegisterForm(elem, regex, error) {
    let tooltip = bootstrap.Tooltip.getOrCreateInstance(elem);
    if (!regex.test(elem.value)) {
        tooltip.dispose()
        tooltip = new bootstrap.Tooltip(elem);
        elem.setAttribute('data-bs-toggle', 'tooltip');
        elem.setAttribute('data-bs-title', error);
        elem.setAttribute('data-bs-placement', 'right');
        if (elem.value.length < 2)
            tooltip.dispose();
        else
            tooltip.show();
        document.getElementById('inscriptionSubmit').disabled = true;
    }
    else {
        tooltip.dispose();
        document.getElementById('inscriptionSubmit').disabled = false;
    }
}

export async function checkLoginForm(username, pwd) {
    const userL = await Employee.getUser('username', username);
    let obj;

    if (userL === null)
        console.log('error')
    else if (obj = userL.find(obj => {
        if (obj.pwd === pwd)
            return obj;
    }))
        login({
            username: obj.username,
            role: obj.role,
            id: obj.id
        })
    else
        document.getElementById('invalidLogin').classList.remove('d-none');
}

function showToast() {
    const myToast = new bootstrap.Toast(document.getElementById('myToast'));
    document.getElementById('toastMessage').innerText = `Bonjour ${localStorage.getItem('username')}`;
    myToast.show();
}

export function checkLogin() {
    if (User.getUser() === null)
        document.getElementById('loginBtn').classList.toggle('d-none');
    else {
        document.getElementById('disconnectBtn').classList.toggle('d-none');
        showToast();
        checkRegisterCompletion();
    }

}

export function disconnect() {
    User.delete();
    checkLogin();
    document.getElementById('disconnectBtn').classList.toggle('d-none');
    document.getElementById('contenu').innerHTML = '';
}

function login(data) {
    const user = new User(data);
    const myModal = bootstrap.Modal.getInstance('#loginModal');
    const logBtn = document.getElementById('loginBtn');
    myModal.hide();
    logBtn.classList.toggle('d-none');
    document.getElementById('disconnectBtn').classList.toggle('d-none');
    showToast();
    checkRegisterCompletion();
}

export function phoneInput() {
    //Autorising only number to be print
    // document.getElementById('phone').addEventListener('keydown', (e) => {
    //     let phone = document.getElementById('phone');
    //     let regex = new RegExp("^[a-zA-Z&é()$%!?]$");
    //     if (regex.test(e.key))
    //         e.preventDefault();
    //     if (phone.value.length >= 14 && !isNaN(e.key))
    //         e.preventDefault();
    // });

    // document.getElementById('phone').addEventListener('keyup', (e) => {
    //     let phone = document.getElementById('phone');
    //     if ((phone.value.length === 2 || phone.value.length === 5 || phone.value.length === 8 || phone.value.length === 11) && e.key != "Backspace")
    //         phone.value += "-";
    // });
    document.getElementById('phone').addEventListener('beforeinput', (e) => {
        let phone = document.getElementById('phone');
        let regex = new RegExp("^[a-zA-Z&é()$%!?]$");

        if (regex.test(e.data) || (phone.value.length >= 14 && !isNaN(e.data)) && e.inputType != "deleteContentBackward")
            e.preventDefault();
        if ((phone.value.length === 2 || phone.value.length === 5 || phone.value.length === 8 || phone.value.length === 11) && e.inputType != "deleteContentBackward")
            phone.value += "-";
    });
}