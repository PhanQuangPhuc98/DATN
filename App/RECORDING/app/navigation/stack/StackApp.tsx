import { SCREEN_ROUTER_APP } from "../../utils/Constant";
import HomeScreen from '../../Screen/Home/HomeScreen';
import Notification from '../../Screen/Notification/NotificationScreen';
import UserScreen from '../../Screen/User/UserScreen'
const {
    HOME,
    NOTIFY,
    USER
} = SCREEN_ROUTER_APP;
export default {
    [HOME]: HomeScreen,
    [NOTIFY]: Notification,
    [USER]: UserScreen
}