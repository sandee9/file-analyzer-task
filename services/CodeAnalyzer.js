const { getStrategy } = require("../strategies/factory");

exports.analyzeCodeContent = (content, language) => {
	const strategy = getStrategy(language);
	const commentTag = strategy.getSingleLineCommentTag();

	const lines = content.split(/\r?\n/);

	let blankLines = 0;
	let commentLines = 0;
	let codeLines = 0;
	const totalLines = lines.length;

	lines.forEach((line) => {
		const trimmedLine = line.trim();

		if (trimmedLine === "") {
			blankLines++;
		} else if (trimmedLine.startsWith(commentTag)) {
			commentLines++;
		} else {
			codeLines++;
		}
	});

	return {
		blank: blankLines,
		comments: commentLines,
		code: codeLines,
		total: totalLines,
	};
};
