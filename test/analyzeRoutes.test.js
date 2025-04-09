const request = require("supertest");
const path = require("path");
const app = require("../server");

const getTestFilePath = (filename) => {
	return path.join(__dirname, filename);
};

describe("Analyze File API - Result Verification", () => {
	const javaFilePath = getTestFilePath("hello-world.java");

	test("POST /analyze should return correct analysis counts for hello-world.java", async () => {
		const expectedResult = {
			blank: 1,
			comments: 2,
			code: 6,
			total: 9,
		};

		const response = await request(app)
			.post("/analyze")
			.attach("sourceFile", javaFilePath);

		expect(response.statusCode).toBe(200);

		expect(response.headers["content-type"]).toMatch(/application\/json/);

		expect(response.body).toEqual(expectedResult);
	});
});
