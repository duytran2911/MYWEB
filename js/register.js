const inpUsername = document.querySelector("#inp-username")
const inpEmail = document.querySelector("#inp-email")
const inpPwd = document.querySelector("#inp-pwd")
const inpConfirmPwd = document.querySelector("#inp-confirm-pwd")
const registerForm = document.querySelector("#register-form")

registerForm.addEventListener("submit", function (event) {

    event.preventDefault()

    const username = inpUsername.value
    const email = inpEmail.value
    const password = inpPwd.value
    const confirmPassword = inpConfirmPwd.value

    if (!username || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đủ các trường")
        return
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp")
        return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)

        .then((userCredential) => {

            const user = userCredential.user

            alert("Đăng ký thành công")

            console.log("User registered:", user.uid)

            window.location.href = "./login.html"

        })

        .catch((error) => {

            console.log("Lỗi đăng ký:", error.message)
            alert(error.message)

        })

})
