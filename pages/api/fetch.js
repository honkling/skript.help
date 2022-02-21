import { readdir, stat } from "fs/promises";
import { join } from "path";

export default async function handler(req, res) {
  const articlesPath = join(__dirname, "../../../../articles")
  async function getFilesRecursively(directory) {
    const files = {};
    files._directoryRoot = [];
    const contents = await readdir(directory);
    for(const file of contents) {
      const path = join(directory, file);
      if((await stat(path)).isDirectory())
        files[file] = await getFilesRecursively(path);
      else
        files._directoryRoot.push(file);
    }
    if(files._directoryRoot.length === 0)
      delete files._directoryRoot;
    return files;
  }
  res.status(200).json({ files: await getFilesRecursively(articlesPath) });
}
