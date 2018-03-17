const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:itemId', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders the item', async () => {
      const createdItem = await seedItemToDatabase();
      const response = await request(app).get('/items/' + createdItem._id);

      assert.equal(
        parseTextFromHTML(response.text, '#item-title'),
        createdItem.title
      );

      assert.equal(
        parseTextFromHTML(response.text, '#item-description'),
        createdItem.description
      );
    });
  });
});
