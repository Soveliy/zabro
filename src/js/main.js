import './_vendor';
import './_functions';
import './_components';
import { isMobile, isTablet, isDesktop } from './functions/check-viewport';

window.addEventListener('load', () => {

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
  // Определение ширины экрана

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


  // При необходимости можно добавить обработчик события клика на миниатюру для переключения
  // swiperThumbs.on('click', function () {
  //   // Пример: при клике на миниатюру, перейти к соответствующему слайду в основном слайдере
  //   swiperMain.slideTo(swiperThumbs.clickedIndex);
  //   swiperThumbs.slideTo(swiperThumbs.clickedIndex);
  // });


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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.fixed-menu__link').forEach((link) => {
          let id = link.getAttribute('href').replace('#', '');
          console.log(id)
          if (id === entry.target.id) {
            link.classList.add('js-active');
          } else {
            link.classList.remove('js-active');
          }
        });
      } else {
          document.querySelectorAll('.fixed-menu__link').forEach((link) => {
          link.classList.remove('js-active');
        })
      }
    });
  }, {
    threshold: 0.35
  });

  document.querySelectorAll('.scroll-section').forEach(section => { observer.observe(section)} );

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



})
