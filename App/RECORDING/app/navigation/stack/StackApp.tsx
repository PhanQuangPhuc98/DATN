import { SCREEN_ROUTER_APP, SCREEN_ROUTER } from "../../utils/Constant";
import HomeScreen from '../../Screen/Home/HomeScreen';
import ProductScreen from '../../Screen/Product/ProductScreen';
import PutCalendarScreen from '../../Screen/PutCalendar/PutCalendarScreen'
import Notification from '../../Screen/Notification/NotificationScreen';
import UserScreen from '../../Screen/User/UserScreen';
const { HOME,PRODUCT,PUTCALENDAR,NOTIFY,USER } = SCREEN_ROUTER_APP
export default {
    [HOME]: HomeScreen,
    [PRODUCT]:ProductScreen,
    [PUTCALENDAR]:PutCalendarScreen,
    [NOTIFY]: Notification,
    [USER]: UserScreen,
}