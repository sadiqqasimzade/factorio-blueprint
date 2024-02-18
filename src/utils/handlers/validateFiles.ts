/**
 * 
 * @param files 
 * @returns Error string if something wrong or first file if validation failed
 */
export default function validateFiles(files: FileList,fileType:string): File | string {
  if (files.length < 1) {
    return "You must add file";
  }
  if (!files[0].type.includes(fileType)) {
    return "File must be "+fileType;
  }
  return files[0];
}
