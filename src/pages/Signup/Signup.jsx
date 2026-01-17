import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import * as Yup from "yup";
import { Col, Row } from "react-bootstrap";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),

    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),

    userName: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),

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

    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
  });

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
            onSubmit={(values) => {
              const payload = {
                name: values.name,
                lastName: values.lastName,
                userName: values.userName,
                email: values.email,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
              };

              console.log(payload);
            }}
            validationSchema={SignupSchema}
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
                {/* Name Lastname */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="First Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        name="lastName"
                        placeholder="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.lastName && !!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                {/* User Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.userName && !!errors.userName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.userName}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email Address </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                >
                  Create Account
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
