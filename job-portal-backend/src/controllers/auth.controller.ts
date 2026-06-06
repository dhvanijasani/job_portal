import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { Request, Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const register = async (
    req: Request,
    res: Response
) => {
    console.log("REQ BODY:", req.body);
    try {
        const {
            name,
            email,
            password,
            role,
        } = req.body;

        console.log("CREATED USER =", role);

        const existingUser =
            await prisma.user.findUnique({
                where: {
                    email,
                },
            });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "User already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password:
                        hashedPassword,
                    role: String(role).toLowerCase().trim(),
                },
            });

        res.status(201).json({
            success: true,
            message:
                "User registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:
                "Server Error",
        });
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user =
            await prisma.user.findUnique({
                where: {
                    email,
                },
            });

        if (!user) {
            return res.status(404).json({
                message:
                    "User not found",
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                message:
                    "Invalid credentials",
            });
        }

        const token =
            generateToken(
                user.id
            );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:
                "Server Error",
        });
    }
};

export const profile = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const user =
            await prisma.user.findUnique({
                where: {
                    id: req.userId,
                },
            });

        if (!user) {
            return res.status(404).json({
                message:
                    "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            message:
                "Server Error",
        });
    }
};