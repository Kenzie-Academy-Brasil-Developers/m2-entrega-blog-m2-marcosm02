import { Api } from "./requests.js"

class CreatePost {
    static clickBtn() {
        const btnPost = document.getElementById('btnAdcNewPost')
        btnPost.addEventListener('click', (event) => this.newPost(event))
    }

    static newPost(event) {
        event.preventDefault()

        const getText = document.getElementById('newPost').value.trim()
        const data = {
            content: getText
        }

        Api.createPost(data)
    }
}
CreatePost.clickBtn()