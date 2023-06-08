/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit';

class CatalogueListElement extends LitElement {
  static properties = {
    data: { type: Object },
    dataSource: { type: String },
  };

  static styles = css`
  :host{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin: 0 auto auto -32px;
    text-align: left;
  }
  @media screen and (min-width: 650px) {
    :host{
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
  }
  @media screen and (min-width: 1000px) {
    :host{
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
  }
  `;

  render() {
    if (this.dataSource === 'API') {
      return html`${this.data.restaurants.map((restaurant) => html`<catalogue-item .data=${restaurant}></catalogue-item>`)}`;
    }
    if (this.dataSource === 'favoriteIdb') {
      return html`${this.data.map((restaurant) => html`<catalogue-item .data=${restaurant}></catalogue-item>`)}`;
    }
    // eslint-disable-next-line no-return-assign
    return html`Data Source Not Found <a href="/" title="back to homepage"> back to homepage </a> `;
  }
}

customElements.define('catalogue-list', CatalogueListElement);

export default CatalogueListElement;
