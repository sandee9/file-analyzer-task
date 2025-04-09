const JavaStrategy = require("./javaLang");
const PythonStrategy = require("./pythonLang");

const strategies = {
	java: JavaStrategy,
	python: PythonStrategy,
};

exports.getStrategy = (language) => {
	const langKey = language?.toLowerCase();
	const strategy = strategies[langKey];
	if (!strategy) {
		throw new Error(
			`Unsupported language: ${language}. Supported languages are: ${Object.keys(
				strategies
			).join(", ")}`
		);
	}
	return strategy;
};
