import { SCREEN_ROUTER_APP, SCREEN_ROUTER } from "../../utils/Constant";
import HomeScreen from '../../Screen/Home/HomeScreen';
import ProductScreen from '../../Screen/Product/ProductScreen';
import PutCalendarScreen from '../../Screen/PutCalendar/PutCalendarScreen'
import Notification from '../../Screen/Notification/NotificationScreen';
import UserScreen from '../../Screen/User/UserScreen';
import SearchScreen from '../../Screen/Home/SearchScreen'
import ChatScreen from '../../Screen/Chat/ChatScreen';
import ChangePassScreen from '../../Screen/User/ChangePassScreen';
import InforUserScreen from '../../Screen/User/InforUserScreen';
import ListCHatScreen from '../../Screen/Chat/ListCHatScreen';
import PostAvatarScreen from '../../Screen/User/PostAvatarScreen'
import UpdateUserScreen from '../../Screen/User//UpdateUserScreen'
const {
  HOME,
  PRODUCT,
  PUTCALENDAR,
  NOTIFY,
  USER,
  SEARCH,
  CHAT,
  CHANGEPASS,
  INFORUSER,
  LISTCHAT,
  ADPOST,
  UPDATEUSER
} = SCREEN_ROUTER_APP;
export default {
  [HOME]: HomeScreen,
  [PRODUCT]: ProductScreen,
  [PUTCALENDAR]: PutCalendarScreen,
  [NOTIFY]: Notification,
  [USER]: UserScreen,
  [SEARCH]: SearchScreen,
  [CHAT]: ChatScreen,
  [CHANGEPASS]: ChangePassScreen,
  [INFORUSER]: InforUserScreen,
  [LISTCHAT]:ListCHatScreen,
  [ADPOST]:PostAvatarScreen,
  [UPDATEUSER]:UpdateUserScreen
};