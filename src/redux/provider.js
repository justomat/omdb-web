import { Provider } from "react-redux";
import store from "../src/redux/store";

export default ({ children }) => <Provider store={store}>{children}</Provider>;
