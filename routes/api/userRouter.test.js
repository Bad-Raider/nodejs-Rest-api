import mongoose from "mongoose";
import dotenv from "dotenv";
import request from "supertest";

import app from "../../app.js";
import User from "../../models/user.js";

dotenv.config();
const { DB_TEST, } = process.env;

describe("test login route", () => {
    let server = null;

    beforeAll(async () => {
        await mongoose.connect(DB_TEST);
        server = app.listen();

        // Створення нового користувача для тестів
        const newUser = new User({
            email: "sss@dusyum.com",
            password: "123456",
            // Інші необхідні поля користувача
        });
        await newUser.save();
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    test("test login with correct data", async () => {
        const data = {
            email: "sss@dusyum.com",
            password: "123456",
        };

        const res = await request(app).post("/api/users/login").send(data);
        console.log("res-=-=-=-=-=-=-=-=-=-", res);
        const { statusCode, body } = res;

        expect(statusCode).toBe(200);
        // expect(body.password).toBe(data.password);
        expect(body.email).toBe(data.email);

        const user = await User.findOne({ email: data.email });
        expect(user.email).toBe(data.email);
    });
})
