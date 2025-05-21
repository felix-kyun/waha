import { readFile } from "fs/promises";

export async function fileToBase64(filePath) {
  const data = await readFile(filePath);
  const base64 = data.toString("base64");

  return base64;
}
