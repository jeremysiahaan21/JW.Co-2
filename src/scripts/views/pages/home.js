import { LitElement, html, css } from 'lit';
import DataCatalogueSource from '../../data/catalogue-data-source';

class Home extends LitElement {
  static properties = {
    data: { type: Object },
    dataSource: { type: String },
  };

  async setData() {
    this.data = await DataCatalogueSource.getCatalogueData();
  }

  static styles = css`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a, button{
    min-width: 44px;
    min-height: 44px;
  }
  .home__title{
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
  .waiting{
    padding: 5px;
    margin-top: 50px;
    text-align: center;
  }

  .dot {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #4b9cdb;
  }
  
  
  .container .dot:nth-last-child(1) {
    animation: jumpingAnimation 0.6s 0.1s ease-in infinite;
  }
  .container .dot:nth-last-child(2) {
    animation: jumpingAnimation 0.6s 0.2s ease-in infinite;
  }
  .container .dot:nth-last-child(3) {
    animation: jumpingAnimation 0.6s 0.3s ease-in infinite;
  }
  
  @keyframes jumpingAnimation {
    0 {
      transform: translate3d(0, 0,0);
    }
    50% {
      transform: translate3d(0, 15px,0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  .waiting h2{
    width: fit-content;
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  }

  @keyframes typing {
    0% {
      width: 20%;
    }
    20% {
      width: 24%;
    }
    100% {
      width: 24%
    }
  }

  @keyframes cursor {
    from, to { border-color: transparent }
    50% { border-color: orange; }
  }

  .data-error{
    background-color: #ff5a5a;
    padding: 5px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }
  .reload{
    border: none;
    background-color: transparent;
    text-decoration: underline;
    font-size: 14px;
    font-style: italic;
    align-self: flex-start;
    min-width: 44px;
    min-height: 44px;
  }
    `;

  render() {
    this.dataSource = 'API';
    if (!this.data) {
      return html`
    <div class="waiting container">
      <h2> Loading data 
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div> </h2>
    </div>
    `;
    }
    if (this.data.error) {
      return html`
      <div class="data-error">
        <h2> Loading data error: ${this.data.message}</h2>
      </div>
      `;
    }
    return html`
    <catalogue-list .data=${this.data} .dataSource=${this.dataSource}></catalogue-list>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setData();
  }
}
customElements.define('list-catalogue', Home);
export default Home;
