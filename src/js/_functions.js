// Данный файл - лишь собрание подключений готовых компонентов.
// Рекомендуется создавать отдельный файл в папке components и подключать все там

// Определение операционной системы на мобильных
import { mobileCheck } from "./functions/mobile-check";
console.log(mobileCheck())
import noUiSlider from 'nouislider';



const rangeSliderInit = () => { // создаем функцию инициализации слайдера
  const range = document.querySelector('.slider__range'); // Ищем слайдер
  const input = document.querySelector('.slider__input'); // Ищем input с меньшим значнием

  if (!range || !input) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

  const inputs = [input]; // создаем массив из меньшего и большего значения



  noUiSlider.create(range, { // инициализируем слайдер
      start: [0], // устанавливаем начальные значения

      // tooltips: true,
      connect: [true, false],
      range: {
        'min': 0,
        '10%': 100,
        '20%': 200,
        '30%': 300,
        '40%': 400,
        '50%': 500,
        '60%': 600,
        '70%': 700,
        '80%': 800,
        '90%': 900,
        'max': 1000
    },
    pips: { mode: 'steps', density: 10,  values: 10,},


    }
  )

  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
    getActiveTariff()
  });

  input.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
    getActiveTariff()
  });


}

const init = () => {
  rangeSliderInit() // запускаем функцию инициализации слайдера
}
const getActiveTariff = () => {
  const inputValue = document.querySelector('.slider__input').value; // Ищем input с меньшим значнием
  const TariffItems = document.querySelectorAll('.main-tarifs-item')
  const TariffsBtns = document.querySelectorAll('[data-micromodal-trigger="rate-modal"]')
  TariffItems.forEach(TariffItem => {
    TariffItem.classList.remove('js-active')
  })
  if (inputValue <= 3){
    TariffsBtns[0].removeAttribute('disabled', '')
    TariffItems[0].classList.add('js-active')

  } else if (inputValue > 3 && inputValue <= 50){
    TariffsBtns[0].setAttribute('disabled', '')
    TariffsBtns[1].removeAttribute('disabled', '')
    TariffItems[1].classList.add('js-active')
  } else {
    TariffsBtns[0].setAttribute('disabled', '')
    TariffsBtns[1].setAttribute('disabled', '')
    TariffItems[2].classList.add('js-active')
  }
}
window.addEventListener('DOMContentLoaded', init) // запускаем функцию init, когда документ будет загружен и готов к взаимодействию

// Троттлинг функции (для ресайза, ввода в инпут, скролла и т.д.)м
// import { throttle } from './functions/throttle';
// let yourFunc = () => { console.log('throttle') };
// let func = throttle(yourFunc);
// window.addEventListener('resize', func);

// Фикс фулскрин-блоков
// import './functions/fix-fullheight';

// Реализация бургер-меню
// import { burger } from './functions/burger';

// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';

// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();

// Реализация табов
import GraphTabs from 'graph-tabs';
if (document.querySelector('[data-tabs="tab"]')){
  const tabs = new GraphTabs('tab');
}
if (document.querySelector('[data-tabs="spheres-tab"]')){
  const tabsSlider = new GraphTabs('spheres-tab');

}

// Получение высоты шапки сайта (не забудьте вызвать функцию)
// import { getHeaderHeight } from './functions/header-height';

// Подключение плагина кастом-скролла
// import 'simplebar';

// Подключение плагина для позиционирования тултипов
// import { createPopper, right} from '@popperjs/core';
// createPopper(el, tooltip, {
//   placement: 'right'
// });

// Подключение свайпера
// import Swiper, {  } from 'swiper';
// Swiper.use([ ]);
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs, Scrollbar } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Thumbs, Scrollbar]);

const swiper = new Swiper('.gallery__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 8,
  breakpoints:{
    577: {

      spaceBetween: 30,
    },
  }
});

const examples = new Swiper('.examples__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  navigation: {
    nextEl: '.examples__arrow--next',
    prevEl: '.examples__arrow--prev',
  },
  breakpoints: {
    450: {

      slidesPerView: 2,
      spaceBetween: 20,
    },
    577: {
      slidesPerView: 3,
      spaceBetween: 22,

    },

    769: {
      slidesPerView: 4,
      spaceBetween: 22,

    },


  },

});

const otherItems = new Swiper('.hero-other-item__slider-js', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  navigation: {
    nextEl: '.hero-other-item--next',
    prevEl: '.hero-other-item--prev',
  },
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },

});



function TabsSliders() {
  let swiperDetails = document.querySelectorAll(".spheres-item__frames")
  let swiperPreviews = document.querySelectorAll(".spheres__thumbs-slider")
  swiperDetails.forEach((swiperDetail,index) => {
      let arrowNext = swiperPreviews[index].querySelector('.swiper-button-next')
      let arrowPrev = swiperPreviews[index].querySelector('.swiper-button-prev')
      let scrollBarElem = swiperPreviews[index].querySelector('.swiper-scrollbar')
      let swiperPreview = new Swiper(swiperPreviews[index], {
          spaceBetween: 6,
          slidesPerView: 'auto',
          freeMode: true,
          watchSlidesProgress: true,
          navigation: {
            nextEl: arrowNext,
            prevEl: arrowPrev,
          },
          scrollbar: {
            el: scrollBarElem,
            hide: false,
            draggable:true,
          },
          breakpoints: {

            769: {
              spaceBetween: 8,
            },

          },
      });
      swiperDetail = new Swiper(swiperDetails[index], {
      spaceBetween: 0,
      // navigation: {
      // nextEl: ".swiper-button-next",
      // prevEl: ".swiper-button-prev",
      // },
      thumbs: {
      swiper: swiperPreviews[index],
      },
  });
  })
}
TabsSliders()


const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
  let swiper;

  breakpoint = window.matchMedia(breakpoint);

  const enableSwiper = function(className, settings) {
    swiper = new Swiper(className, settings);

    if (callback) {
      callback(swiper);
    }
  }

  const checker = function() {
    if (breakpoint.matches) {
      return enableSwiper(swiperClass, swiperSettings);
    } else {
      if (swiper !== undefined) swiper.destroy(true, true);
      return;
    }
  };

  breakpoint.addEventListener('change', checker);
  checker();
}


resizableSwiper(
  '(max-width: 1250px)',
  '.spheres__list ',
  {
    // loop: true,
    spaceBetween: 18,
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  },

);

// var swiperThumbs = new Swiper(".spheres__thumbs-slider", {
//   spaceBetween: 8,
//   slidesPerView: 'auto',
//   freeMode: true,
//   watchSlidesProgress: true,
// });

// var swiperMain = new Swiper(".spheres-item__frames", {
//   spaceBetween: 10,
//   thumbs: {
//     swiper: swiperThumbs,

//   },
// });



// Подключение анимаций по скроллу
// import AOS from 'aos';
// AOS.init();

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');

// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

import { validateForms } from './functions/validate-forms';
const rules1 = [
  {
    ruleSelector: '.input--name',
    rules: [
      {
        rule: 'minLength',
        value: 3
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Это обязательное поле'
      }
    ]
  },
  {
    ruleSelector: '.input--phone-email',
    tel: false,
    telError: 'Это обязательное поле',
    rules: [
      {
        rule: 'minLength',
        value: 3
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Это обязательное поле'
      }
    ]
  },
];

const rules2= [
  {
    ruleSelector:".file-input__elem",
    rules:[
      {
        rule: 'files',
        value: {
          files: {
            extensions: ['jpeg', 'jpg', 'png', 'zip'],
            maxSize: 50000,
            types: ['image/jpeg', 'image/jpg', 'image/png'],
          },
        }
      }
    ]
  },
  {
    ruleSelector: '.input--phone-email',
    tel: false,
    telError: 'Это обязательное поле',
    rules: [
      {
        rule: 'minLength',
        value: 3
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Это обязательное поле'
      }
    ]
  },
];



const afterForm = () => {
  console.log('Произошла отправка, тут можно писать любые действия');
};
if (document.querySelector('.tell-project__form')){
  validateForms('.tell-project__form', rules1, afterForm);
}


if (document.querySelector('.photo-offer__form')){
  validateForms('.photo-offer__form', rules2, afterForm);
}
// Подключение библиотеки модальных окон Micromodal
import MicroModal from 'micromodal';
MicroModal.init({
  disableScroll: true,
  disableFocus:true,
});


import NiceSelect from "nice-select2";
if (document.getElementById("a-select")){
  new NiceSelect(document.getElementById("a-select"), {});
}

