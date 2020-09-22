const MongoLib = require('../lib/mongo');

class ContentService {
  constructor() {
    this.collection = 'content';
    this.mongoDB = new MongoLib();
  }

  async getContent({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const content = await this.mongoDB.getAll(this.collection, query);
    return content || [];
  }

  async createContent({ content }) {
    const createContentId = await this.mongoDB.create(this.collection, content)
    return createContentId;
  }

  async deleteContent({ contentId }) {
    const deleteContent = await this.mongoDB.delete(this.collection, contentId);
    return deleteContent;
  }
};

module.exports = ContentService;