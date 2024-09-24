import { useState } from "react";

function Nutrition() {
  const [dish, setDish] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const getNutrition = async () => {
    const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${dish}`;
    const apiKey = 'c4N0gXW1zyrSkuVUWCdRuQ==52IOjUi1WsDoQgNp'; 

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      if (data.length === 0) {
        throw new Error("No data found for the given dish.");
      }

      setData(data);
      setHistory((prevHistory) => [...prevHistory, dish]); // Add dish to history
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (dish.trim() === "") {
      setError("Please enter a dish name.");
      return;
    }
    getNutrition();
  };

  const handleReset = () => {
    setDish("");
    setData(null);
    setError("");
  };

  const handleHistoryClick = (dishName) => {
    setDish(dishName);
    getNutrition();
  };

  return (
    <div className="container">
      <h1>Nutrition App</h1>
      <input
        type="text"
        id="dish-name"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
        placeholder="Enter dish name"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}
      
      {data && data.length > 0 ? (
        <div>
          <div className="dish-name">Dish Name: {data[0].name || "N/A"}</div>
          <div className="fat-total">Fat Total (in mg): {data[0].fat_total_g || "N/A"}</div>
          <div className="fat-saturated">Fat Saturated (in mg): {data[0].fat_saturated_g || "N/A"}</div>
          <div className="sodium-mg">Sodium Content (in mg): {data[0].sodium_mg || "N/A"}</div>
          <div className="potassium-mg">Potassium Content (in mg): {data[0].potassium_mg || "N/A"}</div>
          <div className="cholesterol-mg">Cholesterol Content (in mg): {data[0].cholesterol_mg || "N/A"}</div>
          <div className="carbohydrates-mg">Carbohydrates Total (in g): {data[0].carbohydrates_total_g || "N/A"}</div>
          <div className="fiber-g">Fiber Content (in g): {data[0].fiber_g || "N/A"}</div>
          <div className="sugar-g">Sugar Content (in g): {data[0].sugar_g || "N/A"}</div>
        </div>
      ) : (
        data && <p>No data available</p>
      )}
      
      <br />
      <button onClick={handleSubmit} disabled={loading}>Get Nutrition</button>
      <button onClick={handleReset}>Clear</button>

      {history.length > 0 && (
        <div className="history">
          <h2>Search History</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index} onClick={() => handleHistoryClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nutrition;
