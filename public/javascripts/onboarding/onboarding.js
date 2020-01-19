class Onboarding {
    constructor() {
        // Icons
        this.pierre = document.getElementById('pierre-icon');
        this.leaf = document.getElementById('leaf-icon');
        this.chisel = document.getElementById('chisel-icon');
        // Inputs
        this.username = document.getElementById('username');
        this.errorField = document.getElementById('errorField');
        this.statusOnSubmit = document.getElementById('statusOnSubmit');
        // Buttons
        this.btnSubmit = document.getElementById('btnSubmit');

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
                this.errorField.innerHTML = `<div class="alert alert-warning alert-dismissible fade show mt-2">
                                                <strong>Attention !</strong> Le pseudo saisie n'est pas valide. Le pseudo ne doit pas contenir de charactères spéciaux.
                                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                            </div>`;
                return false;
            } else {

                this.statusOnSubmit.hidden = false;
                this.btnSubmit.setAttribute('disabled', true);

                let headers = {
                    data: {
                        user: encodeURI(this.username.value)
                    }
                };

                axios.post("http://localhost:5555/api/login?user=" + this.username.value)
                    .then(authenticateUser => {
                        console.log('user', authenticateUser);
                        switch(authenticateUser.status) {
                            case 200: 
                                this.statusOnSubmit.hidden = true;
                                this.errorField.innerHTML = "";
                                // window.location.href = "/dashboard";
                                this.btnSubmit.removeAttribute('disabled');
                                $('#authenticateLoginModal').modal('show');
                            break;
                        };
                    })
                    .catch(err => {

                        this.statusOnSubmit.hidden = true;
                        this.errorField.innerHTML = "";
                        // window.location.href = "/dashboard";
                        this.btnSubmit.removeAttribute('disabled');
                        $('#authenticateRegisterModal').modal('show');
                        this.btnSubmit.removeAttribute('disabled');
                    })
                }
        } else {
            this.statusOnSubmit.hidden = true;
            this.errorField.innerHTML = `<div class="alert alert-warning alert-dismissible fade show mt-2">
                                            <strong>Attention !</strong> Le pseudo doit contenir au minimum 3 charactères et maximum 15 charactères.
                                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                                        </div>`;
            this.btnSubmit.removeAttribute('disabled');
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