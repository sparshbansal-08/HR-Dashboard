"use client";
import { useState, useEffect } from 'react';

export default function StarRating({ rating }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const safeRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    const filledStars = Math.min(Math.max(0, Math.round(safeRating)), 5); // Ensure 0-5 stars
    const emptyStars = 5 - filledStars;
    setStars(
      Array(filledStars).fill('★').concat(Array(emptyStars).fill('☆'))
    );
  }, [rating]);
    

  return (
    <div className="flex gap-1 mt-2">
      {stars.map((star, index) => (
        <span
          key={index}
          className={star === '★' ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}
        >
          {star}
        </span>
      ))}
    </div>
  );
}
