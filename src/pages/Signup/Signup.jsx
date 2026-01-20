import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { useCreateUserMutation } from "../../services/userService";
import { toast } from "react-toastify";
import SignupSchema from "../../validations/signup.schema";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      name: values.name,
      lastName: values.lastName,
      userName: values.userName,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };

    try {
      await createUser(payload).unwrap();
      toast.success(
        "Account created successfully. Please check your email for verification.",
      );
      resetForm();
    } catch (err) {
      if (Array.isArray(err?.data?.errors)) {
        err.data.errors.forEach((error) => {
          toast.error(error);
        });
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
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
          <h2 className="text-center fw-bold mb-2">Create Account</h2>
          <p className="text-center text-muted mb-4">Sign up to get started</p>

          <Formik
            initialValues={{
              name: "",
              lastName: "",
              userName: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, getFieldProps, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                {/* Name / Last Name */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        {...getFieldProps("name")}
                        isInvalid={touched.name && !!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        {...getFieldProps("lastName")}
                        isInvalid={touched.lastName && !!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    {...getFieldProps("userName")}
                    isInvalid={touched.userName && !!errors.userName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.userName}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    {...getFieldProps("email")}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...getFieldProps("password")}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...getFieldProps("passwordConfirm")}
                    isInvalid={
                      touched.passwordConfirm && !!errors.passwordConfirm
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  label="Show password"
                  className="mb-4 small text-muted"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-100 mb-3 btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

                <div className="text-center">
                  <small className="text-muted">
                    Already have an account?{" "}
                    <a href="/login" className="signup-link">
                      Sign in
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

export default Signup;
