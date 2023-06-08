import axios from 'axios';
import API_ENDPOINT from '../globals/api-endpoint';

class DataCatalogueSource {
  static async getCatalogueData() {
    const response = await axios.get(`${API_ENDPOINT.HOME}`);

    return response.data;
  }

  static async getCatalogueDataById(id) {
    const response = await axios.get(`${API_ENDPOINT.DETAIL(id)}`);

    return response.data;
  }

  static async addRestaurantReview({ id, name, review }) {
    const response = await axios({
      url: API_ENDPOINT.ADD_REVIEW,
      method: 'post',
      data: {
        id,
        name,
        review,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;application/json',
      },
    });

    return response.data;
  }
}

export default DataCatalogueSource;
