import { Card, Button, Form } from "react-bootstrap";
import { XCircle } from "lucide-react";
import { Formik } from "formik";
import * as Yup from "yup";

/* ---------------------------
   Validation
--------------------------- */
const ResendEmailSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const VerifyEmailError = ({ onResend, isResending, onBackToLogin }) => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center auth-gradient">
      <Card className="auth-card border-0 shadow-lg p-4 p-md-5">
        <div className="text-center mb-3">
          <XCircle size={64} className="text-danger" />
        </div>

        <h4 className="fw-bold text-danger text-center mb-2">
          Verification failed
        </h4>

        <p className="text-muted text-center mb-4">
          This verification link is invalid or has expired.
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={ResendEmailSchema}
          onSubmit={(values) => onResend(values.email)}
        >
          {({ handleSubmit, getFieldProps, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  {...getFieldProps("email")}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                size="lg"
                className="w-100 mb-3"
                disabled={isResending}
              >
                {isResending ? "Sending..." : "Resend verification email"}
              </Button>

              <Button
                variant="outline-secondary"
                size="lg"
                className="w-100"
                onClick={onBackToLogin}
              >
                Back to Login
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default VerifyEmailError;
