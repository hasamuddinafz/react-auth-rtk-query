import { Button, Card } from "react-bootstrap";
import { CheckCircle } from "lucide-react";

const VerifyEmailSuccess = ({ onLogin }) => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center auth-gradient">
      <Card className="auth-card border-0 shadow-lg text-center p-4 p-md-5">
        <div className="mb-3">
          <CheckCircle size={64} className="text-success" />
        </div>

        <h4 className="fw-bold text-success mb-2">
          Email verified successfully
        </h4>

        <p className="text-muted mb-4">
          Your account is now active. You can log in.
        </p>

        <Button size="lg" className="w-100" onClick={onLogin}>
          Go to Login
        </Button>
      </Card>
    </div>
  );
};

export default VerifyEmailSuccess;
