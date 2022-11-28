const   sidebar = document.querySelector('.nav-box'),
        menuOpened = document.querySelector('.menu-opened'),
        menuClosed = document.querySelector('.menu-closed'),
        main = document.querySelector('main'),
        categories = document.querySelectorAll('.sidebar ul li'),
        searchInput = document.querySelector('.search-categories input')

menuClosed.addEventListener('click', () => {
    sidebar.classList.remove('close')
    sidebar.classList.add('open')
    main.style = 'filter: blur(4px)'
})

menuOpened.addEventListener('click', () => {
    sidebar.classList.remove('open')
    sidebar.classList.add('close')
    main.style = 'filter: none'
})

for(let categorie of categories) {
    categorie.addEventListener('click', () => {
        categories.forEach((categorie) => {
            categorie.classList.remove('selected')
        })
        categorie.classList.add('selected')
        setTimeout(() => categorie.classList.remove('selected'), 10000)
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

let id = 0
function createCard(image, prodName, price, promoPrice) {
    id++
    return `
            <div id=${id} class="card">
                <div class="image">
                <img src="${image}" alt="">
                </div>
                <div class="name-price">
                <h3>${prodName}</h3>
                <div class="price-box">
                    <span class="price">R$ ${price}</span>
                    <span class="promo-price">R$ ${promoPrice}</span>
                </div>
                </div>
                <div class="buy-more">
                    <button class="buy">Comprar</button>
                    <button class="see-more"><i class="fa-solid fa-eye"></i></button>
                </div>
            </div>
    `
}

const products = document.querySelector('.products')

products.innerHTML = 
    createCard('assets/img-1.jpeg', 'Mizuno Wave Prophecy 8', '699.99', '429.99') + createCard('assets/img-2.png', 'Mizuno Wave Prophecy 6', '699.99', '429.99') 
    + createCard('assets/img-3.jpeg', 'Nike Shox 12 Molas', '499.99', '319.99') 
    + createCard('assets/img-4.jpeg', 'Mizuno Wave Prophecy 9', '699.99', '429.99') 
    + createCard('assets/img-5.jpeg', 'Mizuno Wave Prophecy 8', '699.99', '429.99') 
    + createCard('assets/img-6.png', 'Mizuno Wave Prophecy 7', '699.99', '429.99') 
    + createCard('assets/img-7.jpeg', 'Mizuno Wave Prophecy 7', '699.99', '429.99') 