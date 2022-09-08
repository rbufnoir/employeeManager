import { checkForm } from "./checkForm.js"
import { addToDatabase, updateByName } from "./database.js"
import { Employee } from "./Employee.js";

document.getElementById('inscriptionForm').addEventListener('input', (e) => {
    if(e.target.type === "text")
        checkForm(e.target,
                new RegExp("^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$"),
                e.target.labels[0].textContent.slice(0, -1) + " must be two characters long and cannot contains numbers or special characters");
    else if (e.target.type === "password")
        checkForm(e.target,
                new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[&$%!?]).{8,30}$"),
                'Password must be 8 characters long and must contains a capital letter, a number and at least and special character');
    else if (e.target.type === "email")
        checkForm(e.target,
                new RegExp("^[a-zA-Z0-9]{1,}\.?[a-zA-Z0-9]+@[a-zA-Z0-9]{2,10}\.(?:com|fr|org|io|gmail)$"),
                "Invalid mail adress");
});

document.getElementById('inscriptionSubmit').addEventListener('click', addToDatabase);

console.log(await new Employee().getAllUser())
console.log(await new Employee().getUserById(1))
let test = new Employee();
test = await new Employee().getUserByEmail('remi.bufnoir@free.fr');

console.log(test.username())