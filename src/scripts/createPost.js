import { Api } from "./requests.js"

/*
esse arquivo (createPost.js) deve ser anexado ao homePage para que as funcionalidades funcionem
*/

class CreatePost {
    static clickBtn() {
        const btnPost = document.getElementById('newPost')
        btnPost.addEventListener('click', (event) => this.newPost(event))
    }

    static newPost(event) {
        event.preventDefault()

        const getText = document.getElementById('btnAdcNewPost').value.trim()
        const data = {
            content: getText
        }

        Api.createPost(data)
    }
}
CreatePost.clickBtn()