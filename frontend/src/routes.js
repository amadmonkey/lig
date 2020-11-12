import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import CreatePost from "./components/CreatePost/CreatePost";
import Logout from "./components/Logout/Logout";
import ViewPost from "./components/ViewPost/ViewPost";

const ROUTES = {
    home: {
        label: "Home",
        path: "/",
        component: Home,
        authenticated: false,
        hasBreadcrumbs: false,
        exact: true
    },
    login: {
        label: "Login",
        path: "/login",
        component: Login,
        authenticated: false,
        hasBreadcrumbs: false,
        exact: true
    },
    logout: {
        label: "Logout",
        path: "/logout",
        component: Logout,
        authenticated: true,
        hasBreadcrumbs: false,
        exact: true
    },
    register: {
        label: "Register",
        path: "/register",
        component: Login,
        authenticated: false,
        hasBreadcrumbs: false,
        exact: true
    },
    createPost: {
        label: "Create Post",
        path: "/create-post",
        component: CreatePost,
        authenticated: true,
        hasBreadcrumbs: true,
        exact: true
    },
    editPost: {
        label: "Edit Post",
        path: "/post/:id/:title/:action",
        component: CreatePost,
        authenticated: true,
        hasBreadcrumbs: true,
        exact: true
    },
    viewPost: {
        label: "View Post",
        path: "/post/:id/:title",
        component: ViewPost,
        authenticated: false,
        hasBreadcrumbs: true,
        exact: true
    }
}

export default ROUTES;