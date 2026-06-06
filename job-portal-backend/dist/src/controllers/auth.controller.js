"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
const prisma_1 = __importDefault(require("../config/prisma"));
const register = async (req, res) => {
    console.log("REQ BODY:", req.body);
    try {
        const { name, email, password, role, } = req.body;
        console.log("CREATED USER =", role);
        const existingUser = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: String(role).toLowerCase().trim(),
            },
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password, } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        const token = (0, generateToken_1.generateToken)(user.id);
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.login = login;
const profile = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: req.userId,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
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
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.profile = profile;
