import { join } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

export default async function handler(req, res) {
	const articlesPath = join(__dirname, "../../../../../articles");
	const path = join(articlesPath, req.query.slug.join("/"));
	if(!path.startsWith(articlesPath) || !path.endsWith(".mdx") || !existsSync(path))
		return res.status(404).send({ error: "Not found." });
	res.status(200).json({ content: await readFile(path, "utf-8") });
  }
  