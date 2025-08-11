import React from "react";
import { cn } from "@/lib/utils";

interface AdminContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Standard container for all dashboard pages to ensure consistent width and padding
export const AdminContainer: React.FC<AdminContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("mx-auto w-full max-w-7xl p-6 space-y-6", className)}>
      {children}
    </div>
  );
};
