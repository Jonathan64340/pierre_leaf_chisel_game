class Dashboard {
    constructor() {
        if (typeof localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null) {
            return window.location = "/";
        }
        
        this.state = {
            avatar: JSON.parse(localStorage.getItem('USER')).avatar,
            username: JSON.parse(localStorage.getItem('USER')).username
        }

        let that = this;

        window.onload = function () {
            let avatar = document.getElementById('avatar').setAttribute('src', that.state.avatar);
            let username = document.getElementById('username').innerText = " " + that.state.username;
        }

        

    }
    click() {
        console.log('hey')
    }
}

const Dashboard_ = new Dashboard();