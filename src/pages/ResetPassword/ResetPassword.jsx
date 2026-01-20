import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { toast } from "react-toastify";

import {
  useUpdatePasswordMutation,
  useVerifyResetPasswordTokenQuery,
} from "../../services/userService";

import ResetPasswordSchema from "../../validations/resetPassword.schema";
import ExpiredTokenCard from "../../components/ExpiredTokenCard/ExpiredTokenCard";
import Loading from "../../components/Loading/Loading";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const {
    isLoading: isVerifying,
    isError,
    isSuccess,
  } = useVerifyResetPasswordTokenQuery({ token }, { skip: !token });

  if (isVerifying) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ExpiredTokenCard
        onRetry={() => navigate("/forgot-password")}
        onBack={() => navigate("/login")}
      />
    );
  }

  if (!isSuccess) return null;

  const handleSubmit = async (values) => {
    try {
      await updatePassword({
        token,
        password: values.password,
        passwordConfirm: values.confirmPassword,
      }).unwrap();

      toast.success("Password updated successfully!");
      navigate("/login");
    } catch {
      toast.error("Unable to update password.");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center auth-gradient">
      <Card className="auth-card p-4 p-md-5 shadow border-0">
        <h4 className="fw-bold mb-3 text-center">Reset your password</h4>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, getFieldProps, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              {/* New Password */}
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  {...getFieldProps("password")}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your new password"
                  {...getFieldProps("confirmPassword")}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Show Password Checkbox */}
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="Show password"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-100"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ResetPassword;
