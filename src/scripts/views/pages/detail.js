import { LitElement, html, css } from 'lit';
import DataCatalogueSource from '../../data/catalogue-data-source';
import UrlParser from '../../routes/url-parser';

class Detail extends LitElement {
  static properties = {
    data: { type: Object },
  };

  async setData() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.data = await DataCatalogueSource.getCatalogueDataById(url.id);
  }

  static styles = css`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }
  `;

  render() {
    if (this.data) {
      return html`
        <restaurant-detail .data=${this.data}></restaurant-detail>
      `;
    }
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setData();
  }
}

customElements.define('detail-catalogue', Detail);
export default Detail;
