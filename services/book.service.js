const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class BooksService {
  constructor() {}

  // Método para crear un libro y asociar los autores al libro
  async create(data) {
    // Crear el libro con los datos proporcionados
    const newBook = await models.Book.create(data);

    // Si se proporcionan 'authorIds', asociarlos con el libro recién creado
    if (data.authorIds && Array.isArray(data.authorIds)) {
      const bookAuthorsData = data.authorIds.map((authorId) => ({
        bookId: newBook.id,
        authorId,
      }));

      // Crear asociaciones entre el libro y los autores en la tabla 'books_authors'
      await models.BookAuthor.bulkCreate(bookAuthorsData);
    }

    return newBook;
  }

  // Método para eliminar un libro y sus asociaciones con autores
  async delete(id) {
    // Recuperar el libro por su ID
    const book = await this.findOne(id);

    // Eliminar todas las asociaciones entre el libro y los autores en la tabla 'books_authors'
    await models.BookAuthor.destroy({ where: { bookId: book.id } });

    // Eliminar el libro en sí de la tabla 'books'
    await book.destroy();

    return { rta: true };
  }

  // Método para buscar libros con opciones de paginación
  async find(query) {
    const options = {
      include: ['publisher', 'books_authors'], // Incluir la asociación con el modelo 'Publisher'
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const books = await models.Book.findAll(options);
    return books;
  }

  // Método para buscar un libro por su ID y obtener sus autores asociados
  async findOne(id) {
    const options = {
      include: ['books_authors', 'publisher'], // Incluir la asociación con el modelo 'Author' para obtener los autores del libro
      where: {},
    };
    const book = await models.Book.findByPk(id, options);
    if (!book) {
      throw boom.notFound('Libro no encontrado');
    }
    return book;
  }

  // Método para actualizar un libro y sus asociaciones con autores
  async update(id, changes) {
    // Recuperar el libro por su ID
    const book = await this.findOne(id);

    // Si se proporcionan 'authorIds' en los cambios, actualizar las asociaciones en la tabla 'books_authors'
    if (changes.authorIds && Array.isArray(changes.authorIds)) {
      const bookAuthorsData = changes.authorIds.map((authorId) => ({
        bookId: book.id,
        authorId,
      }));

      // Eliminar las asociaciones existentes entre el libro y los autores
      await models.BookAuthor.destroy({ where: { bookId: book.id } });

      // Agregar nuevas asociaciones entre el libro y los autores con on_update: 'CASCADE'
      await models.BookAuthor.bulkCreate(bookAuthorsData, {
        individualHooks: true,
      });
    }

    // Actualizar los atributos del libro
    const updatedBook = await book.update(changes);

    return updatedBook;
  }
}

module.exports = BooksService;
