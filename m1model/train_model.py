import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
data = pd.read_csv('reviews2.csv')  # Ensure the file path is correct

# Verify the column names
print(data.head())

# Ensure the column names are correct
if 'review' not in data.columns or 'sentiment' not in data.columns:
    raise ValueError("CSV file must contain 'review' and 'sentiment' columns.")

X = data['review']
y = data['sentiment'].astype(int)  # Convert sentiment to integer

# Preprocess and vectorize
vectorizer = CountVectorizer(stop_words='english')
X_vectorized = vectorizer.fit_transform(X)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)

# Train Naive Bayes model
model = MultinomialNB()
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")

# Save model and vectorizer
joblib.dump(model, 'sentiment_model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')