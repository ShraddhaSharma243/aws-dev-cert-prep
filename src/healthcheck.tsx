import { useState } from 'react';
import axios from 'axios';
const HealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState("All Good");
  const [error, setError] = useState<string | null>(null);

  const fetchHealthStatus = async () => {
    try {
      const response = await axios.get(
        'https://y3bwd0ea0i.execute-api.us-east-1.amazonaws.com/prod/health-check'
      );
      
      setHealthStatus(response.data);
      console.log("1");
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setHealthStatus("");
    }
  };

  return (
    <div className="card">
    <div className="health-check-container">
      <button 
        onClick={fetchHealthStatus}
        className="check-button"
      >
        Check Health Status
      </button>
      
      {healthStatus && (
        <div className="status-success">
          <h3>API Response:</h3>
          <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
        </div>
      )}
      
      {error && (
        <div className="status-error">
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default HealthCheck;