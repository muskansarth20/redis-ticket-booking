const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("redis");

const app = express();
app.use(bodyParser.json());

const redisClient = createClient();

redisClient.connect();

const TOTAL_SEATS = 10;

// Initialize seats
app.get("/init", async (req, res) => {
    for (let i = 1; i <= TOTAL_SEATS; i++) {
        await redisClient.set(`seat:${i}`, "available");
    }
    res.send("Seats initialized");
});

// View seats
app.get("/seats", async (req, res) => {
    let seats = {};

    for (let i = 1; i <= TOTAL_SEATS; i++) {
        seats[`seat${i}`] = await redisClient.get(`seat:${i}`);
    }

    res.json(seats);
});

// Book seat with lock
app.post("/book/:seatId", async (req, res) => {

    const seatId = req.params.seatId;
    const lockKey = `lock:seat:${seatId}`;

    const lock = await redisClient.set(lockKey, "locked", {
        NX: true,
        EX: 5
    });

    if (!lock) {
        return res.send("Seat is being booked by another user");
    }

    const seatStatus = await redisClient.get(`seat:${seatId}`);

    if (seatStatus === "booked") {
        return res.send("Seat already booked");
    }

    await redisClient.set(`seat:${seatId}`, "booked");

    res.send(`Seat ${seatId} booked successfully`);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});