import { jwtDecode } from "jwt-decode";
import { Card } from "react-bootstrap";

const Dashboard = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <p>Not authenticated</p>;
  }

  const decoded = jwtDecode(token);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center auth-gradient">
      <Card className="p-4 p-md-5 shadow border-0" style={{ maxWidth: 420 }}>
        <h4 className="fw-bold mb-3">Welcome 👋</h4>

        <p className="mb-2">
          <strong>Email:</strong> {decoded.email}
        </p>

        <p className="mb-2">
          <strong>Username:</strong> {decoded.UserName}
        </p>

        <p className="text-muted small">
          Token expires at:{" "}
          {new Date(localStorage.getItem("tokenExpiration")).toLocaleString()}
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
