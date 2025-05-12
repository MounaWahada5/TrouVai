import React, { useState } from 'react';
import { sendFeedback } from '../utils/api'; // Importer la fonction

const FeedbackForm = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifier si le message est vide
    if (!message.trim()) {
      setError('Le message ne peut pas être vide.');
      return;
    }

    try {
      // Appel de la fonction sendFeedback
      await sendFeedback(message);

      // Si tout se passe bien
      setSuccess('Feedback envoyé avec succès');
      setMessage(''); // Réinitialiser le champ du message
      setError(null); // Réinitialiser l'erreur si la soumission a réussi
    } catch (err) {
      // Si une erreur se produit
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      setSuccess(null); // Réinitialiser le message de succès en cas d'erreur
    }
  };

  return (
    <div className="feedback-form">
      <h2>Donnez votre feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Mettre à jour le message
          placeholder="Écrivez votre message..."
          rows="4"
          cols="50"
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
