
const loginForm = document.querySelector("#login-form")
const inpEmail = document.querySelector("#inp-email")
const inpPwd = document.querySelector("#inp-pwd")

loginForm.addEventListener("submit", function (event) {

    event.preventDefault()

    const email = inpEmail.value
    const password = inpPwd.value

    if (!email || !password) {
        alert("Vui lòng điền đủ các trường")
        return
    }

    firebase.auth().signInWithEmailAndPassword(email, password)

        .then((userCredential) => {

            const user = userCredential.user

            alert("Đăng nhập thành công")

            const userSession = {
                user: user,
                expiry: new Date().getTime() + 2 * 60 * 60 * 1000
            }

            localStorage.setItem("user_session", JSON.stringify(userSession))

            window.location.href = "./index.html"

        })

        .catch((error) => {

            console.log("Lỗi đăng nhập:", error.message)
            alert("Email hoặc mật khẩu không đúng")

        })

})
