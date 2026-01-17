import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        "Password must contain uppercase, lowercase, number and special character"
      )
      .required("Password is required"),
  });

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 auth-gradient"
    >
      <Card className="auth-card border-0">
        <Card.Body className="p-4 p-md-5">
          <h2 className="text-center fw-bold mb-2">Welcome Back</h2>
          <p className="text-center text-muted mb-4">
            Sign in to continue to your account
          </p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted" htmlFor="email">
                    Email Address
                  </Form.Label>

                  <Form.Control
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    size="lg"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small text-muted" htmlFor="password">
                    Password
                  </Form.Label>

                  <Form.Control
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    size="lg"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>

                  <Form.Check
                    type="checkbox"
                    label="Show password"
                    className="mt-2 small text-muted"
                    checked={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                  />

                  <div className="text-end mt-1">
                    <a href="/forgot-password" className="signup-link small">
                      Forgot password?
                    </a>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 mb-3"
                >
                  Sign In
                </Button>
                <div className="text-center">
                  <small className="text-muted">
                    Don’t have an account?{" "}
                    <a href="/signup" className="signup-link">
                      Create one
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

export default Login;
