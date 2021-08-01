import fs from "fs";
import path from "path";
import { getInput } from "@actions/core"
import { saveCache, restoreCache } from "@actions/cache";

const fileName = "foo.txt";
const key = getInput("cacheKey", { required: true });
console.log({ key });

const restorResult = await restoreCache([fileName], key);
console.log({ restorResult });

const filePath = path.join(__dirname, "..", fileName);

const existsCachedFile = fs.existsSync(filePath);
if (existsCachedFile) {
  const data = fs.readFileSync(filePath, "utf-8");
  console.log({ data });
} else {
  const saveResult = await saveCache([fileName], key);
  console.log({ saveResult });
}
