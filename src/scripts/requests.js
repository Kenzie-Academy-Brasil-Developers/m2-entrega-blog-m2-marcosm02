export class Api {
    static baseUrl = 'https://blog-m2.herokuapp.com'
    static headers = {"Content-Type": "application/json"}

    static async login(body) {
        const userLogin = await fetch(`${this.baseUrl}/users/login`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(dataReturn => dataReturn.json())
        .then(dataReturn => {
            localStorage.setItem('@BlogM2:token', dataReturn.token)
            localStorage.setItem('@BlogM2:id', dataReturn.userId)

            if (dataReturn.token != 'undefined' && dataReturn.token != null) {
                window.location.assign('../src/pages/homePage.html')
            }
            return dataReturn
        })
        return userLogin
    }

    static async signUp(body) {
        const createUser = await fetch(`${this.baseUrl}/users/register`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(data => data.json())
        return createUser
    }
}