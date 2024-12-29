const path = require('path');

const uploadImagesMiddleware = (req, res, next) => {
  const author = req.params.author;
  const filePath = path.join(__dirname, '..', '..', 'frontend', 'public', 'uploads', author, 'receipts-imgs', req.url);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
};

module.exports = uploadImagesMiddleware;

