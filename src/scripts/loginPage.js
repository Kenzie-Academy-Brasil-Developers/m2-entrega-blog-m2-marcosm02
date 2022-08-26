import { Api } from "./requests.js"

class LoginPage {
    static accessHomePage() {
      const token = localStorage.getItem('@BlogM2:token')

      if (token != 'undefined' && token != null) {
        window.location.assign('../src/pages/homePage.html')
      }

      const emailInput = document.getElementById('email')
      const passwordInput = document.getElementById('password')
      const btnLogin = document.getElementById('submit')
  
      btnLogin.addEventListener("click", (event) => {
        event.preventDefault()
  
        const data = {
          email: emailInput.value,
          password: passwordInput.value
        }
  
        const userLogin = Api.login(data)
        .then(userLoginInfo => this.isSignedUp(userLoginInfo.message))
      })
    }

    static isSignedUp(userLogin) {
        if (userLogin == 'User not found') {
            const span = document.getElementsByTagName('span')[0]
            span.classList.add('ativo')
            span.classList.remove('inativo')
        }   
    }

    static handleSignUp() {
        const handleSignUpBtn = document.getElementById('handleSignUp')
        handleSignUpBtn.addEventListener('click', () => window.location.assign('../src/pages/signup.html'))
    }
}
LoginPage.accessHomePage()