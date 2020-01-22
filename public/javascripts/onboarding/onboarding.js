class Onboarding {
    constructor() {
        // InitalState
        this.state = {
            username: null,
            avatar: null,
            validateCondition: false,
            password: null
        };
        // Icons
        this.pierre = document.getElementById('pierre-icon');
        this.leaf = document.getElementById('leaf-icon');
        this.chisel = document.getElementById('chisel-icon');
        this.avatarList = document.getElementById('avatar-list');
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

    selectAvatar(avatar) {
        for(let i = 0; i <= document.getElementsByClassName('active-avatar').length; i++) {
            if(typeof document.getElementsByClassName('active-avatar')[i] !== 'undefined') {
                if(new RegExp(/(active-avatar)/gi).test(document.getElementsByClassName('active-avatar')[i].className)) {
                    document.getElementsByClassName('active-avatar')[i].classList.remove('active-avatar');
                }
            };
        };
        avatar.classList.add('active-avatar');
        this.state.avatar = avatar.getAttribute('src');

        let fwd = document.getElementById('forwarding');

        if(this.state.username && this.state.avatar && this.state.validateCondition && this.state.password.length >= 3) {
            fwd.removeAttribute('disabled');
        } else {
            fwd.setAttribute('disabled', true);  
        }
    }

    validateCheck() {
        let fwd = document.getElementById('forwarding');

        this.state.validateCondition = !this.state.validateCondition;
        console.log(this.state)
        if(this.state.username && this.state.avatar && this.state.validateCondition && this.state.password.length >= 3) {
            fwd.removeAttribute('disabled');
        } else {
            fwd.setAttribute('disabled', true);  
        }
    }

    validatePassword() {
        let pwd = document.getElementById('pwd');
        let fwd = document.getElementById('forwarding');

        if(pwd.value) {
            this.state.password = pwd.value;
            if(this.state.username && this.state.avatar && this.state.validateCondition && this.state.password.length >= 3) {
                fwd.removeAttribute('disabled');
            } else {
                fwd.setAttribute('disabled', true);  
            }
        }
    }

    canForward() {
        if(this.state.username && this.state.avatar && this.state.validateCondition && this.state.password.length >= 3) {
            let forwarding = document.getElementById('forwarding');
            let statusOnSubmitRegister = document.getElementById('statusOnSubmitRegister');
            statusOnSubmitRegister.hidden = false;
            forwarding.setAttribute('disabled', true);
            axios.post("http://localhost:5555/api/register", { params: { user: this.state.username, password: this.state.password, avatar_url: this.state.avatar }})
                .then(() => {
                    console.log('successs')
                    statusOnSubmitRegister.hidden = true;
                    forwarding.removeAttribute('disabled');
                })
                .catch(err => {
                    console.log('errrr', err);
                    statusOnSubmitRegister.hidden = true;
                    forwarding.removeAttribute('disabled');
                });
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

                axios.post("http://localhost:5555/api/login?user=" + this.username.value.toLowerCase())
                    .then(authenticateUser => {
                        console.log('user', authenticateUser);
                        switch(authenticateUser.status) {
                            case 200: 
                                this.statusOnSubmit.hidden = true;
                                this.errorField.innerHTML = "";
                                // window.location.href = "/dashboard";
                                this.btnSubmit.removeAttribute('disabled');
                                $('#authenticateLoginModal').modal('show');
                                this.state.username = this.username.value.toLowerCase();
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
                        this.state.username = this.username.value.toLowerCase();
                        let that = this;
                        $('#authenticateRegisterModal').on('shown.bs.modal', function () {
                            let avatar_list = document.getElementById('avatar-list');
                            let name = document.getElementById('name_pseudo');
                            name.innerText = that.username.value;
                            // Set icons avatar
                            that.displayAvatars(avatar_list);
                        });
                    });
                };
        } else {
            this.statusOnSubmit.hidden = true;
            this.errorField.innerHTML = `<div class="alert alert-warning alert-dismissible fade show mt-2">
                                            <strong>Attention !</strong> Le pseudo doit contenir au minimum 3 charactères et maximum 15 charactères.
                                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                                        </div>`;
            this.btnSubmit.removeAttribute('disabled');
        };
    };

    displayAvatars(av) {
        let html = "";
        for(let i = 1; i <= 15; i++) {
            html += `<img src="../images/profile/avatar/${i}.svg" class="rounded m-1 img-thumbnail avatar-select" onClick="Onboarding_.selectAvatar(this)" width="45" height="45" alt="..." onchange="Onboarding_.canForward()"></img>`
            if(i == 15) {
                av.innerHTML = html;
            }
        };
    };

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
        };
    };
};

const Onboarding_ = new Onboarding();