import { Api } from "./requests.js"

class CreateUser {
    static clickBtn() {
        const btnSignup = document.getElementById('submit')
        btnSignup.addEventListener('click', async (event) => this.getNewUserData(event))
    }

    static async getNewUserData(event) {
        event.preventDefault()

        const userNameInput       = document.getElementById('userName')
        const emailInput          = document.getElementById('email')
        const profilePictureInput = document.getElementById('userProfile')
        const passwordInput       = document.getElementById('password')

        const data = {
            username: userNameInput.value.trim(),
            email: emailInput.value.trim(),
            avatarUrl: profilePictureInput.value.trim(),
            password: passwordInput.value.trim(),
        }

        await Api.signUp(data)
        .then(res => {
            if (typeof res.id == 'number') {
                Toastify({
                    text: "Usuário cadastrado",
                    gravity: "top", 
                    position: "right", 
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                      fontSize: "16px"
                    },
                    onClick: function(){} 
                }).showToast()
            }
        })
        setTimeout(this.redirect, 2000)
    }

    static redirect() {
        window.location.assign('../../index.html')
    }
}
CreateUser.clickBtn()