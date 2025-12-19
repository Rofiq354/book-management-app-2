import db from "../config/db.js";
import bcrypt from "bcrypt";

/**
 * GET all users
 */
export const getUsers = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT 
         u.id,
         u.name,
         u.email,
         r.name AS role,
         u.created_at
       FROM users u
       JOIN roles r ON u.role_id = r.id
       ORDER BY u.id ASC`
    );

    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET user by id
 */
export const getUserById = async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  try {
    const result = await db.query(
      `SELECT 
         u.id,
         u.name,
         u.email,
         r.name AS role,
         u.created_at
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE user
 */
export const createUser = async (req, res, next) => {
  const { name, email, password, role_id } = req.body;

  if (!name || !email || !password || !role_id) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (name, email, password, role_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role_id`,
      [name, email, hashedPassword, role_id]
    );

    res.status(201).json({
      message: "User successfully created",
      data: result.rows[0],
    });
  } catch (error) {
    // email already exists
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // role_id not found
    if (error.code === "23503") {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    next(error);
  }
};

/**
 * UPDATE user
 */
export const updateUser = async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email, role_id } = req.body;

  if (isNaN(userId)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  if (!name || !email || !role_id) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const result = await db.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           role_id = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, name, email, role_id`,
      [name, email, role_id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User successfully updated",
      data: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    next(error);
  }
};

/**
 * DELETE user
 */
export const deleteUser = async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  try {
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
