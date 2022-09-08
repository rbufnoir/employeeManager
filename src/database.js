import { Employee } from './Employee.js'
import { encryptData } from './utilities.js';

export async function addToDatabase() {
    fetch("http://localhost:3000/employees", {
        method: "POST",
        body: JSON.stringify(new Employee(document.getElementById('firstname').value,
                                        document.getElementById('lastname').value,
                                        document.getElementById('birthday').value,
                                        "?",
                                        document.getElementById('email').value,
                                        await encryptData(document.getElementById('password').value)
        )),
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export function updateById(id) {
    fetch("http://localhost:3000/employees/"+ id, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(new Employee("Test", 'test'))
    })
    .then(resp => resp.json())
    .then(data => console.log(data.lName));
}

export function updateByName(mail) {
    fetch("http://localhost:3000/employees")
    .then(resp => resp.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++)
            if (data[i].email === mail)
                alert('Tu existes, bravo!')
    })
    .catch(err => alert(err));
}