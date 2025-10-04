// ErrorMessage.tsx
import React from "react";

interface ErrorMessageProps {
  error?: {
    message?: string;
  };
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error?.message) return null;

  return <p className="text-red-600 text-sm mt-1">{error.message}</p>;
};

export default ErrorMessage;
