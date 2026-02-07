import { useCallback, useEffect, useState } from "react";

type ResizeLimits = {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
};

type Options = {
  keepAspectRatio?: boolean;
};

export function useAspectRatioResize(
  originalWidth: number | undefined,
  originalHeight: number | undefined,
  limits: ResizeLimits,
  options?: Options
) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const keepAspectRatio = options?.keepAspectRatio ?? true;

  const aspectRatio =
    originalWidth && originalHeight
      ? originalWidth / originalHeight
      : 1;

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const resizeByWidth = useCallback(
    (newWidth: number) => {
      let w = clamp(newWidth, limits.minWidth, limits.maxWidth);
      let h = keepAspectRatio ? w / aspectRatio : height;

      if (h > limits.maxHeight) {
        h = limits.maxHeight;
        w = keepAspectRatio ? h * aspectRatio : w;
      }

      setWidth(Math.floor(w));
      setHeight(Math.floor(clamp(h, limits.minHeight, limits.maxHeight)));
    },
    [aspectRatio, keepAspectRatio, limits, height]
  );

  const resizeByHeight = useCallback(
    (newHeight: number) => {
      let h = clamp(newHeight, limits.minHeight, limits.maxHeight);
      let w = keepAspectRatio ? h * aspectRatio : width;

      if (w > limits.maxWidth) {
        w = limits.maxWidth;
        h = keepAspectRatio ? w / aspectRatio : h;
      }

      setHeight(Math.floor(h));
      setWidth(Math.floor(clamp(w, limits.minWidth, limits.maxWidth)));
    },
    [aspectRatio, keepAspectRatio, limits, width]
  );

  // Initialize size when original media changes
  useEffect(() => {
    if (!originalWidth || !originalHeight) return;

    resizeByWidth(originalWidth);
  }, [originalWidth, originalHeight]);

  return {
    width,
    height,
    setWidth: resizeByWidth,
    setHeight: resizeByHeight,
    aspectRatio,
  };
}
