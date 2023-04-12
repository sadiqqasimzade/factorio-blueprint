/**
 * 
 * @param files 
 * @returns Error string or File if validated
 */
export default function validateFiles(files: FileList): File | string {
  if (files.length < 1) {
    return "You must add file";
  }
  if (!files[0].type.includes("image/")) {
    return "File must be image";
  }
  return files[0];
}
