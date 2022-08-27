import { Api } from "./requests.js"

class Render {
    
    static async renderPage(){
        const token = localStorage.getItem('@BlogM2:token')
        const id = localStorage.getItem('@BlogM2:id')
        
        if (token == 'undefined' || token == null) {
            window.location.assign('../../index.html')
        }
        else {
            const userInfo = await Api.userPage()

            const divPerfilBox = document.querySelector(".perfilBox")

            const userPageimg = document.querySelector(".perfilBox > img")
            userPageimg.src = userInfo.avatarUrl
            userPageimg.alt = userInfo.username

            const userPageName = document.querySelector(".perfilBox > h3")
            userPageName.innerText = userInfo.username

            divPerfilBox.append(userPageimg, userPageName)
        }
    }

    static logout (){
        const btnLogout = document.getElementById("btnLogout")
        btnLogout.addEventListener('click', (event) => {
            event.preventDefault()
            localStorage.removeItem('@BlogM2:token')
            localStorage.removeItem('@BlogM2:id')
            window.location.assign('../../index.html')
        })
    }

    static async renderPosts(){
        const postsList = await Api.posts()
        const arrPosts = postsList.data
        const ul = document.querySelector("ul")

        arrPosts.forEach((element) => {
            const cardPost = this.renderPostCard(element)

            ul.appendChild(cardPost)
        })
    }

    static renderPostCard(element){
        const id = localStorage.getItem('@BlogM2:id')

        const li = document.createElement('li')
        li.id = element.user.id
        li.classList.add("main__container__posts__cardPost")

        const divLargerBox = document.createElement('div')
        divLargerBox.classList.add("main__container__posts__cardPost__largerBox")

        const img = document.createElement('img')
        img.src = element.user.avatarUrl
        img.alt = element.user.username
        
        const divLargerBoxTextBox = document.createElement('div')
        divLargerBoxTextBox.classList.add("main__container__posts__cardPost__largerBox__textBox")

        const h2 = document.createElement('h2')
        h2.innerText = element.user.username

        const p = document.createElement('p')
        p.innerText = element.content

        const divSmallerBox = document.createElement('div')
        divSmallerBox.classList.add("main__container__posts__cardPost__smallerBox")

        const small = document.createElement('small')
        small.innerText = `${element.createdAt}`.slice(0, 10).split("-").reverse().join("/")

        divLargerBoxTextBox.append(h2, p)
        divLargerBox.append(img, divLargerBoxTextBox)
        divSmallerBox.append(small)
        li.append(divLargerBox, divSmallerBox)

        if(element.user.id == id){
            const divSmallerBoxBtnBox = document.createElement('div')
            divSmallerBoxBtnBox.classList.add("main__container__posts__cardPost__smallerBox__btnBox")

            const btnEdit = document.createElement('button')
            btnEdit.id = "btnEdit"

            const imgEdit = document.createElement("img")
            imgEdit.src = "../assets/edit 1.png"
            imgEdit.alt = "Editar"

            const btnDelete = document.createElement('button')
            btnDelete.id = "btnDelete"

            const imgDelete = document.createElement("img")
            imgDelete.src = "../assets/trash-bin 1.png"
            imgDelete.alt = "Deletar"

            btnEdit.appendChild(imgEdit)
            btnDelete.appendChild(imgDelete)
            divSmallerBoxBtnBox.append(btnEdit, btnDelete)
            divSmallerBox.appendChild(divSmallerBoxBtnBox)
        }

        return li
    }
}

Render.renderPage()
Render.renderPosts()
Render.logout()