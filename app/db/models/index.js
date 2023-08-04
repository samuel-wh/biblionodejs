const { Author, AuthorSchema } = require('./author.model');
const { Publisher, PublisherSchema } = require('./publisher.model');
const { Book, BookSchema } = require('./book.model');
const { BookAuthor, BookAuthorSchema } = require('./book-author.model');

function setupModels(sequelize) {
  Author.init(AuthorSchema, Author.config(sequelize));
  Publisher.init(PublisherSchema, Publisher.config(sequelize));
  Book.init(BookSchema, Book.config(sequelize));
  BookAuthor.init(BookAuthorSchema, BookAuthor.config(sequelize));

  // Iniciar asociaciones
  Publisher.associate(sequelize.models);
  Book.associate(sequelize.models);
}

module.exports = setupModels;
