import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';
import Swiper from 'swiper';

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



  // При необходимости можно добавить обработчик события клика на миниатюру для переключения
  // swiperThumbs.on('click', function () {
  //   // Пример: при клике на миниатюру, перейти к соответствующему слайду в основном слайдере
  //   swiperMain.slideTo(swiperThumbs.clickedIndex);
  //   swiperThumbs.slideTo(swiperThumbs.clickedIndex);
  // });



})
