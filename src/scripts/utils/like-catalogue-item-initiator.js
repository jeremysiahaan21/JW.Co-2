import favoriteCatalogueDb from '../data/favorite-catalogue-idb';

const LikeCatalogueItemInitiator = {
  async _isDataItemExist(id) {
    const catalogueItem = await favoriteCatalogueDb.getDataById(id);
    return !!catalogueItem;
  },

  async _addToFavorite(id) {
    await favoriteCatalogueDb.putData(id);
  },

  async _deleteFromFavorite(id) {
    await favoriteCatalogueDb.deleteDataById(id);
  },
};

export default LikeCatalogueItemInitiator;
