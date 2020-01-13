class Onboarding {
    constructor() {
        // Icons
        this.pierre = document.getElementById('pierre-icon');
        this.leaf = document.getElementById('leaf-icon');
        this.chisel = document.getElementById('chisel-icon');
        // Inputs
        this.username = document.getElementById('username');

        let that = this;

        window.onload = function () {
            that.setIcon(that.pierre, 1);
            that.setIcon(that.leaf, 2);
            that.setIcon(that.chisel, 3);
        }

    }

    onSubmit() {
        if(this.username.value.length >= 3 && this.username.value.length <= 15) {
            window.location.href = "/dashboard";
        } else {

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

    onChange(ev='') {
        if(typeof ev === 'string') {
            if(ev === 'username') {
                return localStorage.setItem('username', this.username.value);
            }
        }
    }
}

const Onboarding_ = new Onboarding();