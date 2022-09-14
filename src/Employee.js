
export class Employee {
    static dbUrl = 'http://localhost:3000/employees/';

    constructor(data) {
        this.fName = data.fName;
        this.lName = data.lName;
        this.birthday = new Date(data.birthday);
        this.username = this.username(data.fName, data.lName, data.birthday);
        this.age = Math.floor((Date.now() - (new Date(data.birthday))) / (1000 * 60 * 60 * 24 * 365.25));
        this.gender = data.gender;
        this.email = data.email;
        this.pwd = data.pwd;
        this.adress = data.adress;
        this.phoneNumber = data.phoneNumber;
        this.contract = data.contract;
        this.contractStart = new Date(data.contractStart);
        this.baseSalary = data.baseSalary;
        this.avatarAdress = (data.avatarAdress === "") ? `https://avatars.dicebear.com/api/initials/${data.fName[0]}${data.lName[0]}.svg` : data.avatarAdress;
        this.inscriptionComplete = (data.inscriptionComplete);
        this.role = ['user'];
        this.id = data.id;
        this.status = "employees";
    }

    currentSalary() {
        let currentYear = new Date().getFullYear();
        let startYear = this.contractStart.getFullYear();
        let diff = currentYear - startYear;
        return Math.floor(this.baseSalary.slice(1) * Math.pow(1.10, diff));
    }

    username(fName, lName, birthday) {
        return `${fName[0].toLowerCase()}${lName.toLowerCase()}${new Date(birthday).getFullYear().toString().slice(2)}`.split(' ').join('');
    }

    static async getAllUser() {
        let users = [];
        await fetch(this.dbUrl)
            .then(rep => rep.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++)
                    users[i] = new Employee(data[i]);
            })
        return users;
    }

    static async getId() {
        return await fetch(this.dbUrl)
            .then(resp => resp.json())
            .then(data => data.length)
    }

    static async getUserById(id) {
        return await fetch(this.dbUrl + id)
            .then(rep => rep.json())
            .then(data => new Employee(data));
    }

    static async getUserId(field, value) {
        return await fetch(this.dbUrl)
            .then(rep => rep.json())
            .then((data) => {
                const user = data.find(obj => {
                    let fieldExist = Object.getOwnPropertyDescriptor(obj, field)
                    if (fieldExist && fieldExist.value === value)
                        return obj;
                    if (!fieldExist)
                        obj = null;
                })
                return (user.id)
            })
    }

    static async getUser(field, value) {
        let user = [];
        await fetch(this.dbUrl)
            .then(resp => resp.json())
            .then(data => data.find(obj => {
                let fieldExist = Object.getOwnPropertyDescriptor(obj, field)
                if (fieldExist && fieldExist.value === value)
                    user.push(new Employee(obj));
                else
                    obj = null;
            }))
        return (user != null) ? user : null;
    }

    static dropDatabase() {
        fetch(this.dbUrl)
            .then(resp => resp.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++)
                    fetch(dbUrl + data[i].id, {
                        method: "DELETE"
                    })
            });
    }

    addToDatabase() {
        fetch(this.dbUrl, {
            method: "POST",
            body: JSON.stringify(this),
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    addField(object) {
        fetch("http://localhost:3000/employees/" + this.id, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
        })
    }

    deleteUser() {
        fetch(this.dbUrl + this.id, {
            method: "DELETE"
        })
    }
}