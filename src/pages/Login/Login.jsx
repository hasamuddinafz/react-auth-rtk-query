import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import { useState } from "react";
import { useLoginMutation } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginSchema from "../../validations/login.schema";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        userNameOrEmail: values.email,
        password: values.password,
      };

      const response = await login(payload).unwrap();

      const { accessToken, refreshToken, expiration } = response;
      dispatch(setCredentials({ accessToken, refreshToken, expiration }));
      navigate("/dashboard");
    } catch (err) {
      if (Array.isArray(err?.data?.errors)) {
        err.data.errors.forEach((e) => toast.error(e));
      } else {
        toast.error(err?.data?.message || "Invalid email or password");
      }
    }
  };

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
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, getFieldProps, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                {/* EMAIL */}
                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted" htmlFor="email">
                    Email Address
                  </Form.Label>

                  <Form.Control
                    id="email"
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

                {/* PASSWORD */}
                <Form.Group className="mb-4">
                  <Form.Label className="small text-muted" htmlFor="password">
                    Password
                  </Form.Label>

                  <Form.Control
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    size="lg"
                    {...getFieldProps("password")}
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
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
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
