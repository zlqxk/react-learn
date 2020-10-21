import Home from "../pages/Home";
import One from "../pages/One";
import Two from "../pages/Two";
import Three from "../pages/Three";
import Four from "../pages/Four";

const routeMap = [
  { path: "/", component: Home, exact: true },
  { path: "/One", component: One },
  { path: "/Two", component: Two },
  { path: "/Three", component: Three },
  { path: "/Four", component: Four },
];

export default routeMap;
