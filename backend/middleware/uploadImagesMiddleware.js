const path = require('path');

const uploadImagesMiddleware = (req, res, next) => {
  const author = req.params.author;
  const imageName = req.params[0];  // Извлекаем имя файла из запроса

  const filePath = path.join(__dirname, '..', 'uploads', 'users', author, 'recipe-imgs', imageName);

  console.log(filePath)

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
};

module.exports = uploadImagesMiddleware;

