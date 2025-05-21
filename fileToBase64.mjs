import { readFile } from "fs/promises";

export async function fileToBase64(filePath) {
  console.log("Converting file to base64:", filePath);

  const data = await readFile(filePath);
  const base64 = data.toString("base64");

  console.log("File converted to base64:", filePath);
  return base64;
}
