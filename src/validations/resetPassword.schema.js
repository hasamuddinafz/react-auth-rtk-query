import * as Yup from "yup";

const ResetPasswordSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            "Password must contain uppercase, lowercase, number and special character"
        )
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
});

export default ResetPasswordSchema;
