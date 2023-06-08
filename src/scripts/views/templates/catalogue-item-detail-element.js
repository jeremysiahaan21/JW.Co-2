import { LitElement, html, css } from 'lit';
import CatalogueDataSource from '../../data/catalogue-data-source';
import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';
import LikeCatalogueItemInitiator from '../../utils/like-catalogue-item-initiator';

class CatalogueItemDetail extends LitElement {
  static properties = {
    data: { type: String },
    isFavorited: { type: Boolean },
  };

  static styles = css`
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    a, button, input, textarea{
      min-width: 44px;
      min-height: 44px;
      display: inline-block;
    }
    .detail{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-top: 15px;
        border-radius: 10px;
    }
    .content{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-start: 1;
      grid-column-end: 7;
    }
    section{
      padding: 5px;
    }
    button, a{
      cursor: pointer;
      min-width: 44px;
      min-height: 44px;
    }
    .info{
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
      display: grid;
      grid-template-columns: repeat(1, 1fr 2fr);
      gap: 25px;
    }
    section > span{
      background-color: #F3DEBA;
      padding: 5px;
      border: 1px solid gray;
    }
    span[class*="title"] {
      font-size: 0.8em;
      font-weight: bold;
      border-bottom: 2px solid white;
    }
    .info__image {
      grid-column-start: 1;
      grid-column-end: 3;
      display: grid;
    }
    .info__image img{
      border: 1px solid gray;
      margin: auto;
      width: 250px;
    }
    .info__content h2{
      font-size: 1em;
    }
    .info .info__utils, .info .info__description, .service .service__menu, .review .review__form{
      display: grid;
      grid-template-rows: repeat(1, 1fr 6fr);
    }
    .info__content p{
      font-size: 0.7em;
      padding-top: 5px;
    }
    .info .info__rating{
      padding: 10px;
    }
    #reviewButton{
        background-color: transparent;
        border: none;
        font-size: 0.8em;
    }
    .service{
      display: grid;
      grid-template-rows: repeat(1, 1fr);
      padding: 5px;
      gap: 10px;
      grid-column-start: 1;
      grid-column-end: 3;
    }

    .service .service__content{
      display: inline-block;
      margin-top: 15px;
    }
    .service__content h4{
      margin-top: 5px;
    }
    .service__menus{
      display: inline-block;
      min-width: 50px;
      text-align: center;
      padding: 5px;
      border-radius: 50px;
      margin: 5px 10px;
    }
    .foods {
      background-color: #f2b203;
    }
    .drinks {
      background-color: #34e0a1;
    }
    .review{
      display: grid;
      grid-column-start: 1;
      grid-column-end: 3;
    }

    .review__content{
      dispay: grid;
      grid-column-start: 1;
      grid-column-end: 3;
      width: 100%;
    }

    .review__list{
      margin-top: 10px;
      display: grid;
      border-top: 2px solid #dcb96e;
    }
  
    .review__list-content{
        padding: 5px;
        margin-bottom: 10px;
    }
    .review__list-content{
      border-bottom: 1px solid white;
    }
    .review__list-content .review__name{
      font-size: 1.2em;
  }
    .review__list-content .review__date{
        color: grey;
        font-size: 0.8em;
    }
    .review__list-content .review__description{
      font-size: 1em;
  }
  
    .review__content-form{
      display: grid;
      grid-column-start: 1;
      grid-column-end: 3;
      padding: 5px;
      width: 100%;
    }
    input[type=text], textarea{
      padding-left: 5px;
    }
    input[type=submit] {
      max-width: 100px;
      margin-top: 10px;
    }
    .like {
      font-size: 18px;
      position: fixed;
      bottom: 16px;
      right: 16px;
      background-color: #db0000;
      color: white;
      border: 0;
      border-radius: 50%;
      width: 55px;
      height: 55px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: 50%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .heart-line{
      background-image: url(./images/icon/heart-regular-line.svg)
    }
    .heart{
      background-image: url(./images/icon/heart-solid.svg);
    }

    @media screen and (min-width: 550px) {
      .info__image img {
        width: 300px
      }
    }
    @media screen and (min-width: 700px) {
      .info__image img {
        width: 400px
      }
      span[class*="title"] {
        font-size: 1em;
      }
      .info__content h2{
        font-size: 1.5em;
      }
      .info__content p{
        font-size: 1em;
      }
    }
    @media screen and (min-width: 800px) {
      .info__image img {
        width: 600px
      }
    }
    @media screen and (min-width: 1000px) {
      .info__image img {
        width: 800px
      }
      span[class*="title"] {
        font-size: 1.2em;
      }
      .info__content h2{
        font-size: 2em;
      }
      .info__content p{
        font-size: 1.2em;
      }
    }
    `;

  async _setData() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.data = await CatalogueDataSource.getCatalogueDataById(url.id);
  }

  render() {
    const { restaurant } = this.data;
    return html`
        ${this._detailRestaurantTemplate(restaurant)}
        `;
  }

  _detailRestaurantTemplate(restaurant) {
    return html`
    <article class="detail" id="detail-${restaurant.id}">
        <section class="content">
          <section class="info__image">
            <img src="${CONFIG.BASE_IMAGE_URL.medium}/${restaurant.pictureId}" alt="">
          </section>
          <section class="info">
            <span class="info__utils">
              <span class="info__title">
                <p>Name and Location</p>
              </span>
              <span class="info__content">
                <h2>${restaurant.name}</h2>
                <h4> Tags: ${this._renderTags(restaurant.categories)}</h4>
                <p>Address: ${restaurant.address} - ${restaurant.city}</p>
                <p>Rating: ${restaurant.rating}</p>
              </span>
            </span>
            <span class="info__description">
              <span class="info__title">
                <p>Description Detail</p>
              </span>
              <span class="info__content">
                <p>${restaurant.description}</p>
              </span>
            </span>
          </section>
          <section class="service">
            <span class="service__menu">
              <span class="service__title">
                <p>Menu</p>
              </span>
              <span class="service__content">
                <h4> Makanan </h4>
                ${restaurant.menus.foods.map((food) => html`<span class="service__menus foods">${food.name}</span>`)}
                <h4> Minuman </h4> 
                ${restaurant.menus.drinks.map((drink) => html`<span class="service__menus drinks">${drink.name}</span>`)}
              </span>
            </span>
          </section>
          <section class="review">
            <span class="review__content">
              <span class="review__form" id="reviewForm">
              <span class="review__title">
                <p>${restaurant.customerReviews.length} Review(s)</p>
              </span>
              <span>
                <form class="review__content-form">
                  <label for="name">Name</label>
                  <input required type="text" id="reviewerName" name="name" maxlength="100" title="Enter your full name here">
                  <label for="review">Your review</label>
                  <textarea required name="review" id="reviewerText" title="Enter your review here"></textarea>
                  <input type="submit" value="Submit" @click=${this._addReview}>
                </form>
              </span>
            </span>
            <span class="review__list">
              ${restaurant.customerReviews.map((customerReview) => html`
              <div class="review__list-content">
                <h4 class="review__name">${customerReview.name}</h4>
                <p class="review__date">${customerReview.date}</p>
                <p class="review__description">${customerReview.review}</p>
              </div>
              `)}
            </span>
            </span>
          </section>
        </section>
        ${this.renderFavoriteButton()}
      </article>
    `;
  }

  _renderTags(data) {
    let tags = '';
    data.forEach((tag) => {
      const index = data.indexOf(tag);
      if (index !== 0 || index % 2 !== 0) {
        tags += `| ${tag.name}`;
        return;
      }
      tags += `${tag.name} `;
    });
    return tags;
  }

  async _isFavorited() {
    const { id } = this.data.restaurant;
    this.isFavorited = await LikeCatalogueItemInitiator._isDataItemExist(id);
  }

  renderFavoriteButton() {
    const favoriteButton = () => html`
      <button aria-label="add this restaurant to favorite" id="likeButton" @click="${this._addToFavoriteButton}" class="like heart-line">
      </button>
    `;

    const favoritedButton = () => html`
    <button aria-label="remove this restaurant from favorite" id="likeButton" @click="${this._addToFavoriteButton}" class="like heart">
    </button>
    `;
    return this.isFavorited ? favoritedButton() : favoriteButton();
  }

  async _addToFavoriteButton() {
    await this._isFavorited();
    const { id } = this.data.restaurant;
    const btn = this.renderRoot.getElementById('likeButton');
    if (!this.isFavorited) {
      await LikeCatalogueItemInitiator._addToFavorite(this.data.restaurant);
      btn.classList.remove('heart-line');
      btn.classList.toggle('heart');
      return;
    }
    await LikeCatalogueItemInitiator._deleteFromFavorite(id);
    btn.classList.remove('heart');
    btn.classList.toggle('heart-line');
  }

  async _addReview(e) {
    e.preventDefault();
    const { id } = this.data.restaurant;
    const name = this.renderRoot.querySelector('#reviewerName').value;
    const review = this.renderRoot.querySelector('#reviewerText').value;
    const response = await CatalogueDataSource.addRestaurantReview({ id, name, review });
    if (response.error) {
      // eslint-disable-next-line no-alert
      alert('Gagal menambahkan review!');
    }
    window.location.reload();
  }

  connectedCallback() {
    super.connectedCallback();
    this._isFavorited();
    this._setData();
  }
}
customElements.define('restaurant-detail', CatalogueItemDetail);
export default CatalogueItemDetail;
