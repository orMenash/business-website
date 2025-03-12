
import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  fetchPriority,
  ...props
}: OptimizedImageProps) => {
  // Extract file extension
  const fileExtension = src.split('.').pop()?.toLowerCase();
  
  // Check if image is already in WebP format
  const isWebP = fileExtension === 'webp';
  
  // For non-WebP images, we should ideally convert them, but for now we'll just use them as is
  // In a production environment, you'd use a build process to convert images to WebP
  
  // Calculate aspect ratio if both dimensions are provided
  const aspectRatio = width && height ? `${width} / ${height}` : 'auto';

  return (
    <img
      src={src}
      alt={alt}
      width={width || undefined}
      height={height || undefined}
      loading={loading}
      className={`img-optimize ${className}`}
      style={{
        aspectRatio: aspectRatio,
        objectFit: 'cover',
        ...props.style
      }}
      sizes={sizes}
      // Apply fetchPriority as a custom attribute using JSX spread for all lowercased DOM attributes
      {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
      {...props}
    />
  );
};

// Also create a ResponsiveImage component that uses OptimizedImage
export const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  fetchPriority,
  ...props
}: OptimizedImageProps) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width || '100%'}
      height={height || 'auto'}
      loading={loading}
      className={`img-optimize ${className}`}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : 'auto',
        ...props.style
      }}
      sizes={sizes}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
};
