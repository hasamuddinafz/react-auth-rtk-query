import { jwtDecode } from "jwt-decode";
import { Card, Button } from "react-bootstrap";
import { useIsLoggedInQuery } from "../../services/authService";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("accessToken");
  const expirationRaw = localStorage.getItem("tokenExpiration");

  const { error, isLoading, refetch } = useIsLoggedInQuery(undefined, {
    skip: !token,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!token) return <p>Not authenticated</p>;

  const decoded = jwtDecode(token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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

        <p className="text-muted small mb-2">
          <strong>Token Expiration (TR):</strong>{" "}
          {expirationRaw
            ? new Date(expirationRaw).toLocaleString("tr-TR")
            : "-"}
        </p>

        <hr />

        <p className="small mb-2">
          <strong>API Status:</strong>{" "}
          {isLoading ? "Loading..." : error ? "Unauthorized" : "OK"}
        </p>

        <Button onClick={refetch} className="w-100 mb-2">
          Test API Request (Trigger Refresh)
        </Button>

        <Button variant="danger" onClick={handleLogout} className="w-100">
          Logout
        </Button>

        {error && (
          <p className="text-danger small mt-2">
            {error?.status} - Token expired → refresh should run
          </p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
