const request = require("supertest");
const app = require("../src/app");

describe("NihonGo API", () => {
  it("returns the health check response", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("NihonGo! API is running");
  });

  it("blocks protected dashboard routes without a token", async () => {
    const response = await request(app).get("/api/dashboard/summary");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token not provided");
  });

  it("returns 404 for unknown routes", async () => {
    const response = await request(app).get("/api/unknown-route");

    expect(response.status).toBe(404);
  });
});
