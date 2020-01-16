class Onboarding {
    constructor() {
        // Icons
        this.pierre = document.getElementById('pierre-icon');
        this.leaf = document.getElementById('leaf-icon');
        this.chisel = document.getElementById('chisel-icon');
        // Inputs
        this.username = document.getElementById('username');
        this.errorField = document.getElementById('errorField');

        let that = this;

        window.onload = function () {
            that.setIcon(that.pierre, 1);
            that.setIcon(that.leaf, 2);
            that.setIcon(that.chisel, 3);
        }

    }

    onSubmit() {
        if(this.username.value.length >= 3 && this.username.value.length <= 15) {
            // Use regex to escape non alphanumeric characts
            if(/[^a-zA-Z0-9\-\/]/.test(this.username.value)) {
                this.errorField.innerHTML = `<div class="alert alert-warning alert-dismissible fade show">
                                                <strong>Attention !</strong> Le pseudo saisie n'est pas valide. Le pseudo ne doit pas contenir de charactères spéciaux.
                                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                            </div>`;
                return false;
            } else {
                if(window.fetch) {
                    let headers = new Headers({
                        'Content-Type': 'application/json'
                    });

                    const authOption = {
                        method: 'POST',
                        headers: headers,
                        user: {
                            user: this.username.value
                        }
                    };

                    fetch("http://localhost:5555/api/login?user=" + encodeURI(this.username.value), authOption)
                        .then(authenticateUser => {
                            console.log('user', authenticateUser);
                            switch(authenticateUser.status) {
                                case 200: 
                                    this.errorField.innerHTML = "";
                                    // window.location.href = "/dashboard";
                                    $('#authenticateLoginModal').modal('show');
                                break;

                                case 404:
                                    this.errorField.innerHTML = "";
                                    // window.location.href = "/dashboard";
                                    $('#authenticateRegisterModal').modal('show');
                                break;
                            };
                           
                        })
                        .catch(error => {
                            console.log('ereur:ksdkfs')
                            this.errorField.innerHTML = "";
                            // window.location.href = "/";
                        });
                };
            }
        } else {
            this.errorField.innerHTML = `<div class="alert alert-warning alert-dismissible fade show">
                                            <strong>Attention !</strong> Le pseudo doit contenir au minimum 3 charactères et maximum 15 charactères.
                                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                                        </div>`;
            return false;
        }
    }

    setIcon(icon, position) {
        switch(position) {
            case 1: 
                icon.style.width = "80px";
                icon.style.height = "80px";
                icon.style.backgroundImage = "url(../../images/weapons.jpg)";
                icon.style.backgroundSize = "350%";
                icon.style.backgroundPosition = "5% 52%";
            break;

            case 2: 
                icon.style.width = "80px";
                icon.style.height = "80px";
                icon.style.backgroundImage = "url(../../images/weapons.jpg)";
                icon.style.backgroundSize = "350%";
                icon.style.backgroundPosition = "50% 52%";
            break;

            case 3: 
                icon.style.width = "80px";
                icon.style.height = "80px";
                icon.style.backgroundImage = "url(../../images/weapons.jpg)";
                icon.style.backgroundSize = "350%";
                icon.style.backgroundPosition = "95% 52%";
            break;
        }
    }
}

const Onboarding_ = new Onboarding();