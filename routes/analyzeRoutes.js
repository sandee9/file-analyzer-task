const express = require("express");
const multer = require("multer");
const path = require("path");
const { analyzeCodeContent } = require("../services/CodeAnalyzer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		const allowedExt = [".java", ".py"];
		const ext = path.extname(file.originalname).toLowerCase();
		if (allowedExt.includes(ext)) {
			cb(null, true);
		} else {
			cb(
				new Error(
					`Invalid file type. Only ${allowedExt.join(", ")} files are allowed.`
				),
				false
			);
		}
	},
	limits: { fileSize: 1024 * 1024 * 1 },
});

router.post("/", upload.single("sourceFile"), (req, res) => {
	if (!req.file) {
		return res.status(400).json({
			error: "No file uploaded",
		});
	}

	try {
		const fileContent = req.file.buffer.toString("utf8");
		const fileExtension = path.extname(req.file.originalname).toLowerCase();
		let language;
		switch (fileExtension) {
			case ".java":
				language = "java";
				break;
			case ".py":
				language = "python";
				break;
			default:
				return res
					.status(400)
					.json({ error: `File not supported: ${fileExtension}` });
		}

		const analysisResult = analyzeCodeContent(fileContent, language);

		res.status(200).json({
			blank: analysisResult.blank,
			comments: analysisResult.comments,
			code: analysisResult.code,
			total: analysisResult.total,
		});
	} catch (error) {
		console.error("Analysis Error:", error);
		if (error.message.startsWith("Unsupported language")) {
			return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: "An error occurred during file analysis." });
	}
});

router.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		return res.status(400).json({ error: `File upload error: ${err.message}` });
	} else if (err) {
		return res.status(400).json({ error: err.message });
	}
	next();
});

module.exports = router;
