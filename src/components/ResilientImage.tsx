import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className,
  fallbackTitle,
  fallbackClassName,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackTitle || 'Image placeholder'}
        className={cn(
          'flex h-full w-full flex-col items-center justify-center gap-2 bg-surface p-6 text-center text-foreground/50',
          fallbackClassName
        )}
      >
        <ImageOff className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
        {fallbackTitle && (
          <span className="text-xs font-medium tracking-wide text-foreground/60">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
};
