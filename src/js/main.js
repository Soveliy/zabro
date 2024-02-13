import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';
import Swiper from 'swiper';
import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
window.addEventListener('load', () => {
  const accordeonInit = function(){
    const accordeon = document.querySelector('.accordeon')
    const buttons = accordeon.querySelectorAll('.accordeon__head')
    buttons.forEach(button => {

      button.addEventListener('click', () => {

        // buttons.forEach(otherButton => {
        //   if (otherButton !== button) {
        //     otherButton.parentElement.classList.remove('js-active');
        //   }
        // });

        // if (!button.parentElement.classList.contains('js-active')){

        // }
        button.parentElement.classList.toggle('js-active')

      })
    })
  }
  accordeonInit()

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


  const mobileMenuItems = mobileMenu.querySelectorAll('.main-menu__item--parent > a,.submenu__item--is-parent > a')
  console.log(mobileMenuItems)
  mobileMenuItems.forEach(mobileMenuItem  => {
    mobileMenuItem.addEventListener('click', (e) => {
      e.preventDefault();
      mobileMenuItem.parentElement.classList.toggle('is-open')
    })
  })
  window.addEventListener('resize', isMobile);

  const anyTabsItems = document.querySelectorAll('.any-type .tabs__nav-btn')
  if (anyTabsItems.length > 0){
    anyTabsItems.forEach(anyTabsItem => {
      if (anyTabsItem.innerText.length < 9){
        anyTabsItem.parentNode.classList.add('tabs__nav-item--lit')
      }
    })
  }

  // При необходимости можно добавить обработчик события клика на миниатюру для переключения
  // swiperThumbs.on('click', function () {
  //   // Пример: при клике на миниатюру, перейти к соответствующему слайду в основном слайдере
  //   swiperMain.slideTo(swiperThumbs.clickedIndex);
  //   swiperThumbs.slideTo(swiperThumbs.clickedIndex);
  // });



})
