module.exports  = {
    CONSTANTS : {
    API_MSGS : {
         REQUIRED_FIELDS: "All fields are required",
         BLOG_CREATED: "Blog created successfully",
         SERVER_ERROR: "Internal server error",
         EMAIL_WARNING: "Email already exists",
         USER_CREATED: "User created successfully",
         INVALID_EMAIL_PASS: "Invalid email or password",
         LOGIN_SUCCESS: "Login successful",
         CANNOT_GET_USERS: "Cannot get users",
    },
    API_CONFIG: {
        GET_BLOGS: '/api/blogs',
        POST_BLOG: '/api/createblog',
        SIGNUP_USER: '/api/signup',
        LOGIN_USER: '/api/login',
        GET_USERS: '/api/users',
    },
    MIDDLEWARE: {
        UNAUTHORIZED_USER: "Unauthorized User",
        INVALID_TOKEN: "Invalid token",
    }
}}