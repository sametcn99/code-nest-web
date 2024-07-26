import { useEffect, useState } from "react";

type FileType = {
  filename: string;
  value: string;
};

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

const validateData = (data: FileType[]): ValidationResult => {
  const errors: string[] = [];

  if (data.length >= 7) {
    errors.push("You can't add more than 7 components.");
  }
  if (data.some((component) => component.value === "")) {
    errors.push("You can't leave the file content empty.");
  }
  if (data.some((component) => component.filename === "")) {
    errors.push("You can't leave the file name empty.");
  }
  if (data.some((component) => component.filename.length > 25)) {
    errors.push("File name can't be longer than 25 characters.");
  }
  if (data.some((component) => component.value.length > 10000)) {
    errors.push("File content can't be longer than 10000 characters.");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
};

const useValidData = (data: FileType[]): ValidationResult => {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: false,
    errors: [],
  });

  useEffect(() => {
    setValidationResult(validateData(data));
  }, [data]);

  return validationResult;
};

export default useValidData;
