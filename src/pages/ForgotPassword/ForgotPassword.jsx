import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSendResetPasswordMailMutation } from "../../services/userService";
import ForgotPasswordSchema from "../../validations/forgotPassword.schema";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [sendResetMail, { isLoading }] = useSendResetPasswordMailMutation();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await sendResetMail({
        userNameOrEmail: values.email,
      }).unwrap();

      toast.success(
        "Password reset link sent. Please check your inbox (and spam folder).",
      );

      resetForm();
      navigate("/login");
    } catch (err) {
      const cooldown = err?.data?.emailRequestCooldownInSeconds;

      if (cooldown) {
        toast.info(
          `Please wait ${cooldown} seconds before requesting another reset email.`,
        );
        return;
      }

      toast.error("Unable to send reset email.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 auth-gradient"
    >
      <Card className="auth-card border-0">
        <Card.Body className="p-4 p-md-5">
          <h2 className="text-center fw-bold mb-2">Forgot your password?</h2>
          <p className="text-center text-muted mb-4">
            Enter your email and we’ll send you a reset link.
          </p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, getFieldProps, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="small text-muted">
                    Email Address
                  </Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    size="lg"
                    {...getFieldProps("email")}
                    isInvalid={touched.email && !!errors.email}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending email..." : "Send Reset Link"}
                </Button>

                <div className="text-center">
                  <small className="text-muted">
                    Remembered your password?{" "}
                    <a href="/login" className="signup-link">
                      Back to login
                    </a>
                  </small>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
