import { SCREEN_ROUTER_APP, SCREEN_ROUTER,SCREEN_ROUTER_APP_ADD } from "../../utils/Constant";
import HomeScreen from '../../Screen/Home/HomeScreen';
import ProductScreen from '../../Screen/Product/ProductScreen';
import PutCalendarScreen from '../../Screen/PutCalendar/PutCalendarScreen'
import Notification from '../../Screen/Notification/NotificationScreen';
import UserScreen from '../../Screen/User/UserScreen';
import NotificationAddScreen from '../../Screen/AddStudio/Notification/NotificationScreen';
import ListChatAddScreen from '../../Screen/AddStudio/Messages/ListChatScreen';
import ManyUserAddScreen from '../../Screen/AddStudio/ManyUser/ManyUserScreen';
import UserAddScreen from '../../Screen/AddStudio/Account/UserAddScreen';
const { HOME,PRODUCT,PUTCALENDAR,NOTIFY,USER } = SCREEN_ROUTER_APP
const { USERADD,MANYUSER,LISTCHATADD,NOTIFICATION } = SCREEN_ROUTER_APP_ADD
export default {
    [HOME]: HomeScreen,
    [PRODUCT]:ProductScreen,
    [PUTCALENDAR]:PutCalendarScreen,
    [NOTIFY]: Notification,
    [USER]: UserScreen,
    [USERADD]:UserAddScreen,
    [MANYUSER]:ManyUserAddScreen,
    [LISTCHATADD]:ListChatAddScreen,
    [NOTIFICATION]:NotificationAddScreen
}