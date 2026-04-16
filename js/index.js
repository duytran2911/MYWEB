let current = 0
const slides = document.querySelectorAll(".slide")

function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"))
    slides[index].classList.add("active")
}

document.querySelector(".next").onclick = () => {
    current = (current + 1) % slides.length
    showSlide(current)
}

document.querySelector(".prev").onclick = () => {
    current = (current - 1 + slides.length) % slides.length
    showSlide(current)
}

// tự động chạy
setInterval(() => {
    current = (current + 1) % slides.length
    showSlide(current)
}, 3000)

// đăng xuất

document.getElementById("logout-btn").addEventListener("click", function () {

    if (confirm("Bạn có chắc chắn muốn đăng xuất")) {
        firebase.auth().signOut().then(() => {
            localStorage.removeItem("user_session");
            window.location.href = "./login.html";
        })
    }

})


// load sản phẩm

function loadProducts() {

    const productGrid = document.querySelector("#product-grid")

    let htmls = ""

    db.collection("products")
        .get()
        .then((querySnapshot) => {

            querySnapshot.forEach((doc) => {

                const product = doc.data()
                const productId = doc.id;

                htmls += `
<div class="product-card">

<img src="${product.imageURL}" alt="${product.name}">

<div class="product-info">

<div class="product-name">${product.name}</div>

<div class="product-price">${product.price.toLocaleString('vi-VN')}₫</div>
<button class="add-to-cart-btn"
onclick="addToCart(event, '${productId}', '${product.name}', ${product.price}, '${product.imageURL}')">
Thêm vào giỏ
</button>


</div>

</div>
`

            })

            productGrid.innerHTML = htmls

        })

}

loadProducts()
// Giỏ hàng
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// Thêm sản phẩm vào giỏ
function addToCart(event, id, name, price, imageURL) {
    const btn = event.target;

    // hiệu ứng nút
    btn.textContent = "Đã thêm ✓";
    btn.style.background = "#4caf50";

    setTimeout(() => {
        btn.textContent = "Thêm vào giỏ";
        btn.style.background = "";
    }, 1000);

    // logic giỏ hàng
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            imageURL,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Xóa sản phẩm khỏi giỏ
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Cập nhật số lượng sản phẩm trong giỏ
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Hiển thị giỏ hàng
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Giỏ hàng trống</div>';
        cartTotalDiv.innerHTML = 'Tổng: 0₫';
        return;
    }

    let htmls = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        htmls += `
                    <div class="cart-item">
                        <img src="${item.imageURL}" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${item.price.toLocaleString('vi-VN')}₫ x ${item.quantity}</div>
                            <button class="remove-item" onclick="removeFromCart('${item.id}')">Xóa</button>
                        </div>
                    </div>
                `;
    });

    cartItemsDiv.innerHTML = htmls;
    cartTotalDiv.innerHTML = `Tổng: ${total.toLocaleString('vi-VN')}₫`;
}

// Mở/đóng giỏ hàng
document.querySelector('.cart').addEventListener('click', function () {
    document.getElementById('cart-modal').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
    displayCart();
});

document.getElementById('close-cart').addEventListener('click', function () {
    document.getElementById('cart-modal').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
});

document.getElementById('cart-overlay').addEventListener('click', function () {
    document.getElementById('cart-modal').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
});

// Nút thanh toán
document.getElementById('checkout-btn').addEventListener('click', function () {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    // Chưa làm gì cả
    alert('Chức năng thanh toán đang được phát triển');
});
// Cập nhật số lượng sản phẩm trong giỏ
updateCartCount();
