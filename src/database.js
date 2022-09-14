import { Employee } from './Employee.js'
import { encryptData } from './utilities.js';

export async function addToDatabase() {
    if (!Employee.getUser('email', document.getElementById('email').value) != null) {
        const myModal = bootstrap.Modal.getInstance('#inscriptionModal');
        myModal.hide();
        const data = {
            fName: document.getElementById('firstname').value, 
            lName: document.getElementById('lastname').value,
            birthday: document.getElementById('birthday').value,
            gender: "Unknown",
            email: document.getElementById('email').value,
            pwd: await encryptData(document.getElementById('password').value),
            adress: "Unknown",
            phoneNumber: "Unknown",
            contract:"Unknown",
            contractStart: "Unknown",
            baseSalary: "Unknown",
            avatarAdress: "",
            id: (await Employee.getId() + 1)
        }
        const newEmployee = new Employee(data);
        newEmployee.addToDatabase();
    }
    else
        alert("Cet adresse mail est déjà utilisée! Si vous pensez qu'il s'agit d'une erreur merci de contacter l'administrateur");
}

export function deleteUserByField(id, field) {
    fetch("http://localhost:3000/employees/"+ id)
    .then(resp => resp.json())
    .then(data =>  {
        delete data[field];
        fetch("http://localhost:3000/employees/"+ id, {
        method: "PUT",
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(data)
        })
    })
}

export function patchUserByField(id, field, value) {
    fetch("http://localhost:3000/employees/"+ id, {
        method: "PATCH",
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            [field]: value,
        })
    })
}

export function patchUser(id, object) {
    fetch("http://localhost:3000/employees/"+ id, {
        method: "PATCH",
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(object)
    })
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