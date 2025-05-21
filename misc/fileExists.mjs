import { access } from "fs/promises";

export async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch (err) {
    return false;
  }
}
