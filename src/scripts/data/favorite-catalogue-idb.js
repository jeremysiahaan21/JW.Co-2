import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const favoriteCatalogueDb = {
  async getDataById(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllData() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async putData(restaurant) {
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },

  async deleteDataById(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default favoriteCatalogueDb;
