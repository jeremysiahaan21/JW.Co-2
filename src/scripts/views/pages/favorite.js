import { LitElement, html, css } from 'lit';
import favoriteCatalogueDb from '../../data/favorite-catalogue-idb';

class Favorite extends LitElement {
  static properties = {
    data: { type: Object },
    dataSource: { type: String },
  };

  static styles = css`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.favorite__title{
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
a, button{
  min-width: 44px;
  min-height: 44px;
}
  `;

  async setData() {
    this.data = await favoriteCatalogueDb.getAllData();
  }

  notFoundTitle() {
    return html`
    <section class="favorite__title">
      <h2>You still don't have favorite restaurant, <a href="/" title="back to homepage">back to homepage</a></h2>
    </section>
    `;
  }

  render() {
    this.dataSource = 'favoriteIdb';
    if (this.data) {
      if (this.data.length === 0) {
        return html`${this.notFoundTitle()}`;
      }
      return html`
      <catalogue-list .data=${this.data} .dataSource=${this.dataSource}></catalogue-list>`;
    }
    return html`loading`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setData();
  }
}
customElements.define('list-favorite', Favorite);
export default Favorite;
