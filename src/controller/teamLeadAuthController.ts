import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "email-validator";

const prisma = new PrismaClient();

const createToken = (id: any) => {
  return jwt.sign({ id }, process.env.TEAMLEADSECRET || "", {
    expiresIn: "3d",
  });
};

export const teamLeadRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    name,
    email,
    password,
    address,
    designation,
    dob,
    image,
    joiningDate,
    phoneNumber,
    role,
    salary,
  } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ msg: "Please enter all fields" });
      return;
    }

    if (!validator.validate(email)) {
      res.status(400).json({ msg: "Please enter a valid email" });
      return;
    }

    const user = await prisma.teamLeadUser.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.teamLeadUser.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        designation,
        dob,
        image,
        joiningDate,
        phoneNumber,
        role,
        salary,
      },
    });

    const token = createToken(newUser.id);

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const teamLeadLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ msg: "Please enter all fields" });
      return;
    }

    if (!validator.validate(email)) {
      res.status(400).json({ msg: "Please enter a valid email" });
      return;
    }

    const user = await prisma.teamLeadUser.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({ msg: "User does not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    const token = createToken(user.id);

    res.status(200).json({ token, user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getAllTeamLeads = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const teamLeads = await prisma.teamLeadUser.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).json({ teamLeads });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
