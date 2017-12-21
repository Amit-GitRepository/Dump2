import {AsyncStorage} from 'react-native';

const dbName = 'iService';

class LocalStorage {
  getItem (itemID) {
    return AsyncStorage.getItem(`@${dbName}:${itemID}`).then((json) =>
      JSON.parse(json)
    );
  }

  setItem (itemID, item) {
    return AsyncStorage.setItem(`@${dbName}:${itemID}`, JSON.stringify(item));
  }

  updateItem (itemID, item) {
    return AsyncStorage.mergeItem(`@${dbName}:${itemID}`, JSON.stringify(item));
  }

  // pass the items show be in format for [k1, v1], [k2, v2]
  multiSetItem (...items) {
    const data = [];
    items.forEach((item, index) => {
      data[index] = [`@${dbName}:${item[0]}`, JSON.stringify(item[1])];
    });
    return AsyncStorage.multiSet(data);
  }

  // returns the items in format of [v1, v2]
  multiGetItem (itemIDs) {
    itemIDs.forEach((itemID, index) => {
      itemIDs[index] = `@${dbName}:${itemID}`;
    });
    return AsyncStorage.multiGet(itemIDs).then((data) => {
      data.forEach((item, index) => {
        data[index] = JSON.parse(item[1]);
      });
      return data;
    });
  }
}

const localStorage = new LocalStorage();

export default localStorage;
