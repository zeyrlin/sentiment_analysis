from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the pre-trained sentiment analysis model and vectorizer
try:
    model = joblib.load('sentiment_model.pkl')
    vectorizer = joblib.load('vectorizer.pkl')
except Exception as e:
    app.logger.error(f"Error loading model or vectorizer: {e}")
    model = None
    vectorizer = None

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not vectorizer:
        return jsonify({'error': 'Model or vectorizer not loaded'}), 500

    data = request.json
    review = data.get('review')
    if not review:
        return jsonify({'error': 'Missing review'}), 400

    try:
        # Reshape the review to a 2D array
        review_vectorized = vectorizer.transform([review])
        sentiment = model.predict(review_vectorized)[0]
        # Convert sentiment to string for consistency
        sentiment_label = "positive" if sentiment == 1 else "negative"
        return jsonify({'sentiment': sentiment_label})
    except Exception as e:
        app.logger.error(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)