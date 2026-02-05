/**
 * Comprehensive validation utilities for blueprint conversion
 */

export class BlueprintValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'BlueprintValidationError';
  }
}

export class ValidationRules {
  static readonly MAX_WIDTH = 500;
  static readonly MAX_HEIGHT = 500;
  static readonly MIN_WIDTH = 5;
  static readonly MIN_HEIGHT = 5;
  static readonly MAX_QUALITY = 10;
  static readonly MIN_QUALITY = 1;
}

export class BlueprintValidator {
  /**
   * Validate image dimensions for blueprint conversion
   */
  static validateDimensions(width: number, height: number): void {
    if (width < ValidationRules.MIN_WIDTH || width > ValidationRules.MAX_WIDTH) {
      throw new BlueprintValidationError(
        `Width must be between ${ValidationRules.MIN_WIDTH} and ${ValidationRules.MAX_WIDTH} pixels`,
        'width'
      );
    }
    
    if (height < ValidationRules.MIN_HEIGHT || height > ValidationRules.MAX_HEIGHT) {
      throw new BlueprintValidationError(
        `Height must be between ${ValidationRules.MIN_HEIGHT} and ${ValidationRules.MAX_HEIGHT} pixels`,
        'height'
      );
    }
  }

  /**
   * Validate quality setting
   */
  static validateQuality(quality: number): void {
    if (quality < ValidationRules.MIN_QUALITY || quality > ValidationRules.MAX_QUALITY) {
      throw new BlueprintValidationError(
        `Quality must be between ${ValidationRules.MIN_QUALITY} and ${ValidationRules.MAX_QUALITY}`,
        'quality'
      );
    }
    
    if (!Number.isInteger(quality)) {
      throw new BlueprintValidationError('Quality must be an integer', 'quality');
    }
  }

  /**
   * Validate color indexes array
   */
  static validateColorIndexes(colorIndexes: number[][], maxWidth: number, maxHeight: number): void {
    if (!Array.isArray(colorIndexes)) {
      throw new BlueprintValidationError('Color indexes must be an array', 'colorIndexes');
    }

    if (colorIndexes.length === 0) {
      throw new BlueprintValidationError('Color indexes cannot be empty', 'colorIndexes');
    }

    if (colorIndexes.length > maxWidth) {
      throw new BlueprintValidationError(
        `Too many columns (${colorIndexes.length}). Maximum allowed: ${maxWidth}`,
        'colorIndexes'
      );
    }

    for (let i = 0; i < colorIndexes.length; i++) {
      const row = colorIndexes[i];
      
      if (!Array.isArray(row)) {
        throw new BlueprintValidationError(`Row ${i} must be an array`, 'colorIndexes');
      }

      if (row.length > maxHeight) {
        throw new BlueprintValidationError(
          `Row ${i} has too many elements (${row.length}). Maximum allowed: ${maxHeight}`,
          'colorIndexes'
        );
      }

      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        
        if (typeof value !== 'number') {
          throw new BlueprintValidationError(
            `Value at position [${i}][${j}] must be a number`,
            'colorIndexes'
          );
        }

        if (value < 0 || value > 255) {
          throw new BlueprintValidationError(
            `Value at position [${i}][${j}] must be between 0 and 255`,
            'colorIndexes'
          );
        }

        if (!Number.isInteger(value)) {
          throw new BlueprintValidationError(
            `Value at position [${i}][${j}] must be an integer`,
            'colorIndexes'
          );
        }
      }
    }
  }

  /**
   * Validate file type and size
   */
  static validateFile(file: File, maxSizeMB: number = 10): void {
    if (!(file instanceof File)) {
      throw new BlueprintValidationError('Invalid file object', 'file');
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      throw new BlueprintValidationError(
        `File size (${fileSizeMB.toFixed(2)} MB) exceeds maximum allowed size (${maxSizeMB} MB)`,
        'file'
      );
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      throw new BlueprintValidationError(
        `Unsupported file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`,
        'file'
      );
    }
  }

  /**
   * Comprehensive validation for image to lamp conversion
   */
  static validateImageToLampConversion(params: {
    colorIndexes: number[][];
    quality: number;
    width: number;
    height: number;
    blackLampsAllowed: boolean;
  }): void {
    try {
      this.validateDimensions(params.width, params.height);
      this.validateQuality(params.quality);
      this.validateColorIndexes(params.colorIndexes, params.width, params.height);
      
      if (typeof params.blackLampsAllowed !== 'boolean') {
        throw new BlueprintValidationError('blackLampsAllowed must be a boolean', 'blackLampsAllowed');
      }
    } catch (error) {
      if (error instanceof BlueprintValidationError) {
        throw error;
      }
      throw new BlueprintValidationError('Unknown validation error occurred');
    }
  }
}

// Type-safe validation result
export interface ValidationResult {
  isValid: boolean;
  errors: BlueprintValidationError[];
  warnings: string[];
}

export class SafeValidator {
  /**
   * Safely validate with error collection instead of throwing
   */
  static safeValidate<T>(
    validator: () => T,
    onSuccess: (result: T) => void,
    onError: (errors: BlueprintValidationError[]) => void
  ): void {
    const errors: BlueprintValidationError[] = [];
    
    try {
      const result = validator();
      if (errors.length === 0) {
        onSuccess(result);
      } else {
        onError(errors);
      }
    } catch (error) {
      if (error instanceof BlueprintValidationError) {
        errors.push(error);
        onError(errors);
      } else {
        errors.push(new BlueprintValidationError('Unexpected validation error'));
        onError(errors);
      }
    }
  }
}