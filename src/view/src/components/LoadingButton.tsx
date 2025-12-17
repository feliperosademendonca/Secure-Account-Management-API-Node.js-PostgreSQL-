// src/components/LoadingButton.tsx
import React, { useState } from "react";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loadingText?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loadingText = "Aguarde…",
  onClick,
  className,
  children,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (onClick) {
        await onClick(event);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      aria-busy={isLoading}
      disabled={isLoading || props.disabled}
      className={`${className ?? ""} ${isLoading ? "loading outline" : ""}`}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};
