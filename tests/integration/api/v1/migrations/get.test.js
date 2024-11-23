import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retriving pending migrations", async () => {
      //verify if the response migrations is 200
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
      expect(responseBody.length).toBe(1);
      expect(typeof responseBody[0].path).toBe("string");
      expect(typeof responseBody[0].name).toBe("string");
      expect(typeof responseBody[0].timestamp).toBe("number");
    });
  });
});
