import app from "../app.js";
import request from "supertest";

describe("POST /weather", () => {
  it("should return 'City is not found!' if cityName is missing", async () => {
    const response = await request(app).post("/weather").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should return 'City is not found!' if cityName is gibberish", async () => {
    const response = await request(app)
      .post("/weather")
      .send({ cityName: "xyz123" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ weatherText: "City is not found!" });
  });

  it("should return temperature for a valid city name", async () => {
    const response = await request(app)
      .post("/weather")
      .send({ cityName: "Amsterdam" });

    expect(response.status).toBe(200);

    expect(response.body.weatherText).toContain("Temperature in Amsterdam");
  });
});