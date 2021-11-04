const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');

class DataStore {
  constructor (collectionName, defaultValue) {
    const adapter = new FileSync(path.resolve(`${__dirname}/db.json`));

    this.db = low(adapter);

    const defaultObj = {};

    defaultObj[collectionName] = defaultValue;

    this.db.defaults(defaultObj).write();
    this.collectionName = collectionName;
  }

  generateId () {
    return uuidv4();
  }

  getAll () {
    return this.db
      .get(this.collectionName)
      .value();
  }

  get (id) {
    return this.db
      .get(this.collectionName)
      .filter({ id })
      .value();
  }

  getBy (filterConditions) {
    let filteredRecords = this.db.get(this.collectionName);

    for (const [key, value] of Object.entries(filterConditions)) {
      if (!!value) {
        filteredRecords = filteredRecords.filter({ [key]: value });
      }
    }

    return filteredRecords.value();
  }

  insert (data) {
    this.db
      .get(this.collectionName)
      .push(data)
      .write();
  }

  update (id, data) {
    this.db
      .get(this.collectionName)
      .find({ id })
      .assign(data)
      .write();
  }

  remove (id) {
    this.db
      .get(this.collectionName)
      .remove({ id })
      .write();
  }
}

module.exports = DataStore;