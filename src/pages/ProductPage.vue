<template>
    <div>
        <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <a class="header__logo" href="#">
        <img src="img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
      </a>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <a class="header__cart" href="cart.html" aria-label="Корзина с товарами">
        <svg width="19" height="24">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">3</span>
      </a>  
    </div>
  </header>

  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
            Носки
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Носки с принтом мороженое
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" src="img/product-square-1.jpg" srcset="img/product-square-1@2x.jpg 2x" alt="Название товара">
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/product-square-2.jpg" srcset="img/product-square-2@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/product-square-3.jpg" srcset="img/product-square-3@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: 150030</span>
        <h2 class="item__title">
          Смартфон Xiaomi Mi Mix 3 6/128GB
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              
              <b class="item__price">
                18 990 ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" value="blue" checked="">
                      <span class="colors__value" style="background-color: #73B6EA;">
                      </span>
                    </label>
                  </li>
                  <li class="colors__item">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" value="yellow">
                      <span class="colors__value" style="background-color: #FFBE15;">
                      </span>
                    </label>
                  </li>
                  <li class="colors__item">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" value="gray">
                      <span class="colors__value" style="background-color: #939393;">
                    </span></label>
                  </li>
                </ul>
              </fieldset>


              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category">
                    <option value="value1">37-39</option>
                    <option value="value2">40-42</option>
                    <option value="value3">42-50</option>
                  </select>
                </label>
              </fieldset>
            </div>
            
            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>
          
          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>
        
          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>
  
        </div>
      </div>
    </section>
  </main>

  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li>
          <a class="footer__link" href="#">
            Каталог
          </a>
        </li>
        <li>
          <a class="footer__link" href="tel:88006009009">
            8 800 600 90 09
          </a>
        </li>
        <li>
          <a class="footer__link" href="mailto:hi@technozavrrr.com">
            hi@technozavrrr.com
          </a>
        </li>
        <li>
          <a class="footer__link" href="#">
            Распродажа
          </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium" href="#">
            Заказать звонок
          </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Вконтакте">
            <svg width="20" height="11" fill="currentColor">
              <use xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Инстаграм">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-insta"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Facebook">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Twitter">
            <svg width="17" height="14" fill="currentColor">
              <use xlink:href="#icon-twitter"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Telegram">
            <svg width="19" height="17" fill="currentColor">
              <use xlink:href="#icon-telegram"></use>
            </svg>
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ, 
        в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.
      </p>
      
      <ul class="footer__data">
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright">
        © 2020 Moire
      </span>
    </div>
  </footer>
    </div>
</template>
<script>
export default {
    
}
</script>