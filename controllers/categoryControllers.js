import db from "../config/db.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT * FROM public.categories order by id asc"
    );
    const categories = result.rows;

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getOneCategory = async (req, res, next) => {
  const categoryId = parseInt(req.params.id, 10);

  // Validasi id
  if (isNaN(categoryId)) {
    return res.status(400).json({
      message: "Invalid category id",
    });
  }
  try {
    const result = await db.query(
      "SELECT * FROM public.categories where id = $1",
      [categoryId]
    );

    // Cek data ditemukan atau tidak
    if (result.rowCount === 0 || !result) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const category = result.rows[0];
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const editCategory = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id, 10);

    // Validasi id
    if (isNaN(categoryId)) {
      return res.status(400).json({
        message: "Invalid category id",
      });
    }
    const result = await db.query("SELECT * FROM public.categories");
    const categories = result.rows;
    const category = await db.query(
      "SELECT * FROM public.categories where id = $1",
      [categoryId]
    );

    // Cek data ditemukan atau tidak
    if (category.rowCount === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      categories: categories,
      category: category.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const addCategory = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const queryCategory = `INSERT INTO categories (name, description)
     VALUES ($1, $2) RETURNING id`;

    const valueCategory = [name, description];

    await db.query(queryCategory, valueCategory);

    res.status(201).json({
      message: "Category successfully added",
    });
    //   res.render("pages/categories", { category, categories, title: "categories" });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  const categoryId = parseInt(req.params.id, 10);

  // Validasi id
  if (isNaN(categoryId)) {
    return res.status(400).json({
      message: "Invalid category id",
    });
  }
  try {
    const { name, description } = req.body;

    const query = `
      UPDATE categories
      SET
        name = $2,
        description = $3
      WHERE id = $1
      RETURNING id
    `;

    const values = [categoryId, name, description];

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const categoryId = parseInt(req.params.id, 10);

  // Validasi id
  if (isNaN(categoryId)) {
    return res.status(400).json({
      message: "Invalid category id",
    });
  }
  try {
    const result = await db.query(
      `DELETE FROM public.categories
          WHERE id = $1
          RETURNING id`,
      [categoryId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(201).json({
      message: "Category successfully deleted",
    });
  } catch (error) {
    // // PostgreSQL foreign key violation
    if (error.code === "23001") {
      return res.status(409).json({
        message:
          "Category cannot be deleted because it is still used by some books",
      });
    }

    next(error);
  }
};
