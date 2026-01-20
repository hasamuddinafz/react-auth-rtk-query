import * as Yup from "yup"
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

export default LoginSchema;