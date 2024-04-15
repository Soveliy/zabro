import './_vendor';
import './_functions';
import './_components';
import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
import noUiSlider from 'nouislider';
import GraphTabs from 'graph-tabs';
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs, Scrollbar } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Thumbs, Scrollbar]);
import { validateForms } from './functions/validate-forms';
import MicroModal from 'micromodal';
import NiceSelect from "nice-select2";

window.addEventListener('load', () => {

  /* Шапка */

  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu')
  burger.addEventListener('click', () => {
    burger.classList.toggle('open')
    mobileMenu.classList.toggle('js-active')
    document.body.classList.toggle('js-hidden')
  })
  const shadowBtn = document.querySelector('.mobile-menu__shadow')
  if (shadowBtn){
    shadowBtn.addEventListener('click', () => {
      burger.classList.remove('open')
      mobileMenu.classList.remove('js-active')
      document.body.classList.remove('js-hidden')
    })
  }




    /* фунционал с табами для блока Дайте вашим клиентам больше причин для покупки */

    const spheresMob = function(){
      const accordeon = document.querySelector('.spheres')
      if (accordeon){
        const buttons = accordeon.querySelectorAll('.spheres__item--mobile')
        buttons.forEach(button => {

          button.addEventListener('click', () => {

            buttons.forEach(otherButton => {
              if (otherButton !== button) {
                otherButton.classList.remove('tabs__nav-btn--active');
                otherButton.nextElementSibling.classList.remove('tabs__panel--active');
              }
            });
            button.classList.toggle('tabs__nav-btn--active')
            button.nextElementSibling.classList.toggle('tabs__panel--active')




          })
        })
      }

    }
    spheresMob()
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



    const spheresTabsInit = () => {
      const spheresButtons = document.querySelectorAll('.tabs__nav-btn');
      const spheresBodys = document.querySelectorAll('.tabs__panel');
      const ajaxSuccessClass = 'ajax-success';

      const removeAllTabs = () => {
          spheresButtons.forEach((spheresButton, index) => {
              spheresButton.classList.remove('tabs__nav-btn--active');
              if (spheresBodys[index]) {
                  spheresBodys[index].classList.remove('tabs__panel--active');
              }
          });
      };

      const fetchData = (url, callback) => {
          fetch(url)
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.text();
              })
              .then(callback)
              .catch(error => console.error('Error fetching data:', error));
      };

      spheresButtons.forEach(spheresButton => {
          spheresButton.addEventListener('click', () => {
              const tabItem = document.querySelector(`.tabs__panel[data-tab-item="${spheresButton.dataset.tab}"]`);
              if (!spheresButton.classList.contains('tabs__nav-btn--active')) {
                  removeAllTabs();
              }

              if (!tabItem.classList.contains(ajaxSuccessClass)) {
                  fetchData('../ajax.html', response => {
                      const tempElement = document.createElement('div');
                      tempElement.innerHTML = response;
                      const newTab = tempElement.querySelector(`.tabs__panel[data-tab-item="${spheresButton.dataset.tab}"]`);
                      if (newTab) {
                          spheresBodys[spheresButton.dataset.tab - 1].innerHTML = newTab.innerHTML;
                          spheresBodys[spheresButton.dataset.tab - 1].classList.add('tabs__panel--active', ajaxSuccessClass);
                          spheresButton.classList.add('tabs__nav-btn--active');
                          TabsSliders()
                      } else {
                          console.error('Таб не найден');
                      }
                  });
              } else {
                  spheresButton.classList.add('tabs__nav-btn--active');
                  spheresBodys[spheresButton.dataset.tab - 1].classList.add('tabs__panel--active');
              }
          });
      });
  };
    spheresTabsInit()

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




     // Нам доверяют, кнопка раскрытия всех логотипов
    const confidenceBtn = document.querySelector('.js-confidence__btn');
    if (confidenceBtn) {
      const confidenceItems = document.querySelectorAll('.our-clients__item-container:nth-child(n +7)')
      const toggleVisibleItems = () => {
        confidenceItems.forEach(confidenceItem => {
          confidenceItem.classList.toggle('our-clients__item-container--js-active')
        })
        confidenceBtn.classList.toggle('js-hidden')
      }
      confidenceBtn.addEventListener('click', toggleVisibleItems)
    }


  /* Скрипт для блока FAQ */
  const accordeonInit = function(){
    const accordeon = document.querySelector('.accordeon')
    if (accordeon){
      const buttons = accordeon.querySelectorAll('.accordeon__head')
      buttons.forEach(button => {

        button.addEventListener('click', () => {

          buttons.forEach(otherButton => {
            if (otherButton !== button) {
              otherButton.parentElement.classList.remove('js-active');
            }
          });
          button.parentElement.classList.toggle('js-active')

        })
      })
    }

  }
  accordeonInit()


  // Реализация табов

  if (document.querySelector('[data-tabs="tab"]')){
    const tabs = new GraphTabs('tab');
  }
  // if (document.querySelector('[data-tabs="spheres-tab"]')){
  //   const tabsSlider = new GraphTabs('spheres-tab');

  // }






  const radios = document.querySelectorAll('.hero-price__radio input')
  if(radios.length > 0){
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if(radio.dataset.year){
          document.querySelector('.main-tarifs').classList.add('main-tarifs--year')
        } else {
          document.querySelector('.main-tarifs').classList.remove('main-tarifs--year')
        }
      })
    })
  }
  const mobileMenuItems = mobileMenu.querySelectorAll('.main-menu__item--parent > a,.submenu__item--is-parent > a')

  if(mobileMenuItems.length > 0){
    mobileMenuItems.forEach(mobileMenuItem  => {
      mobileMenuItem.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenuItem.parentElement.classList.toggle('is-open')
      })
    })
  }


  const tarifsBtns = document.querySelectorAll('.main-tarifs-item__info-head')
  if (tarifsBtns.length > 0) {
    tarifsBtns.forEach(tarifsBtn  => {
      tarifsBtn.addEventListener('click', () => {
        tarifsBtn.classList.toggle('is-open')
        if (tarifsBtn.classList.contains('is-open')){
          console.log( tarifsBtn.closest('.main-tarifs-item__inner').offsetHeight)
          tarifsBtn.closest('.main-tarifs-item__inner').style.minHeight = `${tarifsBtn.closest('.main-tarifs-item__inner').offsetHeight}px`
          tarifsBtn.closest('.main-tarifs-item').classList.add('is-abs')
        } else {
          setTimeout(() => {

            tarifsBtn.closest('.main-tarifs-item').classList.remove('is-abs')
            tarifsBtn.closest('.main-tarifs-item__inner').removeAttribute('style')

          }, 400);
        }

      })
    })
  }
  const tarifsMobileBtns = document.querySelectorAll('.main-tarifs-item__bottom-btn')
  if (tarifsMobileBtns.length > 0){
    tarifsMobileBtns.forEach(tarifsMobileBtn => {
      tarifsMobileBtn.addEventListener('click', () => {
        tarifsMobileBtn.previousElementSibling.classList.toggle('js-active')
        tarifsMobileBtn.classList.toggle('js-active')
        tarifsMobileBtn.nextElementSibling.classList.toggle('js-active')
        if(tarifsMobileBtn.classList.contains('js-active')){
          tarifsMobileBtn.querySelector('span').innerText = `${tarifsMobileBtn.dataset.openText}`
        } else {
          tarifsMobileBtn.querySelector('span').innerText = `${tarifsMobileBtn.dataset.closeText}`
        }
      })

    })
  }
  window.addEventListener('resize', isMobile);

  const anyTabsItems = document.querySelectorAll('.any-type .tabs__nav-btn')
  if (anyTabsItems.length > 0){
    anyTabsItems.forEach(anyTabsItem => {
      if (anyTabsItem.innerText.length < 9){
        anyTabsItem.parentNode.classList.add('tabs__nav-item--lit')
      }
    })
  }



  // считываем кнопку
  const goTopBtn = document.querySelector(".button-up--js");

  // обработчик на скролл окна
  window.addEventListener("scroll", trackScroll);
  // обработчик на нажатии
  goTopBtn.addEventListener("click", goTop);

  function trackScroll() {
    // вычисляем положение от верхушки страницы
    const scrolled = window.pageYOffset;
    // считаем высоту окна браузера
    const coords = document.documentElement.clientHeight;
    // если вышли за пределы первого окна
    if (scrolled > coords) {
      // кнопка появляется
      goTopBtn.classList.add("button-up--show");
    } else {
      // иначе исчезает
      goTopBtn.classList.remove("button-up--show");
    }
  }

  function goTop() {
    // пока не вернулись в начало страницы
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }



  // Функционал модалки с тарифами. Берём все значения из карточки и загоянем значения в модалку, а также в скрытые инпуты для бека
  const tariffBtns = document.querySelectorAll('[data-micromodal-trigger="rate-modal"]')
  tariffBtns.forEach(tariffBtn => {
    tariffBtn.addEventListener('click', () => {
      const tariffItem =  tariffBtn.closest('.main-tarifs-item');
      tariffBtn.closest('.main-tarifs-item')
      const radioBtn = document.querySelector('[data-year]')
      let price;
      const countItems = document.querySelector('.slider__input').value
      const name = tariffItem.querySelector('.main-tarifs-item__title')
      const modal = document.querySelector('#rate-modal')
      const modalPrice = modal.querySelector('.rate-info__price')
      const modalTariffName =  modal.querySelector('[data-rate]')
      const modalTariffCount =  modal.querySelector('[data-rate-value]')

      const modalSelect = modal.querySelector('.rate-info__select--mounth')
      const modalYear = modal.querySelector('.rate-info__select--year')
      if (radioBtn.checked){
        price = tariffItem.querySelector('.main-tarifs-item__price-year')
        modalSelect.classList.add('is-hidden')
        modalYear.classList.remove('is-hidden')
      } else {
        price = tariffItem.querySelector('.main-tarifs-item__price')
        modalSelect.classList.remove('is-hidden')
        modalYear.classList.add('is-hidden')
      }


      modalTariffName.innerHTML = `«${name.dataset.tariffName}»`;
      if (price) {
        modalPrice.innerHTML = `${price.dataset.tariffPrice}`;
      } else {
        modalPrice.innerHTML = '0 ₽'
      }

      modalTariffCount.innerHTML = `${countItems}`;
    })
  })



  // Фиксированное меню в ценах.

  const sections = document.querySelectorAll('.scroll-section');
  const navLinks = document.querySelectorAll('.fixed-menu__link');

  function activateMenuLink(id) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('js-active');
      } else {
        link.classList.remove('js-active');
      }
    });
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
    );
  }

  function handleScroll() {
    let activeSectionId = null;

    sections.forEach(sec => {
      const id = sec.getAttribute('id');
      if (isInViewport(sec)) {
        activeSectionId = id;
      }
    });

    if (activeSectionId) {
      activateMenuLink(activeSectionId);
    } else {
      // Если ни одна секция не видна, то удаляем активный класс у всех ссылок меню
      navLinks.forEach(link => {
        link.classList.remove('js-active');
      });
    }
  }

  if (navLinks.length && sections.length) {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('DOMContentLoaded', handleScroll);
  }
  // const dragDrop = () => {

  //   const jsDrags = document.querySelectorAll('.file-input');
  //   if (!jsDrags?.length) return;

  //   jsDrags.forEach((jsDrag) => {

  //         function $class(classElem) {
  //            return jsDrag.querySelector(classElem);
  //         }

  //         /* вывод сообщений */
  //         function Output(msg) {
  //            let m = $class(".file-input__name");
  //            m.innerHTML = msg
  //         }

  //         /* проверка поддержки API */
  //         if (window.File && window.FileList && window.FileReader) {
  //            Init();
  //         }
  //         /* инициализация */
  //         function Init() {
  //            let fileselect = $class(".file-input__elem"),
  //                filedrag = $class(".file-input__wrap");


  //                  /* выбор файла */
  //                  fileselect.addEventListener("change", FileSelectHandler, false);

  //                  /* проверка поддержки XHR2 */
  //                  let xhr = new XMLHttpRequest();
  //                  if (xhr.upload) {
  //                     /* сброс файла */
  //                     jsDrag.addEventListener("dragover", FileDragHover, false);
  //                     jsDrag.addEventListener("dragleave", FileDragHover, false);
  //                     jsDrag.addEventListener("drop", FileSelectHandler, false);
  //                     // filedrag.style.display = "block";



  //                  }
  //         }

  //         // Файл над нужной областью
  //         function FileDragHover(e) {
  //            e.stopPropagation();
  //            e.preventDefault();
  //            // e.currentTarget.classList.add("isHover")
  //            if (e.type == "dragover"){
  //             console.log(e)
  //               e.currentTarget.closest('.file-input').classList.add("isHover")
  //            } else{
  //               e.currentTarget.closest('.file-input').classList.remove("isHover")
  //            }

  //         }
  //         function clearInputValue(e){
  //            e.target.value = null;
  //            if (e.target.files){
  //               e.target.files = null;
  //            }
  //            if (e.dataTransfer?.files){
  //               e.dataTransfer.clearData();
  //               // e.dataTransfer.files = null;
  //            }
  //         }

  //         // выбор файла
  //         function FileSelectHandler(e) {
  //             // e.closest('.filegrag').classList.remove('isError')
  //           //  $(e.currentTarget).closest(".filedrag").removeClass("isError")
  //            FileDragHover(e);
  //            console.log(e.currentTarget.value)
  //            let files = e.target.files || e.dataTransfer.files;
  //            console.log(files)
  //            if (files.length > 1){
  //               const filesDataTransfer = new DataTransfer();
  //               filesDataTransfer.items.add(files[0]);
  //               e.target.files = filesDataTransfer.files;
  //               files = e.target.files;
  //            }


  //            if (files[0].size > 10485760){
  //               $(e.currentTarget).closest(".filedrag").addClass("isError")
  //               Output(
  //                  "<div class='fileDrop__error'>Файл слишком большой</div>"
  //               )

  //               clearInputValue(e);
  //               return

  //            }

  //            // парсим все объекты типа File
  //            for (const file of files) {


  //               ParseFile(file);

  //            }
  //           // $(e.currentTarget).closest(".filedrag").addClass("isLoaded")
  //         }

  //         function ParseFile(file) {
  //             console.log(jsDrag)
  //            Output(
  //               "<span class='file-input__desc'>" + file.name +"</span>"
  //            );
  //         }



  //   })


  // };
  // dragDrop()


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
    const slider = document.querySelector('.slider')
    const inputValue = document.querySelector('.slider__input').value; // Ищем input с меньшим значнием
    const TariffItems = document.querySelectorAll('.main-tarifs-item')
    const TariffsBtns = document.querySelectorAll('[data-micromodal-trigger="rate-modal"]')

    TariffItems.forEach(TariffItem => {
      TariffItem.classList.remove('js-active')
    })
    if (inputValue <= 3){
      TariffsBtns[0].removeAttribute('disabled', '')
      TariffItems[0].classList.add('js-active')
      slider.className = "hero-price__slider slider slider--1"


    } else if (inputValue > 3 && inputValue <= 50){
      TariffsBtns[0].setAttribute('disabled', '')
      TariffsBtns[1].removeAttribute('disabled', '')
      TariffItems[1].classList.add('js-active')
      slider.className = "hero-price__slider slider slider--2"
    } else {
      TariffsBtns[0].setAttribute('disabled', '')
      TariffsBtns[1].setAttribute('disabled', '')
      TariffItems[2].classList.add('js-active')
      slider.className = "hero-price__slider slider slider--3"
    }
  }
  init()


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







// Правила для валидации
  const rules1 = [
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
    validateForms('.photo-offer__form', rules1, afterForm);
  }

  // Инициализация модалок
  MicroModal.init({
    disableScroll: true,
    disableFocus:true,
  });


  // Найс селект
  if (document.getElementById("a-select")){
    new NiceSelect(document.getElementById("a-select"), {});
  }


})
