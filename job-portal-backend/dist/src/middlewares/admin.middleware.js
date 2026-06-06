"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const adminOnly = async (req, res, next) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: req.userId,
        },
    });
    if (!user ||
        user.role !== "admin") {
        return res.status(403).json({
            message: "Admin Access Only",
        });
    }
    next();
};
exports.adminOnly = adminOnly;
