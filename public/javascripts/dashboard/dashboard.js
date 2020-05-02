class Dashboard {
    constructor() {
        if (typeof localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null) {
            return window.location = "/";
        }

    }
    click() {
        console.log('hey')
    }
}

const Dashboard_ = new Dashboard();