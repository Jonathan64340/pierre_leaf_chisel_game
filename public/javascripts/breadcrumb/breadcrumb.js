if(typeof module === 'object') {
    class Breadcrumb {
        constructor() {
            this.data = {
                location: []
            };
        };
    
        /**
         * 
         * @param {*} path - Path is required to construct breadcrumb. Use req.path.
         *
         */
        setBreadcrumb(path) {
            if(typeof path !== 'undefined') {
                switch(path) {
                    case "/":
                        this.data.location.push({ name: "Connexion", path: "/" });
                    break;
    
                    case "/dashboard":
                        this.data.location.push({ name: "Déconnexion", path: "/", action: "logout" });
                        this.data.location.push({ name: "Dashboard", path: "/dashboard" });
                    break;
                };
    
                return this.data;
            };
        };

        log() {
            console.log('ok');
        };
    };

    const Breadcrumb_ = new Breadcrumb();
    module.exports = Breadcrumb;
};