import  React,  {useState } from 'react';

const GiveReviews = ({ doctor, onSubmit }) => {
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
 
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && review && rating > 0) {
        setShowWarning(false);

        onSubmit({doctor, name, review, rating});
        setSubmittedMessage({"rating": rating, "review": review});

        //setName('');
        //setReview('');
        //setRating(0);
    } else {
        setShowWarning(true);
    }
  };

  const StarRating = () => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= rating ? "on" : "off"}
              onClick={() => setRating(index)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
        <div className="review-form">
        <form onSubmit={handleSubmit} name="GiveReview">
          <h2>Give Your Feedback</h2>
            {showWarning && <p className="warning">Please fill out all fields.</p>}
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="review">Review:</label>
                <textarea id="review" name="review" value={review} onChange={e => setReview(e.target.value)} />
            </div>
            <div>
                <label>Rating:</label>
                <StarRating />
            </div>
            <button type="submit">{submittedMessage !==null? "Update" : "Submit"}</button>
        </form>

{submittedMessage && (
    <div style={{marginTop: '10px'}}>
      <h3>Submitted Message:</h3>
      <p>Rating: {submittedMessage.rating}</p>
      <p>{submittedMessage.review}</p>
    </div>
  )}
  </div>
  )
}

export default GiveReviews;