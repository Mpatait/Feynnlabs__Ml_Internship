import React, { useState } from 'react';
import './App.css';  // Import CSS for styling

function App() {
    const [landUse, setLandUse] = useState('');
    const [emissions, setEmissions] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent page refresh

        if (!landUse || !emissions) {
            alert('Please enter values for both Land Use and Emissions');
            return;
        }

        const data = {
            land_use: parseFloat(landUse),
            emissions: parseFloat(emissions),
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            setPrediction(result.predicted_impact_score);
        } catch (error) {
            console.error('Error fetching prediction:', error);
            alert('There was an error fetching the prediction.');
        }
    };

    return (
        <div className="app-container">
            <div className="overlay">
                <div className="card">
                    <h1>Environmental Impact Prediction</h1>
                    <form onSubmit={handleSubmit} className="form">
                        <label className="input-label">
                            Land Use:
                            <input
                                type="number"
                                value={landUse}
                                onChange={(e) => setLandUse(e.target.value)}
                                className="input-field"
                            />
                        </label>
                        <br />
                        <label className="input-label">
                            Emissions:
                            <input
                                type="number"
                                value={emissions}
                                onChange={(e) => setEmissions(e.target.value)}
                                className="input-field"
                            />
                        </label>
                        <br />
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                    {prediction !== null && (
                        <div className="result">
                            <h2>Predicted Environmental Impact Score: {prediction}</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
