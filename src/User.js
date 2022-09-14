export class User {
    constructor(data) {
        if (User.exist)
            return User.instance;

        this.username = data.username;
        this.role = data.role;
        this.id = data.id

        this.saveToLocalStorage();

        User.exist = true;
        User.instance = this;
        return this;
    }

    saveToLocalStorage() {
        localStorage.setItem('username', this.username);
        localStorage.setItem('role', this.role);
        localStorage.setItem('id', this.id);
    }

    static getUser() {
        const username = this.username || localStorage.getItem('username');
        const role = this.role || localStorage.getItem('role');
        const id = this.id || localStorage.getItem('id');

        if (username && role && id) {
            const user = new User({
                username,
                role,
                id
            });
        }

        if (!username && !role && !id)
            return null;

        return {
            username: username,
            role: role,
            id: id
        }
    }

    static delete() {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        User.exist = false;
        this.username = null;
        this.role = null;
        this.id = null;
        User.instance = null;
    }
}