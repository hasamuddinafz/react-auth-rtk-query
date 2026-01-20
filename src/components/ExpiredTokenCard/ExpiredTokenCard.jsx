import { XCircle } from "lucide-react";
import { Button, Card } from "react-bootstrap";

function ExpiredTokenCard({ onRetry, onBack }) {
  return (
    <div>
      <div className="min-vh-100 d-flex align-items-center justify-content-center auth-gradient">
        <Card className="auth-card border-0 shadow-lg text-center p-4 p-md-5">
          <div className="mb-4">
            <XCircle size={64} className="text-danger" />
          </div>

          <h4 className="fw-bold text-danger mb-2">Reset link expired</h4>

          <p className="text-muted mb-4">
            This password reset link is invalid or has expired.
            <br />
            Please request a new reset link.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="w-100 mb-3"
            onClick={onRetry}
          >
            Request new reset link
          </Button>

          <Button
            variant="outline-secondary"
            size="lg"
            className="w-100"
            onClick={onBack}
          >
            Back to Login
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default ExpiredTokenCard;
