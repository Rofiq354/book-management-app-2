import bcrypt from "bcrypt";
import db from "../config/db.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      `SELECT public.users.*, roles.name AS role
            FROM users
            JOIN public.roles ON public.users.role_id = roles.id
            WHERE email = $1
            `,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      res.status(401).json({ message: "Invalid email or password" });

    // simpan ke session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: "Login success",
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy(() => {
      res.status(200).json({ message: "Logout success" });
    });
  } catch (error) {
    next(error);
  }
};
