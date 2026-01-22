import * as Yup from "yup"
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
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            "Password must contain uppercase, lowercase, number and special character"
        )
        .required("Password is required"),

    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
});
export default SignupSchema;