import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';
import Swiper from 'swiper';
import { isMobile, isTablet, isDesktop } from './functions/check-viewport';

window.addEventListener('load', () => {
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



})
