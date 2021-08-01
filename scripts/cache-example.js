const fs = require("fs");
const path = require("path");
const { saveCache, restoreCache  } = require("@actions/cache");

(async () => {
	const fileName = "foo.txt"
	const key = process.env.INPUT_CACHEKEY;

	const restorResult = await restoreCache([fileName], key);
	console.log({ restorResult });

	const filePath = path.join(__dirname, "..", fileName);

	const existsCachedFile = fs.existsSync(filePath);
	if (existsCachedFile) {
		const data = fs.readFileSync(filePath, "utf-8");
		console.log({ data });
	} else {
		const saveResult = await saveCache([fileName], key);
		console.log({ saveResult })
	}
})()
