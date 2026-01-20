import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useVerifyEmailMutation,
  useSendVerificationMailMutation,
} from "../../services/userService";

import Loading from "../../components/Loading/Loading";
import VerifyEmailSuccess from "../../components/verify-email/VerifyEmailSuccess";
import VerifyEmailError from "../../components/verify-email/VerifyEmailError";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [verifyEmail, verifyResult] = useVerifyEmailMutation();
  const [sendVerificationMail, { isLoading: isResending }] =
    useSendVerificationMailMutation();

  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    }
  }, [token, verifyEmail]);

  /* LOADING */
  if (verifyResult.isUninitialized || verifyResult.isLoading) {
    return <Loading />;
  }

  /* SUCCESS */
  if (verifyResult.isSuccess) {
    toast.success("Email verified successfully!");
    return <VerifyEmailSuccess onLogin={() => navigate("/login")} />;
  }

  /* ERROR → TOAST + UI */
  if (verifyResult.isError) {
    const errors = verifyResult.error?.data?.errors;

    if (Array.isArray(errors)) {
      errors.forEach((e) => toast.error(e));
    } else {
      toast.error("Email verification failed.");
    }

    return (
      <VerifyEmailError
        isResending={isResending}
        onBackToLogin={() => navigate("/login")}
        onResend={async (email) => {
          try {
            await sendVerificationMail({
              userNameOrEmail: email,
            }).unwrap();

            toast.success("Verification email sent successfully!");
          } catch (err) {
            const resendErrors = err?.data?.errors;
            if (Array.isArray(resendErrors)) {
              resendErrors.forEach((e) => toast.error(e));
            } else {
              toast.error("Unable to send verification email.");
            }
          }
        }}
      />
    );
  }

  return null;
};

export default VerifyEmail;
