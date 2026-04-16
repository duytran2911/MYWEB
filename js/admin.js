/* LOGOUT */

document.getElementById("logout-btn").addEventListener("click", function () {

    if (confirm("Bạn có chắc muốn đăng xuất?")) {

        firebase.auth().signOut()

            .then(() => {

                localStorage.removeItem("user_session")
                window.location.href = "./login.html"

            })

            .catch((error) => {

                console.log("Lỗi:", error.message)

            })

    }

})

/* TOGGLE FORM */

document.getElementById("toggle-form-btn").addEventListener("click", function () {

    const form = document.getElementById("add-product-form")

    form.classList.toggle("active")

})

/* LOAD PRODUCTS */

function loadProducts() {

    const tableBody = document.getElementById("product-list")

    let html = ""

    db.collection("products").get()

        .then((querySnapshot) => {

            let index = 1

            querySnapshot.forEach((doc) => {

                const product = doc.data()

                html += `

<tr>

<td>${index++}</td>

<td><img src="${product.imageURL}" alt=""></td>

<td>${product.name}</td>

<td>${product.price.toLocaleString('vi-VN')}₫</td>

<td>

<div class="product-actions">

<button class="btn-edit">Sửa</button>

<button class="btn-delete" onclick="deleteProduct('${doc.id}')">Xóa</button>

</div>

</td>

</tr>

`

            })

            tableBody.innerHTML = html

        })

        .catch(() => {

            tableBody.innerHTML = '<tr><td colspan="5">Lỗi tải dữ liệu</td></tr>'

        })

}

loadProducts()

/* ADD PRODUCT */

document.getElementById("product-form").addEventListener("submit", function (e) {

    e.preventDefault()

    const name = document.getElementById("product-name").value
    const price = parseFloat(document.getElementById("product-price").value)
    const imageUrl = document.getElementById("product-image").value

    const data = {

        name: name,
        price: price,
        imageURL: imageUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()

    }

    db.collection("products").add(data)

        .then(() => {

            alert("Thêm sản phẩm thành công")

            document.getElementById("product-form").reset()

            document.getElementById("add-product-form").classList.remove("active")

            loadProducts()

        })

        .catch(() => {

            alert("Lỗi khi thêm sản phẩm")

        })

})

/* DELETE PRODUCT */

function deleteProduct(id) {

    if (confirm("Bạn có chắc muốn xóa?")) {

        db.collection("products").doc(id).delete()

            .then(() => {

                alert("Xóa thành công")

                loadProducts()

            })

            .catch(() => {

                alert("Lỗi khi xóa")

            })

    }

}
