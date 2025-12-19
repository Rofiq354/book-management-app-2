import db from "../config/db.js";

/**
 * GET all roles
 */
export const getRoles = async (req, res, next) => {
  try {
    const result = await db.query("SELECT id, name FROM roles ORDER BY id ASC");

    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET role by id
 */
export const getRoleById = async (req, res, next) => {
  const roleId = parseInt(req.params.id, 10);

  if (isNaN(roleId)) {
    return res.status(400).json({
      message: "Invalid role id",
    });
  }

  try {
    const result = await db.query("SELECT id, name FROM roles WHERE id = $1", [
      roleId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Role not found",
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
 * CREATE role
 */
export const createRole = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Role name is required",
    });
  }

  try {
    const result = await db.query(
      "INSERT INTO roles (name) VALUES ($1) RETURNING id, name",
      [name]
    );

    res.status(201).json({
      message: "Role successfully created",
      data: result.rows[0],
    });
  } catch (error) {
    // unique violation
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Role already exists",
      });
    }

    next(error);
  }
};

/**
 * UPDATE role
 */
export const updateRole = async (req, res, next) => {
  const roleId = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (isNaN(roleId)) {
    return res.status(400).json({
      message: "Invalid role id",
    });
  }

  if (!name) {
    return res.status(400).json({
      message: "Role name is required",
    });
  }

  try {
    const result = await db.query(
      `UPDATE roles
       SET name = $1
       WHERE id = $2
       RETURNING id, name`,
      [name, roleId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    res.status(200).json({
      message: "Role successfully updated",
      data: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Role name already exists",
      });
    }

    next(error);
  }
};

/**
 * DELETE role
 */
export const deleteRole = async (req, res, next) => {
  const roleId = parseInt(req.params.id, 10);

  if (isNaN(roleId)) {
    return res.status(400).json({
      message: "Invalid role id",
    });
  }

  try {
    const result = await db.query(
      "DELETE FROM roles WHERE id = $1 RETURNING id",
      [roleId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    res.status(200).json({
      message: "Role successfully deleted",
    });
  } catch (error) {
    // role masih dipakai di users
    if (error.code === "23001") {
      return res.status(409).json({
        message: "Role cannot be deleted because it is still used by users",
      });
    }

    next(error);
  }
};
