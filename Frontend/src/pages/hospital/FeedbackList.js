import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion'; 
import {Rating} from '@mui/material'; 
import { fetchFeedbacks } from "../services/Api";

export default function FeedbackList() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const feedbacks = await fetchFeedbacks();
        setReviews(feedbacks);
      } catch (error) {
        console.error("Error loading feedbacks:", error);
      }
    };

    loadFeedbacks();
  }, []);

  return (
    <section className="py-16 px-8 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Patient's Feedback . . .
      </h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex-none w-80 p-6 bg-white shadow-md rounded-lg text-center"
            >
              {/* Display patient image */}
              <img
                src={review.appointment?.userId?.image}
                alt={review.appointment?.patientName || "Anonymous"}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                {review.appointment?.patientName || "Anonymous"}
              </h3>
              <Rating value={review.rating} readOnly />
              <p className="text-gray-600 mt-2">{review.comments}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
