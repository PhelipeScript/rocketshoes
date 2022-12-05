const   sidebar = document.querySelector('.nav-box'),
        menuOpened = document.querySelector('.menu-opened'),
        menuClosed = document.querySelector('.menu-closed'),
        main = document.querySelector('main'),
        categories = document.querySelectorAll('.sidebar ul li'),
        searchInput = document.querySelector('.search-categories input'),
        cartIcon = document.querySelector('.cart-icon-box'),
        cartContent = document.querySelector('.cart-content')

menuClosed.addEventListener('click', openMenu)

function openMenu() {
    sidebar.classList.remove('close')
    sidebar.classList.add('open')
    main.style = 'filter: blur(4px)'
    cartContent.style = 'filter: blur(4px)'
}

menuOpened.addEventListener('click', closeMenu)

function closeMenu() {
    sidebar.classList.remove('open')
    sidebar.classList.add('close')
    main.style = 'filter: none'
    cartContent.style = 'filter: none'
}

cartIcon.addEventListener('click', showCartBox)

function showCartBox() {
    if(!cartContent.classList.contains('show-cart')) {
        closeMenu()
        cartContent.classList.add('show-cart')
        setTimeout(() => {
            main.style = 'display: none'
        }, 900)
        return
    }
    closeMenu()
    closeCartBox()
}

function closeCartBox() {
    if(cartContent.classList.contains('show-cart')) {
        cartContent.classList.remove('show-cart')
        main.style = 'display: flex'
        setTimeout(() => {
            main.style = 'display: flex'
        }, 900)
        return
    }
}

for(let categorie of categories) {
    categorie.addEventListener('click', () => {
        categories.forEach((categorie) => {
            categorie.classList.remove('selected')
        })
        categorie.classList.add('selected')
        showCard(categorie)
        closeMenu()
        changeTitle()
        showTopContent()
        scrollTop()
        closeCartBox()
    })
}

function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' })}

const categorieTitle = document.querySelector('.categorie-title')

function changeTitle() {
    let categorieSelected = document.querySelector('.selected')
    categorieTitle.innerText = categorieSelected.innerText
}

const allCategories = document.querySelector('.all-categories') 

function showCard(categorie) {
    let cards = document.querySelectorAll('.card')
    let categorieName = categorie.innerText.toLowerCase()
    cards.forEach((card) => {
        if(allCategories.classList.contains('selected')) {
            card.style = 'display: block'
            return
        }
        if(card.classList.contains(categorieName)) {
            card.style = 'display: block'
        } else {
            card.style = 'display: none'
        }
    }) 
}

function showTopContent() {
    const topContent = document.querySelectorAll('.top-content')
    if(allCategories.classList.contains('selected')) {
        topContent.forEach((e) => {
            e.style = 'display: block'
        })
        return
    }
    topContent.forEach((e) => {
        e.style = 'display: none'
    })
} 

searchInput.addEventListener('input', searchCategories)

function searchCategories() {
    let userInput = searchInput.value.toLowerCase()
    if (userInput != '') {
        for(let categorie of categories) {
            let categorieName = categorie.textContent.toLowerCase()
            if(categorieName.includes(userInput)) {
                categorie.style = 'display: flex'
            } else {
                categorie.style = 'display: none'
            }
        }
    } else {
        for(let categorie of categories) {
            categorie.style = 'display: flex'
        }
    }
}

const carousel = document.querySelector('.carousel')
const firstImg = carousel.querySelectorAll('img')[0]
const arrowIcons = document.querySelectorAll('.wrapper i')

let isDragStart = false, prevPageX, prevScrollLeft

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block'
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? 'none' : 'block'
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 14
        carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
        setTimeout(() => showHideIcons(), 60)
    })
})

const dragStart = (e) => {
    isDragStart = true
    prevPageX = e.pageX || e.touches[0].pageX
    prevScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    if(!isDragStart) return 
    e.preventDefault()
    carousel.classList.add('dragging')
    let positionDiff = (e.pageX || e.touches[0].pageX)- prevPageX
    carousel.scrollLeft = prevScrollLeft - positionDiff
    showHideIcons()
}

const dragStop = () => {
    isDragStart = false
    carousel.classList.remove('dragging')
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('touchstart', dragStart)

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('touchmove', dragging)

carousel.addEventListener('mouseup', dragStop)
carousel.addEventListener('mouseleave', dragStop)
carousel.addEventListener('touchend', dragStop)

const searchProducts = document.querySelector('.search-product input')

searchProducts.addEventListener('input', filterNameProd)

function filterNameProd() {
    let userInput = searchProducts.value.toLowerCase()
    let cards = document.querySelectorAll('.card')
    if(userInput != '') {
        if(allCategories.classList.contains('selected')) {
            for(let card of cards) {
                let cardName = card.querySelector('h3').innerText.toLowerCase()
                if(cardName.includes(userInput)) {
                    card.style = 'display: block'
                } else {
                    card.style = 'display: none'
                }
            }
        } else {
            for(let categorie of categories) {
                if (categorie.classList.contains('selected')) {
                    let categorieName = categorie.innerText.toLowerCase()
                    for(let card of cards) {
                        if(card.classList.contains(categorieName)) {
                            let cardName = card.querySelector('h3').innerText.toLowerCase()
                            if(cardName.includes(userInput)) {
                                card.style = 'display: block'
                            } else {
                                card.style = 'display: none'
                            }
                        } else {
                            card.style = 'display: none'
                        }
                    }
                }
            }
        }
    }else {
        if(allCategories.classList.contains('selected')) {
            for(let card of cards) {
                card.style = 'display: block'
            }
            return
        }
        for(let categorie of categories) {
            if (categorie.classList.contains('selected')) {
                let categorieName = categorie.innerText.toLowerCase()
                for(let card of cards) {
                    if(card.classList.contains(categorieName)) {
                        card.style = 'display: block'
                    } else {
                        card.style = 'display: none'
                    }
                }
            }
        }
    }
}

const cartBox = document.querySelector('.cart-box')

let cartId = 199
let cartIdCount = 0
function addToCart(cardId) {
    cartId++
    let idCart = cartId
    const cartEmptyParagraph = document.getElementById('empty-cart')
    cartEmptyParagraph.style = 'display: none'
    const productId = document.getElementById(cardId)
    const productImage = productId.querySelector('.image img').getAttribute('src')
    const productName = productId.querySelector('.name-price h3').innerText
    const productPrice = productId.querySelector('.price').innerText
    const productPromoPrice = productId.querySelector('.promo-price').innerText
    cartBox.innerHTML += ` 
        <div id="${idCart}" class="prod-in-cart">
            <img src="${productImage}" alt="foto do tenis">
            <div class="product-info">
                <h3>${productName}</h3>
                <div class="product-price">
                    <span class="prod-price">${productPrice}</span>
                    <strong class="prod-promo-price">${productPromoPrice}</strong>
                </div>
                <div class="size-box">
                    <label for="size">Tamanho:</label>
                    <select name="size" id="size">
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                    </select>
                </div>
                <div class="amount-box">
                    <label for="amount">Quantidade:</label>
                    <input min="1" max="10" value="1" type="number" name="amount" id="amount${idCart}" disabled>
                </div>
            </div>
            <i onclick="removeFromCart(${idCart})" class="fa-solid fa-trash trash"></i>
        </div> 
    ` 
    cartIdCount++
    counterProdInCart()
    increaseTotalPrice(productPromoPrice)
}

const cartCounter = document.querySelector('.cart-count')

function counterProdInCart() {
    if(cartIdCount > 9) {
        cartCounter.innerText = '9+'
        return
    }
    cartCounter.innerText = cartIdCount
}

function removeFromCart(idCart) {
    cartIdCount--
    let prodCartId = document.getElementById(idCart)
    prodCartId.style = 'display: none'
    if (cartIdCount == 0) {
        cartBox.innerHTML = `
            <p id="empty-cart">
                Seu carrinho de compras se encontra vazio <br>
                Navegue pelas nossas ofertas incríveis agora ! <br>
                <button onclick="buyNow()">Compre agora</button>  
            </p>
        `
    }
    let productPromoPrice = prodCartId.querySelector('.prod-promo-price')
    decreaseTotalPrice(productPromoPrice.innerText)
    counterProdInCart()
}

function buyNow() {
    closeCartBox()
    closeMenu()
}

const buttonToBuyInCart = document.querySelector('.buy-section .buy-button-cart')
const totalToPay = document.querySelector('.buy-section #total-to-pay')

let count = 0
function increaseTotalPrice(productPromoPrice) {
    const price = Number(productPromoPrice.match(/\d+/g).join().replace(',', '.'))
    totalToPay.innerText = (price + Number(totalToPay.innerText)).toFixed(2)
    count++
    if(count <= 1) {
        buttonToBuyInCart.style = 'background-color: #8257E5;'
        buttonToBuyInCart.addEventListener('click', showPaymentBox)
    }
}

function decreaseTotalPrice(productPromoPrice) {
    const price = Number(productPromoPrice.match(/\d+/g).join().replace(',', '.'))
    totalToPay.innerText = (Number(totalToPay.innerText) - price).toFixed(2)
    if(totalToPay.innerText == 0.00){
        buttonToBuyInCart.style = 'background-color: gray;'
        buttonToBuyInCart.removeEventListener('click', showPaymentBox) 
        count = 0
    }
}

const paymentContent = document.querySelector('.payment-content')

function showPaymentBox() {
    closeMenu()
    const prodAddinCart = document.querySelectorAll('.prod-in-cart')
    prodAddinCart.forEach((e) => e.style = 'display: none')
    menuClosed.style = 'display: none'
    cartIcon.style = 'display: none'
    buttonToBuyInCart.style = 'display: none'
    paymentContent.classList.add('show-payment-content')
}

const paymentMethods = document.querySelectorAll('.methods-payment li')

for(let paymentMethod of paymentMethods) {
    paymentMethod.addEventListener('click', () => {
        paymentMethods.forEach((e) => e.classList.remove('chosen-payment'))
        paymentMethod.classList.add('chosen-payment')
        chosenPayment()
    })
}

function chosenPayment() {
    const pixContent = document.getElementById('pix')
    const creditCardContent = document.getElementById('credit-card')
    const isPix = document.querySelector('.pix').classList.contains('chosen-payment')
    if(isPix) {
        creditCardContent.style = 'display: none'
        pixContent.style = 'display: flex'
        return
    }
    creditCardContent.style = 'display: block'
    pixContent.style = 'display: none'
}


const paymentDone = document.getElementById('done')

paymentDone.addEventListener('click', done)

function done() {
    paymentContent.classList.remove('show-payment-content')
    buttonToBuyInCart.removeEventListener('click', showPaymentBox)
    count = 0
    cartIdCount = 0
    counterProdInCart()
    closeCartBox()
    closeMenu()
    menuClosed.style = 'display: block'
    cartIcon.style = 'display: block'
    buttonToBuyInCart.style = 'display: block'
    cartBox.innerHTML = `
    <p id="empty-cart">
    Seu carrinho de compras se encontra vazio <br>
    Navegue pelas nossas ofertas incríveis agora ! <br>
    <button onclick="buyNow()">Compre agora</button>  
    </p>
    `
    totalToPay.innerText = '0.00'
}

let cardId = 0
function createCard(image, prodName, price, promoPrice, categorieType = 'all') {
    cardId++
    return `
            <div id=${cardId} class="card ${categorieType.toLowerCase()}">
                <div class="image">
                    <img src="${image}" alt="">
                </div>
                <div class="name-price">
                    <h3>${prodName}</h3>
                    <div class="price-box">
                        <span class="price">R$ ${price}</span>
                        <strong class="promo-price">R$ ${promoPrice}</strong>
                    </div>
                </div>
                <div class="buy-more">
                    <button class="buy-button">Comprar</button>
                    <button onclick="addToCart(${cardId})" class="add-cart-button">Adicionar ao Carrinho</button>
                </div>
            </div>
    `
}

const products = document.querySelector('.products')

products.innerHTML = 
    createCard('assets/adidas-pics/adidas-1.jpeg', 'Adidas Superstar Originals', '379.99', '279.99', 'Adidas') 
    + createCard('assets/adidas-pics/adidas-2.jpeg', 'Adidas Superstar Originals', '379.99', '279.99', 'Adidas')
    + createCard('assets/adidas-pics/adidas-3.jpeg', 'Adidas Superstar Originals', '379.99', '279.99', 'Adidas')
    + createCard('assets/adidas-pics/adidas-4.jpeg', 'Adidas Superstar Originals', '379.99', '279.99', 'Adidas')
    + createCard('assets/adidas-pics/adidas-5.jpeg', 'Adidas Superstar Originals', '379.99', '279.99', 'Adidas')
    + createCard('assets/adidas-pics/adidas-6.jpeg', 'Adidas Superstar Slip On', '339.99', '219.99', 'Adidas')
    + createCard('assets/adidas-pics/adidas-7.jpeg', 'Adidas Superstar Originals', '379.99', '279.99', 'Adidas')
    + createCard('assets/adidas-pics/adidas-8.jpeg', 'Adidas Superstar Originals', '379.99', '279.99', 'Adidas')
    + createCard('assets/adidas-pics/adidas-9.jpeg', 'Adidas Superstar Originals', '379.99', '279.99', 'Adidas')
    + createCard('assets/adidas-pics/adidas-10.jpeg', 'Adidas Superstar Slip On', '339.99', '219.99', 'Adidas')
    + createCard('assets/adidas-pics/adidas-11.jpeg', 'Adidas Superstar Slip On', '339.99', '219.99', 'Adidas')

    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-1.jpeg', 'Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-2.jpeg', 'Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-3.jpeg', 'Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-4.jpeg', 'Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-5.jpeg', 'Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-6.jpeg', 'Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-7.jpeg', 'Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-8.jpeg', 'Sapatenis Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-9.jpeg', 'Sapatenis Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-10.png', 'Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')
    + createCard('assets/dolce-gabbana-pics/dolce-gabbana-11.jpeg', 'Dolce Gabbana', '599.99', '379.99', 'Dolce-Gabbana')

    + createCard('assets/lacoste-pics/lacoste-1.jpeg', 'Sapatenis Lacoste', '499.99', '299.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-2.jpeg', 'Sapatenis Lacoste', '499.99', '299.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-3.jpeg', 'Sapatenis Lacoste', '499.99', '299.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-4.jpeg', 'Sapatenis Lacoste', '499.99', '299.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-5.jpeg', 'Sapatenis Lacoste', '499.99', '299.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-6.jpeg', 'Sapatenis Lacoste', '499.99', '299.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-7.jpeg', 'Sapatenis Lacoste', '499.99', '299.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-8.jpeg', 'Sapatenis Lacoste', '499.99', '299.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-9.jpeg', 'Sapatenis Lacoste', '499.99', '349.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-10.jpeg', 'Sapatenis Lacoste', '499.99', '349.99', 'Lacoste')
    + createCard('assets/lacoste-pics/lacoste-11.jpeg', 'Sapatenis Lacoste', '499.99', '349.99', 'Lacoste')
    
    + createCard('assets/louis-vuitton-pics/louis-vuitton-1.jpeg', 'Sapatenis Louis Vuitton', '599.99', '379.99', 'Louis-Vuitton')
    + createCard('assets/louis-vuitton-pics/louis-vuitton-2.jpeg', 'Sapatenis Louis Vuitton', '599.99', '379.99', 'Louis-Vuitton')
    + createCard('assets/louis-vuitton-pics/louis-vuitton-3.jpeg', 'Sapatenis Louis Vuitton', '599.99', '379.99', 'Louis-Vuitton')
    + createCard('assets/louis-vuitton-pics/louis-vuitton-4.jpeg', 'Sapatenis Louis Vuitton', '599.99', '379.99', 'Louis-Vuitton')
    + createCard('assets/louis-vuitton-pics/louis-vuitton-5.jpeg', 'Sapatenis Louis Vuitton', '599.99', '379.99', 'Louis-Vuitton')
    + createCard('assets/louis-vuitton-pics/louis-vuitton-6.jpeg', 'Sapatenis Louis Vuitton', '599.99', '379.99', 'Louis-Vuitton')
    + createCard('assets/louis-vuitton-pics/louis-vuitton-7.jpeg', 'Sapatenis Louis Vuitton', '599.99', '379.99', 'Louis-Vuitton')
    
    + createCard('assets/mizuno-pics/mizuno-14.jpeg', 'Mizuno Wave Prophecy Sorayama', '799.99', '649.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-7.jpeg', 'Mizuno Wave Prophecy Futur', '799.99', '529.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-8.jpeg', 'Mizuno Wave Prophecy Futur', '799.99', '529.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-2.png', 'Mizuno Wave Prophecy 6', '699.99', '429.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-5.png', 'Mizuno Wave Prophecy 7', '699.99', '429.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-6.jpeg', 'Mizuno Wave Prophecy 7', '699.99', '429.99', 'Mizuno')
    + createCard('assets/mizuno-pics/mizuno-1.jpeg', 'Mizuno Wave Prophecy 8', '699.99', '429.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-4.jpeg', 'Mizuno Wave Prophecy 8', '699.99', '429.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-3.jpeg', 'Mizuno Wave Prophecy 9', '699.99', '429.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-13.png', 'Mizuno Wave Prophecy 9', '699.99', '429.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-11.jpeg', 'Mizuno Wave Prophecy 10 wk', '699.99', '429.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-12.jpeg', 'Mizuno Wave Prophecy 10', '699.99', '429.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-9.jpeg', 'Mizuno Wave Prophecy 11', '699.99', '429.99', 'Mizuno') 
    + createCard('assets/mizuno-pics/mizuno-10.jpeg', 'Mizuno Wave Prophecy 11', '699.99', '429.99', 'Mizuno') 

    + createCard('assets/nike-pics/nike-1.jpeg', 'Nike Dunk', '499.99', '269.99', 'Nike') 
    + createCard('assets/nike-pics/nike-2.jpeg', 'Nike Dunk', '499.99', '269.99', 'Nike') 
    + createCard('assets/nike-pics/nike-3.jpeg', 'Nike Dunk', '499.99', '299.99', 'Nike') 
    + createCard('assets/nike-pics/nike-4.jpeg', 'Nike Air Jordan', '499.99', '299.99', 'Nike') 
    + createCard('assets/nike-pics/nike-5.jpeg', 'Nike Air Max 90', '599.99', '399.99', 'Nike') 
    + createCard('assets/nike-pics/nike-6.jpeg', 'Nike Air Max 90', '599.99', '399.99', 'Nike') 
    + createCard('assets/nike-pics/nike-7.jpeg', 'Nike Air Max 95', '599.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-8.jpeg', 'Nike Air Max 95', '599.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-9.jpeg', 'Nike Air Max 96', '899.99', '549.99', 'Nike') 
    + createCard('assets/nike-pics/nike-10.jpeg', 'Nike Air Max 96', '899.99', '549.99', 'Nike') 
    + createCard('assets/nike-pics/nike-11.jpeg', 'Nike Air Max 97', '499.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-12.jpeg', 'Nike Air Max 97', '499.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-13.jpeg', 'Nike Air Max 97 Plus', '499.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-14.jpeg', 'Nike Air Max 97 Plus', '499.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-15.jpeg', 'Nike Air Max Tailwind SK', '899.99', '549.99', 'Nike') 
    + createCard('assets/nike-pics/nike-16.jpeg', 'Nike Air Max Tailwind SK', '899.99', '549.99', 'Nike')
    + createCard('assets/nike-pics/nike-17.jpeg', 'Nike Air Max TN', '799.99', '419.99', 'Nike')  
    + createCard('assets/nike-pics/nike-18.jpeg', 'Nike Air Max TN', '799.99', '419.99', 'Nike') 
    + createCard('assets/nike-pics/nike-19.jpeg', 'Nike Air Max TN 3.0', '799.99', '519.99', 'Nike') 
    + createCard('assets/nike-pics/nike-20.jpeg', 'Nike Air Max TN 3.0', '799.99', '519.99', 'Nike') 
    + createCard('assets/nike-pics/nike-21.jpeg', 'Nike Air Max TN Terrascape', '799.99', '529.99', 'Nike') 
    + createCard('assets/nike-pics/nike-22.jpeg', 'Nike Air Max TN Terrascape', '799.99', '529.99', 'Nike') 
    + createCard('assets/nike-pics/nike-23.jpeg', 'Nike Shox NZ', '499.99', '239.99', 'Nike') 
    + createCard('assets/nike-pics/nike-24.jpeg', 'Nike Shox NZ', '499.99', '239.99', 'Nike') 
    + createCard('assets/nike-pics/nike-25.jpeg', 'Nike Shox R4', '499.99', '239.99', 'Nike') 
    + createCard('assets/nike-pics/nike-26.jpeg', 'Nike Shox R4', '499.99', '239.99', 'Nike') 
    + createCard('assets/nike-pics/nike-27.jpeg', 'Nike Shox TL 12 Molas 2019', '599.99', '319.99', 'Nike') 
    + createCard('assets/nike-pics/nike-28.jpeg', 'Nike Shox TL 12 Molas 2019', '599.99', '319.99', 'Nike') 
    + createCard('assets/nike-pics/nike-29.jpeg', 'Nike Shox TL 12 Molas 2020', '699.99', '419.99', 'Nike') 
    + createCard('assets/nike-pics/nike-30.jpeg', 'Nike Shox TL 12 Molas 2020', '699.99', '419.99', 'Nike') 
    + createCard('assets/nike-pics/nike-31.png', 'Nike Vapor Max 2.0', '599.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-32.jpeg', 'Nike Vapor Max 2.0', '599.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-33.jpeg', 'Nike Vapor Max 3.0', '599.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-34.jpeg', 'Nike Vapor Max 3.0', '599.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-35.jpeg', 'Nike Vapor Max Plus', '599.99', '379.99', 'Nike') 
    + createCard('assets/nike-pics/nike-36.jpeg', 'Nike Vapor Max Plus', '599.99', '379.99', 'Nike') 

    + createCard('assets/oakley-pics/oakley-1.jpeg', 'Oakley Flak 365', '499.99', '299.99', 'Oakley') 
    + createCard('assets/oakley-pics/oakley-2.jpeg', 'Oakley Flak 1.3', '499.99', '299.99', 'Oakley') 
    + createCard('assets/oakley-pics/oakley-3.jpeg', 'Oakley Flak 365', '499.99', '299.99', 'Oakley') 
    + createCard('assets/oakley-pics/oakley-4.jpeg', 'Oakley Flak 365', '499.99', '299.99', 'Oakley') 
    + createCard('assets/oakley-pics/oakley-5.jpeg', 'Oakley Flak 365', '499.99', '299.99', 'Oakley') 
    + createCard('assets/oakley-pics/oakley-6.jpeg', 'Oakley Flak 1.3', '499.99', '299.99', 'Oakley') 
    + createCard('assets/oakley-pics/oakley-7.jpeg', 'Oakley Halftrack', '499.99', '299.99', 'Oakley') 
    + createCard('assets/oakley-pics/oakley-8.jpeg', 'Oakley Flak 365', '499.99', '299.99', 'Oakley') 
    + createCard('assets/oakley-pics/oakley-9.jpeg', 'Oakley Flak 365', '499.99', '299.99', 'Oakley') 
    + createCard('assets/oakley-pics/oakley-10.jpeg', 'Oakley Halftrack', '499.99', '299.99', 'Oakley') 