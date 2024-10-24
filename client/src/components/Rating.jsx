import React from 'react';

const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  const starColor =
    rating >= 4.5
      ? "text-green-500"
      : rating >= 3.5
      ? "text-yellow-400"
      : rating >= 2.5
      ? "text-orange-500"
      : "text-red-500";

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }).map((_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          className={`h-5 w-5 ${starColor}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          aria-hidden="true"
          className={`h-5 w-5 ${starColor}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2.5c.375 0 .711.223.848.553l1.08 3.262h3.42c.25 0 .493.125.637.333s.174.487.092.747l-2.873 2.115c-.236.176-.358.467-.299.745l1.08 3.262c.136.426-.092.883-.482.97-.389.086-.773-.153-.956-.537l-2.873-2.115c-.236-.176-.542-.176-.778 0l-2.873 2.115c-.183.384-.566.623-.956.537-.39-.087-.618-.544-.482-.97l1.08-3.262c.059-.278-.063-.569-.299-.745L2.38 6.697c-.082-.26-.043-.548.092-.747s.387-.333.637-.333h3.42l1.08-3.262C9.289 2.723 9.625 2.5 10 2.5z"></path>
        </svg>
      )}
      {Array.from({
        length: totalStars - fullStars - (hasHalfStar ? 1 : 0),
      }).map((_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          className="h-5 w-5"
          fill="#d1d5db"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
      {/* <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
        {rating}
      </span> */}
    </div>
  );
};

export default Rating;
