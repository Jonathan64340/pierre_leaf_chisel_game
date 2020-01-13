module.exports = class Breadcrumb {
    constructor() {
        this.data = {
            location: []
        };
    };

    setBreadcrumb(path) {
        if(typeof path !== 'undefined') {
            console.log('location',path)
            switch(path) {
                case "/":
                    this.data.location.push({ name: "Accueil", path: "/" });
                break;
            };

            return this.data;
        };
        
    };
};