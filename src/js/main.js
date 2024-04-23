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
    const initGallerySlider = () => {
      let gall = document.querySelectorAll('.gallerySlider')
      let gallerySlider = new Swiper(".galleryInside", {});
    }
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
          // swiperDetail = new Swiper(swiperDetails[index], {
          //     spaceBetween: 0,
          //     // navigation: {
          //     // nextEl: ".swiper-button-next",
          //     // prevEl: ".swiper-button-prev",
          //     // },
          //     thumbs: {
          //     swiper: swiperPreviews[index],
          //     },
          // });
      })
    }
    TabsSliders()



    const spheresTabsInit = () => {
      const spheresButtons = document.querySelectorAll('.tabs__nav-btn');
      const spheresBodys = document.querySelectorAll('.tabs__panel');
      const ajaxSuccessClass = 'ajax-success';
      const ajaxUrlItem = document.querySelector('[data-ajax-spheres]')
      if (spheresButtons.length > 0 && spheresBodys.length > 0 && ajaxUrlItem){

       const ajaxUrl = ajaxUrlItem.dataset.ajaxSpheres;

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
              const ajaxId = spheresButton.dataset.tab
              if (!tabItem.classList.contains(ajaxSuccessClass)) {
                  fetchData(`${ajaxUrl}?id=${ajaxId}`, response => {
                      const tempElement = document.createElement('div');
                      tempElement.innerHTML = response;
                      const newTab = tempElement.querySelector(`.tabs__panel[data-tab-item="${spheresButton.dataset.tab}"]`);
                      if (newTab) {
                          spheresBodys[spheresButton.dataset.tab - 1].innerHTML = newTab.innerHTML;
                          spheresBodys[spheresButton.dataset.tab - 1].classList.add('tabs__panel--active', ajaxSuccessClass);
                          spheresButton.classList.add('tabs__nav-btn--active');

                          ajaxTabs()
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
      }

    };
    const ajaxTabs = () => {
      const tabs = document.querySelectorAll('[data-cst-tabs]');
      if (tabs.length > 0){
        tabs.forEach(tab => {

          const tabId = tab.dataset.cstTabs; // Получаем уникальный идентификатор набора табов
          const tabHeaders = tab.querySelectorAll('[data-cst-tabs-button]');
          const tabBodies = tab.querySelectorAll('[data-cst-tabs-body]');
          const ajaxUrl = tab.dataset.ajax
          const ajaxSuccessClass = 'ajax-success';

          const removeAllTabs = () => {
              tabHeaders.forEach(tabHeader => {
                  tabHeader.classList.remove('js-active'); // Заменяем 'active' на 'js-active'
              });
              tabBodies.forEach(tabBody => {
                  tabBody.classList.remove('js-active');
                  const video = tabBody.querySelector('video'); // Получаем видео элемент
                  if (video) {
                      video.pause(); // Ставим видео на паузу
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

          tabHeaders.forEach((tabHeader, index) => {
              tabHeader.addEventListener('click', () => {
                  if (!tabHeader.classList.contains('js-active')) {
                      removeAllTabs();
                  }
                  const ajaxId = tabHeader.dataset.cstTabsButton;
                  const tabBody = tabBodies[index];
                  if (!tabBody.classList.contains(ajaxSuccessClass)) {
                      fetchData(`${ajaxUrl}?=${ajaxId}`, response => {
                          const tempElement = document.createElement('div');
                          tempElement.innerHTML = response;
                          const currentTab = tempElement.querySelector(`[data-cst-tabs="${tabId}"]`)
                          const newTabBody = currentTab.querySelector(`[data-cst-tabs-body="${tabHeader.dataset.cstTabsButton}"]`);

                          if (newTabBody) {
                              tabBody.innerHTML = newTabBody.innerHTML;
                              initGallerySlider()
                              tabBody.classList.add('js-active', ajaxSuccessClass);
                              tabHeader.classList.add('js-active');
                          } else {
                              console.error('Tab not found');
                          }
                      });
                  } else {
                      tabHeader.classList.add('js-active');
                      tabBody.classList.add('js-active');
                      const video = tabBody.querySelector('video'); // Получаем видео элемент
                      if (video) {
                          video.play();
                      }
                  }
              });
          });
      });
      }

  }

    ajaxTabs()
    spheresTabsInit()
    initGallerySlider()
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
  tariffBtns.forEach(tariffBtn =>{
    tariffBtn.addEventListener('click', () => {
      tariffModal(tariffBtn)
    })
  })



function tariffModal(tariffBtn){

  if (document.getElementById("a-select") && document.querySelectorAll('.nice-select').length == 0){
    new NiceSelect(document.getElementById("a-select"), {});
  }
  const modal = document.querySelector('#rate-modal')
  const modalPrice = modal.querySelector('.rate-info__price')
  const modalTariffName =  modal.querySelector('[data-rate]')
  const modalTariffCount =  modal.querySelector('[data-rate-value]')
  const modalSelect = modal.querySelector('.rate-info__select--mounth')
  const modalYear = modal.querySelector('.rate-info__select--year')
  const radioBtn = document.querySelector('[data-year]')
  const countItems = document.querySelector('.slider__input').value

  // Скрытые инпуты
  const tariffNameInput = document.querySelector('[data-tariff-name-hid]');
  const tariffCounterInput = document.querySelector('[data-tariff-counter-hid]');


  if (tariffBtn.classList.contains('main-tarifs-custom-price__btn')){
    modal.classList.add('isCustomTariff');
    const tariffCstTitle = document.querySelector('.main-tarifs-custom-price__pretitle');
    modalTariffName.innerHTML = `«${tariffCstTitle.innerText}»`;
    tariffNameInput.value = tariffCstTitle.innerText
  } else {
        // Найс селект


    modal.classList.remove('isCustomTariff')
    const tariffItem =  tariffBtn.closest('.main-tarifs-item');
    tariffBtn.closest('.main-tarifs-item')

    let price;

    const name = tariffItem.querySelector('.main-tarifs-item__title');



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
    tariffNameInput.value = name.dataset.tariffName;
    if (price) {
      modalPrice.innerHTML = `${price.dataset.tariffPrice}`;
    } else {
      modalPrice.innerHTML = '0 ₽'
    }

    modalTariffCount.innerHTML = `${countItems}`;
    tariffCounterInput.value = `${countItems}`;

  }

}

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
  const dragDrop = () => {
    const jsDrags = document.querySelectorAll('.file-input');
    if (!jsDrags?.length) return;

    function $class(classElem, context) {
        return (context || document).querySelector(classElem);
    }

    function Output(msg, context) {
        let m = $class(".file-input__name", context);
        if (!m) {
            m = document.createElement("div");
            m.classList.add("file-input__name");
            context.appendChild(m);
        }
        m.innerHTML = msg;
    }

    jsDrags.forEach((jsDrag) => {
        if (window.File && window.FileList && window.FileReader) {
            Init();
        }

        function Init() {
          let fileselect = $class(".file-input__elem", jsDrag),
              filedrag = $class(".file-input__wrap", jsDrag),
              removeBtn = $class('.file-input__again', jsDrag);

          // Добавляем обработчик для кнопки "Очистить"
          removeBtn.addEventListener('click', () => {
              jsDrag.classList.remove("file-input--error");
              jsDrag.classList.remove("isHover");
              clearInputValue();
          });

          fileselect.addEventListener("change", FileSelectHandler, false);

          let xhr = new XMLHttpRequest();
          if (xhr.upload) {
              filedrag.addEventListener("dragover", FileDragHover, false);
              filedrag.addEventListener("dragleave", FileDragHover, false);
              filedrag.addEventListener("drop", FileSelectHandler, false);
          }

          // Добавим обработчики для нативного drag and drop
          filedrag.addEventListener("dragover", FileDragHover, false);
          filedrag.addEventListener("dragleave", FileDragHover, false);
          filedrag.addEventListener("drop", FileSelectHandler, false);
      }

        function FileDragHover(e) {
            e.stopPropagation();
            e.preventDefault();
            if (e.type == "dragover") {
                jsDrag.classList.add("isHover");
            } else {
                jsDrag.classList.remove("isHover");
            }
        }

        function clearInputValue(e) {
            e.target.value = null;
            e.target.files = null;
            if (e.dataTransfer) {
                e.dataTransfer.clearData();
            }
        }

        function FileSelectHandler(e) {
          FileDragHover(e);
          let files = e.target.files || e.dataTransfer.files;

          // Убеждаемся, что выбран только один файл, если было выбрано несколько
          if (files.length > 1) {
              const filesDataTransfer = new DataTransfer();
              filesDataTransfer.items.add(files[0]);
              e.target.files = filesDataTransfer.files;
              files = e.target.files;
          }

          for (const file of files) {
              if (file.size > 52428800) {
                  jsDrag.classList.add("file-input--error");
                  Output("<div class='fileDrop__error'>Файл слишком большой</div>", jsDrag);
                  clearInputValue(e);
                  return;
              }
              if (!isValidFileType(file)) {
                  jsDrag.classList.add("file-input--error");
                  Output("<div class='fileDrop__error'>Неподдерживаемый тип файла</div>", jsDrag);
                  clearInputValue(e);
                  return;
              }
              ParseFile(file);
          }
      }


      function isValidFileType(file) {
        // Разделим принятые типы файлов и приведем к нижнему регистру для сравнения без учета регистра
        const acceptedTypes = $class(".file-input__elem", jsDrag).accept
                                .split(',')
                                .map(type => type.trim().toLowerCase());

        // Получим расширение файла и проверим, есть ли оно в принятых типах
        const fileExtension = file.name.split('.').pop().toLowerCase();
        return acceptedTypes.includes(`.${fileExtension}`);
    }

        function ParseFile(file) {
            let successElem = $class(".file-input__success", jsDrag);
            if (!successElem) {
                successElem = document.createElement("div");
                successElem.classList.add("file-input__success");
                jsDrag.appendChild(successElem);
            }

            successElem.innerHTML = "<b>Файл загружен:</b> <br>" + file.name;

            // Создаем кнопку удаления файла
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Удалить";
            deleteButton.classList.add("file-input__delete");
            deleteButton.addEventListener("click", () => {
                successElem.remove();
                deleteButton.remove();
                jsDrag.classList.remove("file-input--success");
                clearInputValue(e);
            });

            // Добавляем кнопку рядом с названием файла
            jsDrag.classList.add('file-input--success')
            successElem.appendChild(deleteButton);
        }
    });
};

// Где-то в вашем скрипте вызовите функцию
dragDrop();


  const rangeSliderInit = () => { // создаем функцию инициализации слайдера
    const range = document.querySelector('.slider__range'); // Ищем слайдер
    const input = document.querySelector('.slider__input'); // Ищем input с меньшим значнием
    const maxValue = +input.dataset.max;
    console.log(maxValue)
    if (!range || !input) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

    const inputs = [input]; // создаем массив из меньшего и большего значения



    noUiSlider.create(range, { // инициализируем слайдер
        start: [0], // устанавливаем начальные значения

        // tooltips: true,
        connect: [true, false],
        range: {
          'min': 0,
          '10%': maxValue * 0.1,
          '20%': maxValue * 0.2,
          '30%': maxValue * 0.3,
          '40%': maxValue * 0.4,
          '50%': maxValue * 0.5,
          '60%': maxValue * 0.6,
          '70%': maxValue * 0.7,
          '80%': maxValue * 0.8,
          '90%': maxValue * 0.9,
          'max': maxValue
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
    const slider = document.querySelector('.slider');
    const inputValue = parseInt(document.querySelector('.slider__input').value);
    const TariffItems = document.querySelectorAll('.main-tarifs-item');
    const TariffsBtns = document.querySelectorAll('.main-tarifs-item__btn');

    TariffItems.forEach((TariffItem, index) => {
        TariffItem.classList.remove('js-active');
    });

    TariffsBtns.forEach((btn, index) => {
        btn.removeAttribute('disabled');
    });

    const tariffRules = Array.from(TariffsBtns).map(item => {
        return {
            max: item.getAttribute('data-max-value'),
            activeIndex: item.getAttribute('data-active-index'),
            btnIndex: item.getAttribute('data-btn-index')
        };
    });

    for (let rule of tariffRules) {
       if (inputValue > 0 && inputValue <= rule.max){

            activateTariff(rule.activeIndex, rule.btnIndex);
            break;

       } else {
            TariffItems.forEach((TariffItem, index) => {
              TariffItem.classList.remove('js-active');
            });

       }
    }

    function activateTariff(activeIndex, btnIndex) {
      TariffItems[activeIndex].classList.add('js-active');
      slider.className = `hero-price__slider slider slider--${btnIndex}`;

      // Устанавливаем disabled для всех кнопок
      TariffsBtns.forEach(btn => {
          btn.setAttribute('disabled', '');
      });

      // Убираем disabled для текущей кнопки и всех следующих
      for (let i = btnIndex - 1; i < TariffsBtns.length; i++) {
          TariffsBtns[i].removeAttribute('disabled');
      }
  }

  };

// Вызовем функцию при изменении значения input

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
  if (document.querySelector('.modal-form')){
    validateForms('.modal-form', rules1, afterForm);
  }


  // Инициализация модалок
  MicroModal.init({
    disableScroll: true,
    disableFocus:true,
  });




})
