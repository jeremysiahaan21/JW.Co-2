import { LitElement, html, css } from 'lit';

class CatalogueFavoriteList extends LitElement {
  static properties = {
    data: { type: Object },
  };

  static styles = [
    css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  img {
    display: block;
  }
  .catalogue-list-item{
    background-color: white;
    margin-top: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  
  /* catalogue column style */
  .catalogue-thumbnail{
    width: 100%;
    min-height: 200px;
    padding-top: 5px;
    background-position: center;
    display: grid;
    grid-template-rows: repeat(1, 1fr 4fr);
  }
  .catalogue-thumbnail__rating{
    gap: 0rem;
    background-color: rgba(171, 196, 170, 0.6);
    padding: 3px 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    justify-content: center;
    width: fit-content;
  }
  .catalogue-thumbnail__rating{
    text-align: center;
  }
  .catalogue-thumbnail__location{
    display: grid;
    align-items: flex-end;
  }
  .catalogue-content{
    padding: 16px 32px 32px 32px;
  }
  .catalogue-content__title{
    font-size: 24px;
    margin-top: 16px;
    transition: 0.3s opacity;
  }
  .catalogue-content__description{
    margin-top: 16px;
    font-size: 14px;
    line-height: 1.5em;
  }
  .catalogue-content__city{
    margin-top: 16px;
    font-size: 18px;
    font-weight: 1000;
    line-height: 1.5em;
    background: rgba(255,255,255,0.8);
    width: fit-content;
    padding: 0 10px;
  }
  `];

  render() {
    return this.catalogueItem(this.data);
  }

  catalogueItem = (data) => html`
  <article class="catalogue-list-item" id="${data.id}" tabindex="0">
    <div class="catalogue-thumbnail" style="background-image: url(${data.pictureId});">
        <div class="catalogue-thumbnail__rating">
            <h2 class="catalogue-thumbnail__rating-value">${data.rating}</h2>
        </div>
        <div class="catalogue-thumbnail__location">
          <p class="catalogue-content__city">Location: ${data.city}</p>
        </div>
    </div>
    <div class="catalogue-content">
        <h2 class="catalogue-content__title">${data.name}</h2>
        <p class="catalogue-content__description">${data.description}</p>
    </div>
  </article>`;
}

customElements.define('catalogue-favorite', CatalogueFavoriteList);
export default CatalogueFavoriteList;
