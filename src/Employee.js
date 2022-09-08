import { encryptData } from './utilities.js'

export class Employee {
    constructor(fName, lName, birthday, gender, email, pwd, adress, phoneNumber, contract, contractStart, baseSalary, avatarAdress) {
        this.fName = fName;
        this.lName = lName;
        this.birthday = new Date(birthday);
        this.age = Math.floor((Date.now() - (new Date(birthday))) / (1000 * 60 * 60 * 24 * 365.25));
        this.gender = gender;
        this.email = email;
        this.pwd = pwd;
        this.adress = adress;
        this.phoneNumber = phoneNumber;
        this.contract = contract;
        this.contractStart = new Date(contractStart);
        this.baseSalary = baseSalary;
        this.avatarAdress = (avatarAdress === "") ? `https://avatars.dicebear.com/api/initials/${fName[0]}${lName[0]}.svg`: avatarAdress;
        this.inscriptionComplete = (arguments.length < 12) ? false : true ;
    }

    currentSalary() {
        let currentYear = new Date().getFullYear();
        let startYear = this.contractStart.getFullYear();
        let diff = currentYear - startYear;
        return Math.floor(this.baseSalary.slice(1) * Math.pow(1.10, diff));
    }

    username() {
        return `${this.fName[0].toLowerCase()}${this.lName.toLowerCase()}${this.birthday.getFullYear().toString().slice(2)}`.split(' ').join('');
    }

    getAllUser() {
        const data = fetch('http://localhost:3000/employees').then(rep => rep.json());
        return (data);
    }

    getUserById(id) {
        const data = fetch('http://localhost:3000/employees/' + id).then(rep => rep.json());
        return (data);
    }

    getUserByEmail(email) {
        const data = fetch('http://localhost:3000/employees')
        .then(rep => rep.json())
        .then((tab) => {
            const cell = tab.find(obj => {
                if (obj.email === email)
                    return obj.id
            })
            return fetch('http://localhost:3000/employees/' + cell.id)
            .then(rep => rep.json())
        });
        return (data);
    }
}