import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const requireAdminAuth = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header not found" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMINSECRET!);

    if (!decoded) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    const user = await prisma.adminUser.findUnique({
      where: {
        id: (decoded as any).id,
      },
    });

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user; // Assigning user to req object
    next();
  } catch (error) {
    console.error("Error in requireAdminAuth:", error);
    return res.status(401).json({ msg: "Request is not authorized" });
  }
};
