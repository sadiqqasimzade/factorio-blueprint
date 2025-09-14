/**
 * Validates uploaded files based on file type
 * @param files FileList from input or drag/drop event
 * @param fileType Expected file type (e.g., "image", "video", "audio")
 * @returns Error string if validation fails or first file if validation passes
 */
export default function validateFiles(files: FileList,fileType:string): File | string {
  if (files.length < 1) {
    return "You must add file";
  }
  
  // For image files, check if the MIME type starts with 'image/'
  if (fileType === "image") {
    if (!files[0].type.startsWith("image/")) {
      return "File must be an image (PNG, JPG, GIF)";
    }
  } else if (!files[0].type.includes(fileType)) {
    return "File must be " + fileType;
  }
  
  return files[0];
}
