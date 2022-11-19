const   sidebar = document.querySelector('.nav-box'),
        menuOpened = document.querySelector('.menu-opened'),
        menuClosed = document.querySelector('.menu-closed');

menuClosed.addEventListener('click', () => {
    sidebar.classList.remove('close')
    sidebar.classList.add('open')
})

menuOpened.addEventListener('click', () => {
    sidebar.classList.remove('open')
    sidebar.classList.add('close')
})
