const express = require('express');
const ContentService = require('../services/content');

function contentApi(app) {
  const router = express.Router();
  app.use('/api/content', router);

  const contentService = new ContentService();

  router.get('/', async (req, res,next) => {
    const { tags } = req.query;

    try {
      const content = await contentService.getContent({ tags });

      res.status(200).json({
        data: content,
        message: 'Content listed'
      });
    } catch (err) {
      next(err);
    };
  });

  router.post('/', async (req, res, next) => {
    const { body: content } = req;
    try {
      const createContentId = await contentService.createContent({ content });

      res.status(201).json({
        data: createContentId,
        message: 'Content created'
      });
    } catch (err) {
      next(err);
    };
  });

  router.delete('/:contentId', async (req, res, next) => {
    const { contentId } = req.params;
    try {
      const deletedContentId = await contentService.deleteContent({ contentId });

      res.status(200).json({
        data: deletedContentId,
        message: 'Content deleted'
      });
    } catch (err) {
      next(err);
    }
  })
};

module.exports = contentApi;