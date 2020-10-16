import Home from "../pages/Home";
import One from "../pages/One";
import Two from "../pages/Two";

const routeMap = [
  { path: "/", component: Home, exact: true },
  { path: "/One", component: One },
  { path: "/Two", component: Two },
];

export default routeMap;
