export class Api {
    static baseUrl = 'https://blog-m2.herokuapp.com'
    static token = localStorage.getItem('@BlogM2:token') || ''
    static headers = {'Content-Type': 'application/json'}

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

    static async createPost(body) {
        const newPost = await fetch(`${this.baseUrl}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }

    static async userPage(){
        const token = localStorage.getItem('@BlogM2:token')
        const id = localStorage.getItem('@BlogM2:id')
        const userInfo = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
        return userInfo
    }

    static async posts(){
        const token = localStorage.getItem('@BlogM2:token')
        const postsList = await fetch(`${this.baseUrl}/posts?page=1`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
        return postsList
    }
}