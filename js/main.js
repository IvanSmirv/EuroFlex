let isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

if (isMobile.any()) {
    document.body.classList.add('phone')
} else {
    document.body.classList.add('pc')
}

let burger = document.querySelector('.header__burger')
let menu = document.querySelector('.header__menu')
burger.addEventListener('click', function () {
    burger.classList.toggle('active')
    menu.classList.toggle('active')
    document.body.classList.toggle('blocked')
})

menuLink = document.querySelectorAll('.header__link')
menuLink.forEach(el => {
    el.addEventListener('click', function () {
        document.querySelector('.header__menu.active').classList.remove('active')
        document.querySelector('body.blocked').classList.remove('blocked')
        document.querySelector('.header__burger').classList.remove('active')
    })
});

if (document.querySelector(".tel") !== null) {
    window.addEventListener("DOMContentLoaded", function () {
        [].forEach.call(document.querySelectorAll('.tel'), function (input) {
            let keyCode;
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                let pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                let matrix = "+7 (___) ___-__-__",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function (a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function (a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5) this.value = ""
            }

            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false)
        });
    });

}

if ((document.querySelector('.js-tab-trigger') && document.querySelector('.js-tab-content')) !== null) {
    let jsTriggers = document.querySelectorAll('.js-tab-trigger'),
        jsContents = document.querySelectorAll('.js-tab-content');

    jsTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            let id = this.getAttribute('data-tab'),
                content = document.querySelector('.js-tab-content[data-tab="' + id + '"]'),
                activeTrigger = document.querySelector('.js-tab-trigger.active'),
                activeContent = document.querySelector('.js-tab-content.active');

            activeTrigger.classList.remove('active');
            trigger.classList.add('active');

            activeContent.classList.remove('active');
            content.classList.add('active');
        })
    })
}

if (document.querySelector(".count") !== null) {
    function animateNumber(element) {
        var start = parseFloat(element.dataset.start) || 0;
        var end = parseFloat(element.dataset.end); //
        var duration = parseFloat(element.dataset.duration) || 1000;
        var startTime = performance.now();

        function update() {
            var now = performance.now();
            var elapsed = now - startTime;
            if (elapsed >= duration) {
                element.textContent = element.dataset.end;
            } else {
                var current = start + (end - start) * easeInOutQuad(elapsed / duration);
                element.textContent = current.toFixed(2);
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function callback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('observed');
                animateNumber(entry.target);
                entry.target.classList.add('animated');
            } else {
                entry.target.classList.remove('observed');
            }
        });
    }

    let observer = new IntersectionObserver(callback);

    document.querySelectorAll('.count').forEach(i => {
        observer.observe(i);
    });
}

if (document.querySelector(".mySwiper") !== null) {
    var swiper = new Swiper(".mySwiper", {
        // slidesPerView: 5,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            992: {
                slidesPerView: 5,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            }
        }
    });
}

if (document.getElementById("aniimated-thumbnials") !== null) {
    lightGallery(document.getElementById('aniimated-thumbnials'), {
        thumbnail: true
    });
}

if (document.querySelector("a.scroll-to") !== null) {
    const anchors = document.querySelectorAll('a.scroll-to');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const blockID = anchor.getAttribute('href');
            const targetElement = document.querySelector(blockID);

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

if (document.querySelector(".go-top") !== null) {
    const goTopBtn = document.querySelector(".go-top");

    window.addEventListener("scroll", trackScroll);
    goTopBtn.addEventListener("click", goTop);

    function trackScroll() {
        const scrolled = window.pageYOffset;
        const coords = document.documentElement.clientHeight;
        if (scrolled > coords) {
            goTopBtn.classList.add("go-top--show");
        } else {
            goTopBtn.classList.remove("go-top--show");
        }

        if (scrolled > 500) {
            document.querySelector('.header').classList.add('active')
        } else {
            document.querySelector('.header').classList.remove('active')
        }
    }

    function goTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -35);
            setTimeout(goTop, 0);
        }
    }
}