import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(
  ({ className, type, endIcon: EndIcon, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            'peer flex h-15 w-full rounded-md  border-input bg-gray-200 py-5 px-4 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-md focus-visible:outline-none focus-visible:ring-0    disabled:cursor-not-allowed disabled:opacity-50 border-2 placeholder:text-gray-600 text-gray-900 border-gray-200 focus:border-[#ff3e33] focus:outline-none focus:ring-0 p-2  pr-10 transition-all duration-200',
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <EndIcon className='absolute right-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 peer-focus:text-gray-700' />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
