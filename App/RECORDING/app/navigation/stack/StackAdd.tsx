import { SCREEN_ROUTER_APP, SCREEN_ROUTER, SCREEN_ROUTER_APP_ADD } from "../../utils/Constant";
import UserAddScreen from '../../Screen/AddStudio/Account/UserAddScreen';
import InforUserAddScreen from '../../Screen/AddStudio/Account/InforUserAddScreen';
import UpdateUserAddScreen from '../../Screen/AddStudio/Account/UpdateUserAddScreen';
import UpdateInTroStudioScreen from '../../Screen/AddStudio/Account/UpdateInTroStudioScreen';
import UpdatePricePutCalendarScreen from '../../Screen/AddStudio/Account/UpdatePricePutCalendarScreen';
import ChangePassAdd from '../../Screen/AddStudio/Account/ChangePassAdd';
import RevenueScreen from '../../Screen/AddStudio/Account/RevenueScreen';
import DetailUserScreen from '../../Screen/AddStudio/ManyUser/DetailUserScreen';
import ManyUserScreen from '../../Screen/AddStudio/ManyUser/ManyUserScreen';
import ChatScreen from '../../Screen/AddStudio/Messages/ChatScreen';
import ListChatScreen from '../../Screen/AddStudio/Messages/ListChatScreen';
import NotificationScreen from '../../Screen/AddStudio/Notification/NotificationScreen';
const {
    CHANGEPASSADD,
    CHATADD,
    DETAILUSER,
    INFORUSERADD,
    LISTCHATADD,
    MANYUSER,
    NOTIFICATION,
    REVENUEADD,
    UPDATEINTROADD,
    UPDATEPRICEADD,
    UPDATEUSERADD,
    USERADD,
} = SCREEN_ROUTER_APP_ADD;
export default {
  [MANYUSER]: ManyUserScreen,
  [DETAILUSER]: DetailUserScreen,
  [LISTCHATADD]: ListChatScreen,
  [CHATADD]: ChatScreen,
  [NOTIFICATION]: NotificationScreen,
  [USERADD]: UserAddScreen,
  [INFORUSERADD]: InforUserAddScreen,
  [UPDATEINTROADD]: UpdateInTroStudioScreen,
  [REVENUEADD]: RevenueScreen,
  [UPDATEPRICEADD]:UpdatePricePutCalendarScreen,
  [UPDATEUSERADD]:UpdateUserAddScreen,
  [CHANGEPASSADD]:ChangePassAdd,
};