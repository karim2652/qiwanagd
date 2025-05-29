import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ArrowUpRight } from 'lucide-react';


const buttonVariants = cva(
  'inline-flex items-center justify-between rounded-full transition-all duration-300 border border-gray-300 relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 group',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        success: '',
        dark: '',
      },
      size: {
        small: 'h-9 text-xs',
        medium: 'h-11 text-sm',
        large: 'h-12 text-base',
      },
      direction: {
        ltr: 'flex-row',
        rtl: 'flex-row-reverse',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      direction: 'ltr',
    },
  }
);

const Button = ({
  text ,
  onClick,
  variant = 'primary',
  size = 'medium',
  className,
  bgColor = 'white', // Default background color
  circleColor, // Optional custom circle color
  direction = 'ltr', // ltr for English, rtl for Arabic
  ...props
}) => {
  // Circle background colors by variant
  const defaultCircleColors = {
    primary: '#ff3e33',
    secondary: '#4a6cf7',
    success: '#2db67c',
    dark: '#333',
  };

  // Use custom circleColor or default from variant
  const finalCircleColor = circleColor || defaultCircleColors[variant];

  const buttonSizes = {
    small: {
      padding: 'px-3',
      circleSize: 'w-8 h-8',
      iconSize: 'w-3 h-3',
    },
    medium: {
      padding: 'px-4',
      circleSize: 'w-10 h-10',
      iconSize: 'w-4 h-4',
    },
    large: {
      padding: 'px-5',
      circleSize: 'w-11 h-11',
      iconSize: 'w-5 h-5',
    },
  };

  // Adjust transform for RTL mode
  const transformClass =
    direction === 'ltr' ? 'group-hover:translate-x-0.5' : 'group-hover:-translate-x-0.5';

  return (
    <button
      className={cn(buttonVariants({ variant, size, direction }), className)}
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
      dir={direction}
      {...props}
    >
      <span className={`${buttonSizes[size].padding} py-2 font-medium text-gray-800`}>{text}</span>
      <span
        className={`flex items-center justify-center rounded-full ${buttonSizes[size].circleSize} text-white transition-transform duration-300 ${transformClass}`}
        style={{ backgroundColor: finalCircleColor }}
      >
        <ArrowUpRight size={20} />
      </span>
    </button>
  );
};

export { Button };
