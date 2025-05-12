// src/pages/FeedbackPage.jsx
import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

function FeedbackPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Donnez votre avis</h1>
      <FeedbackForm />
    </div>
  );
}

export default FeedbackPage;
