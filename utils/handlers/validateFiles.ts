/**
 * Validates uploaded files based on file type
 * @param files FileList from input or drag/drop event
 * @param fileType Expected file type (e.g., "image", "video", "audio")
 * @returns Error string if validation fails or first file if validation passes
 */
export default function validateFiles(files: FileList, fileType: string): File | string {
  if (files.length < 1) {
    return "You must add file";
  }

  const file = files[0]!;

  // Special-case basic image validation
  if (fileType === "image") {
    if (!file.type.startsWith("image/")) {
      return "File must be an image (PNG, JPG, GIF)";
    }
    return file;
  }

  // Support accept-like specs (e.g., "video/*,.gif" or "image/gif")
  const tokens = fileType
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (
    tokens.length > 1 ||
    /\/\*|\/[a-z0-9.+-]+$|^\.[a-z0-9]+$/i.test(fileType)
  ) {
    const fileName = file!.name.toLowerCase();
    const mime = file!.type.toLowerCase();

    const isAccepted = tokens.some((token) => {
      const t = token.toLowerCase();
      if (t.startsWith(".")) {
        // Extension match, e.g. .gif
        return fileName.endsWith(t);
      }
      if (t.endsWith("/*")) {
        // Wildcard MIME, e.g. video/*
        const base = t.slice(0, -2);
        return mime.startsWith(base + "/");
      }
      if (t.includes("/")) {
        // Exact MIME, e.g. image/gif
        return mime === t;
      }
      // Category fallback, e.g. "video" or "audio"
      return mime.startsWith(t + "/");
    });

    if (!isAccepted) {
      return "File must be one of: " + tokens.join(", ");
    }
    return file;
  }

  // Fallback: simple substring match (existing behavior for types like "video")
  if (!file.type.includes(fileType)) {
    return "File must be " + fileType;
  }

  return file;
}
