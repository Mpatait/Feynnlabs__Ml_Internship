import React, { useState } from 'react';

function App() {
    const [landUse, setLandUse] = useState('');
    const [emissions, setEmissions] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        }
    };

    return (
        <div>
            <h1>Environmental Impact Prediction</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Land Use:
                    <input
                        type="number"
                        value={landUse}
                        onChange={(e) => setLandUse(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Emissions:
                    <input
                        type="number"
                        value={emissions}
                        onChange={(e) => setEmissions(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            {prediction !== null && (
                <div>
                    <h2>Predicted Environmental Impact Score: {prediction}</h2>
                </div>
            )}
        </div>
    );
}

export default App;
