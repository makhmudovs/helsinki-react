"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const allowedOrigins = ['http://localhost:5173/'];
const options = {
    origin: allowedOrigins
};
// Then pass these options to cors:
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors_1.default(options));
app.use(express_1.default.json());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
    res.send("Pong");
});
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
