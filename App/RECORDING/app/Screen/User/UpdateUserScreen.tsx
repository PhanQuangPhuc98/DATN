import React, { useState,useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import FastImage from 'react-native-fast-image';
import images from '../../assets/imagesAsset';
import R from '../../assets/R';
import { colors } from '../../constants/Theme';
import { firebase, database } from '../../firebase/firebaseSvc';
import NavigationUtil from '../../navigation/NavigationUtil';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { DataCity } from '../../constants/Mockup'
import { Header, CheckBox } from "react-native-elements";
import Fire from '../../firebase/firebaseSvc';
import ScreenComponent from '../../components/ScreenComponent'
import { Label } from 'native-base';
import { set } from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={images.ic_back}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            <Text style={styles.TextHeader}>{R.string.update_user}</Text>
        </TouchableOpacity>
    );
};
const RenderInput = (Label,value) => {
    return (
        <View>
            <Text style={[styles.TextInfor]}>
                {Label}
            </Text>
            <TextInput
            value={value}
            style={styles.TextInputStyle}>

            </TextInput>
        </View>
    )
}
// const RenderDate = (date, setDate) => {
//     return (
//         <View>
//             <DatePicker
//                 date={date}
//                 onDateChange={setDate}
//             />
//         </View>
//     )
// }
const RenderSex = (title,checked, onPress) => {
    return (
        <View>
            <CheckBox
                title={title}
                containerStyle={{ backgroundColor: "white" }}
                uncheckedIcon='circle-o'
                checkedIcon='dot-circle-o'
                checked={checked}
                checkedColor={colors.Sienna1}
                onPress={onPress}
            />
        </View>
    )
}
const RenderAdress = (label,Data,onSelectedItemsChange, selectedItems,Adress) => {
    return (
        <View>
            <Text style={styles.TextLable}>{label}</Text>
            <SectionedMultiSelect
                items={Data}
                IconRenderer={Icon}
                single={true}
                uniqueKey="name"
                // subKey="DataCity"
                confirmText={R.string.confirm}
                selectText={Adress}
                readOnlyHeadings={false}
                showCancelButton={true}
                showChips={true}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                ref={(SectionedMultiSelect) =>
                    (SectionedMultiSelect = SectionedMultiSelect)
                }
            />
        </View>
    )
}
const Confirm = (onPress) => {
    return (
      <View>
        <TouchableOpacity onPress={onPress} style={styles.ContainerConfirm}>
          <Text style={styles.TextConfirm}>{R.string.confirm}</Text>
        </TouchableOpacity>
      </View>
    );
  };
const UpdateUserScreen = () => {
    const [date, setDate] = useState(new Date())
    const [checked, setChecked] = useState(false);
    const [Password, setPassword] = useState(true);
    const [payload, setPayload] = useState({
        _id: '',
        Name: '',
        Email: '',
        Password: '',
        Phone: '',
        Sex: '',
        Birth_Day: '',
        Category: '0',
        City: '',
        District: '',
        Address: ''
    })
    useEffect(() => {
        const onValueChange = database()
          .ref('/users/' + Fire.uid)
          .on('value', (snapshot) => {
            setPayload({
              ...payload,
              _id: snapshot.val()._id,
              Name: snapshot.val().name,
              Category: snapshot.val().Category,
              Email: snapshot.val().email,
              Phone: snapshot.val().Phone,
              Sex: snapshot.val().Sex,
              Birth_Day: snapshot.val().Birth_Day,
              City: snapshot.val().City,
              District: snapshot.val().District,
              Address: snapshot.val().Address,
            });
          });
      }, [])
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                leftComponent={Back(() => {
                    NavigationUtil.goBack();
                })}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                children={
                    <SafeAreaView style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                        {RenderInput(R.string.name,payload.Name)}
                        {RenderInput(R.string.phone,payload.Phone)}
                        {RenderInput(R.string.email,payload.Email)}
                        {/* {RenderDate(date, setDate)} */}
                        <View style={{ flexDirection: "row", backgroundColor: 'white' }}>
                            <Text style={[styles.TextInfor,{marginTop:15}]}>
                                {R.string.Sex}
                            </Text>
                            {RenderSex(R.string.Boy,checked, () => {
                                setPayload({
                                    ...payload,
                                    _id: '1',
                                }),
                                    setChecked(!checked)
                            })}
                            {RenderSex(R.string.Girl,checked ? false : true, () => {
                                setPayload({
                                    ...payload,
                                    _id: '0',
                                }),
                                    setChecked(!checked)
                            })}
                        </View>
                        {RenderAdress(R.string.city)}
                        {RenderAdress(R.string.District)}
                        {RenderInput(R.string.Address,payload.Address)}
                        {Confirm()}
                    </SafeAreaView>
                }
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Container: { flex: 1 },
    Title: {
        fontSize: 18,
        fontFamily: R.fonts.bold,
        color: colors.white,
        width: 100,
    },
    AvatarStyle: { borderRadius: 40 },
    HeaderPerson: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: height / 10,
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginBottom: 5,
    },
    TextName: { fontSize: 16, fontFamily: R.fonts.bold },
    ImgScreen: { height: 19, width: 30 },
    ContainerScreen: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 55,
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    ContainerLine: {
        borderWidth: 0.65,
        marginHorizontal: 24,
        borderColor: colors.line,
    },
    HeaderBack: { flexDirection: 'row', width: width },
    ic_Back: { height: 16, width: 10, marginTop: 10, marginRight: 15 },
    TextHeader: {
        fontSize: 18,
        fontFamily: R.fonts.bold,
        color: colors.white,
        marginTop: 5,
    },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
    TextLable: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.focus, },
    TextInfor: {
        fontSize: 15,
        fontFamily: R.fonts.bold,
        color: colors.focus
    },
    TextConfirm: {fontSize: 14, fontFamily: R.fonts.bold, color: colors.white},
    ContainerConfirm: {
        height: 46,
        backgroundColor: colors.Sienna1,
        borderRadius: 30,
        width: 330,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50,
        marginHorizontal: 10,
      },
    TextInputStyle: { borderBottomWidth: 0.5, width: 328, borderColor: colors.focus },
})
export default UpdateUserScreen