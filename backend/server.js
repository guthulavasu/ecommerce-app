
const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "E-Commerce Backend is running!"
    });
});

// Fetch products from MySQL
app.get("/api/products", async (req, res) => {
    try {
        const [products] = await db.query(
            "SELECT * FROM products"
        );

        res.status(200).json(products);

    } catch (error) {
        console.error("Database error:", error.message);

        res.status(500).json({
            status: "ERROR",
            message: "Unable to fetch products"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
