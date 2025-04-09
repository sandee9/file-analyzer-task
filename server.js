const express = require("express");
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

app.use(express.json());

app.use("/analyze", analyzeRoutes);

app.get("/", (req, res) => {
	res.send("Service is running...");
});

app.use((err, req, res, next) => {
	console.error("Unhandled Error:", err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});

if (require.main === module) {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
}

module.exports = app;
