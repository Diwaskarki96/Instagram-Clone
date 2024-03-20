const YUP = require("yup");

const userValidation = YUP.object({
  name: YUP.string()
    .required("name is required")
    .trim()
    .min(2, "Name must be atleast 2 characters")
    .max(20, "Name should be max 20 characters"),
  email: YUP.string()
    .required("Email is required")
    .trim()
    .lowercase()
    .email("Invalid email"),
  password: YUP.string().required("Password is required"),
});

const profileValidation = YUP.object({
  name: YUP.string()
    .required("Profile Name is Required")
    .min(2, "Name must be 2 characters")
    .max(30, "Name must be under 30 characters"),
  bio: YUP.string().max(50, "Bio  can't exceed 50 characters"),
});

module.exports = { userValidation, profileValidation };
