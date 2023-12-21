/**
 * redux 模块
 */
const elObj = {
    searchModalEl: document.querySelector("#search-content"),
    loginModalEl: document.querySelector("#login-content")
}

const bookInitialState = {
    isShowSearch: false,
    isShowLogin: false
}

let unsubscribeMap = new Map();

const bookReduce = (state, action) => {
    switch (action.type) {
        case SHOW_SEARCH:
            return {...state, isShowSearch: action?.payload}
        case SHOW_LOGIN:
            return {...state, isShowLogin: action?.payload}
        default:
            return state
    }
}

// 模态窗显示隐藏统一处理
const showModalRender = (name) => {
    return () => {
        const stateName = capitalizeFirstLetter(name)
        store.getState()["isShow" + stateName] ? elObj[name + "ModalEl"].classList.add("show-" + name)
                                               : elObj[name + "ModalEl"].classList.remove("show-" + name)
    }
}

const store = Redux.createStore(bookReduce, bookInitialState)

document.getElementById("search-button")
        .addEventListener("click", () => {
            const rest = store.subscribe(showModalRender("search"))
            unsubscribeMap.set(MODAL_RENDER, rest)
            store.dispatch({type: SHOW_SEARCH, payload: true})
        })

document.getElementById("search-close")
        .addEventListener("click", () => {
            store.dispatch({type: SHOW_SEARCH, payload: false})
            unsubscribeMap.has(MODAL_RENDER) ? unsubscribeMap.get(MODAL_RENDER)()
                                             : null
        })

document.getElementById("login-button")
    .addEventListener("click", () => {
        const rest = store.subscribe(showModalRender("login"))
        unsubscribeMap.set(MODAL_RENDER, rest)
        store.dispatch({type: SHOW_LOGIN, payload: true})
    })

document.getElementById("login-close")
    .addEventListener("click", () => {
        store.dispatch({type: SHOW_LOGIN, payload: false})
        unsubscribeMap.has(MODAL_RENDER) ? unsubscribeMap.get(MODAL_RENDER)()
                                         : null
    })

/**
 * swiper 模块
 */

let homeSwiper = new Swiper ('.home__swiper', {
    loop: true, // 循环模式选项
    spaceBetween: -24, // 间距
    grabCursor: true, // 鼠标覆盖Swiper 时指针会变成手掌形状，拖动时指针会变成抓手形状。
    slidesPerView: "auto", // 设置slider容器能够同时显示的slides数量
    centeredSlides: true, // 居中幻灯片

    autoplay: { // 自动轮播
        delay: 3000,
        disableOnInteraction: false // 用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
    },

    breakpoints: {
        1220: {
            spaceBetween: -40
        }
    }
})

let featureSwiper = new Swiper ('.featured__swiper', {
    loop: true, // 循环模式选项
    spaceBetween: 16, // 间距
    grabCursor: true, // 鼠标覆盖Swiper 时指针会变成手掌形状，拖动时指针会变成抓手形状。
    slidesPerView: "auto", // 设置slider容器能够同时显示的slides数量
    centeredSlides: true, // 居中幻灯片

    breakpoints: {
        1150: {
            slidesPerView: 4,
            centeredSlides: false
        }
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

let newSwiper = new Swiper ('.new__swiper', {
    loop: true, // 循环模式选项
    spaceBetween: 16, // 间距
    slidesPerView: "auto", // 设置slider容器能够同时显示的slides数量

    breakpoints: {
        1150: {
            slidesPerView: 3,
        }
    },
})

let testimonialSwiper = new Swiper ('.testimonial__swiper', {
    loop: true, // 循环模式选项
    spaceBetween: 16, // 间距
    grabCursor: true, // 鼠标覆盖Swiper 时指针会变成手掌形状，拖动时指针会变成抓手形状。
    slidesPerView: "auto", // 设置slider容器能够同时显示的slides数量
    centeredSlides: true, // 居中幻灯片

    breakpoints: {
        1150: {
            slidesPerView: 3,
            centeredSlides: false
        }
    },

})


/**
 * 滚动监听
 */
const shadowHeader = () => {
    const header = document.querySelector("#header")
    this.scrollY >= 50 ? header.classList.add("shadow-header")
                       : header.classList.remove("shadow-header")
}

window.addEventListener("scroll", shadowHeader)


/**
 * 返回顶部
 */
const scrollUp = () => {
    const scrollUpEl = document.getElementById("scroll-up")
    this.scrollY >= 350 ? scrollUpEl.classList.add("show-scroll")
                        : scrollUpEl.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollUp)


/**
 * nav 导航栏滚到到相应区域
 */
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/**
 * 主题切换 theme
 */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/**
 * 滚动加载库
 */
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home__data, .featured__container, .new__container, .join__data,
           .testimonial__container, .footer`)
sr.reveal(`.home__images`, {delay: 600})
sr.reveal(`.service__card`, {interval: 100})
sr.reveal(`.discount__data`, {origin: "left"})
sr.reveal(`.discount__images`, {origin: "right"})
