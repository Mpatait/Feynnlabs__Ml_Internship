from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.linear_model import LinearRegression
import numpy as np
import pandas as pd

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requcests

# Example training data for the environmental impact model
data = pd.DataFrame({
    'land_use': [1, 2, 3, 4, 5],
    'emissions': [100, 150, 200, 250, 300],
    'impact_score': [50, 65, 80, 95, 110]
})

# Training a simple linear regression model
X = data[['land_use', 'emissions']]
y = data['impact_score']
model = LinearRegression().fit(X, y)

# Flask route for predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        land_use = float(input_data.get('land_use'))
        emissions = float(input_data.get('emissions'))

        # Predict the environmental impact
        prediction = model.predict([[land_use, emissions]])
        return jsonify({'predicted_impact_score': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)})

# Running the Flask app
if __name__ == '__main__':
    app.run(debug=True)
