import { SCREEN_ROUTER_AUTH } from "../../utils/Constant";
import LoginScreen from '../../Screen/Authentication/LoginScreen';
import ForgotPassScreen from '../../Screen/Authentication/ForgotPassScreen';
import RegisterScreen from '../../Screen/Authentication/RegisterScreen';
import SplashScreen from '../../Screen/Authentication/SplashScreen'
const {
    LOGIN,
    FORGOT_PASS,
    REGISTER,
} = SCREEN_ROUTER_AUTH;
export default {
    [LOGIN]: LoginScreen,
    [FORGOT_PASS]: ForgotPassScreen,
    [REGISTER]: RegisterScreen,
}