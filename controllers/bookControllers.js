import db from "../config/db.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM public.books order by id");
    const books = result.rows;

    res.status(200).json(books);
    //   res.render("pages/books", { books, title: "books" });
  } catch (error) {
    next(error);
  }
};

export const getOneBook = async (req, res, next) => {
  try {
    const bookId = parseInt(req.params.id, 10);

    // Validasi id
    if (isNaN(bookId)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    const result = await db.query("SELECT * FROM public.books where id = $1", [
      bookId,
    ]);

    // Cek data ditemukan atau tidak
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const book = result.rows[0];

    res.status(200).json(book);
    //   res.render("pages/books", { books, title: "books" });
  } catch (error) {
    next(error);
  }
};

export const editBook = async (req, res, next) => {
  try {
    const bookId = parseInt(req.params.id, 10);

    // Validasi id
    if (isNaN(bookId)) {
      return res.status(400).json({
        message: "Invalid book id",
      });
    }

    const result = await db.query("SELECT * FROM public.books");
    const books = result.rows;
    const book = await db.query("SELECT * FROM public.books where id = $1", [
      bookId,
    ]);

    // Cek data ditemukan atau tidak
    if (book.rowCount === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      books: books,
      book: book.rows[0],
    });
    //   res.render("pages/books", { book, books, title: "books" });
  } catch (error) {
    next(error);
  }
};

export const addBook = async (req, res, next) => {
  const {
    title,
    isbn,
    author,
    publisher,
    publication_year,
    category_id,
    total_stock,
    available_stock,
  } = req.body;
  try {
    const queryBook = `INSERT INTO books
    (   title,
        isbn,
        author,
        publisher,
        publication_year,
        category_id,
        total_stock,
        available_stock
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

    const valueBook = [
      title,
      isbn,
      author,
      publisher,
      publication_year,
      category_id,
      total_stock,
      available_stock,
    ];

    await db.query(queryBook, valueBook);

    res.status(201).json({
      message: "Book successfully added",
    });
    //   res.render("pages/books", { book, books, title: "books" });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id, 10);

  // Validasi id
  if (isNaN(bookId)) {
    return res.status(400).json({
      message: "Invalid book id",
    });
  }

  try {
    const {
      title,
      isbn,
      author,
      publisher,
      publication_year,
      category_id,
      total_stock,
      available_stock,
    } = req.body;

    // Validasi logika stok (opsional tapi sangat disarankan)
    if (available_stock > total_stock) {
      return res.status(400).json({
        message: "available_stock cannot be greater than total stock",
      });
    }

    const query = `
      UPDATE books
      SET
        title = $1,
        isbn = $2,
        author = $3,
        publisher = $4,
        publication_year = $5,
        category_id = $6,
        total_stock = $7,
        available_stock = $8,
        updated_at = NOW()
      WHERE id = $9
      RETURNING id
    `;

    const values = [
      title,
      isbn,
      author,
      publisher,
      publication_year,
      category_id,
      total_stock,
      available_stock,
      bookId,
    ];

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id, 10);

  // Validasi id
  if (isNaN(bookId)) {
    return res.status(400).json({
      message: "Invalid book id",
    });
  }
  try {
    const result = await db.query(
      `DELETE FROM public.books
          WHERE id = $1
          RETURNING id`,
      [bookId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(201).json({
      message: "Book successfully deleted",
    });
    // res.redirect("/books");
  } catch (error) {
    next(error);
  }
};
