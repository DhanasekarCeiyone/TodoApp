import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Typography, Colors, Spacing} from '../styles/index';
import {gloableStyles} from '../styles/gloableStyles';
import {FONT_SIZE_14} from '../styles/typography';
import {useForm, Controller} from 'react-hook-form';
import { eye, eyeClose} from '../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';

const schema = yup.object().shape({
  emailId: yup.string().trim().required().email(),
  password: yup.string().trim().required(),
});


const LoginScreen = ({navigation}) => {

  const dispatch = useDispatch();
  //* STATES * //
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [alertContent, setAlertContent] = useState({
    status: false,
    title: '',
    message: '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

 

  const onSubmit = data => {
    console.log("data", data)
    if(data.emailId === "admin123@gmail.com" && data.password === "admin@123") {
      setAlertContent({
        status: true,
        message: "Login Success"
      });
      setTimeout(() => {
        setAlertContent({
          status: false,
        });
        navigation.navigate('listScreen')
      }, 500)
    

      }
    else {
        setAlertContent({
            status: true,
            message: "Kindly check credentials"
        });
        setTimeout(() => {
            setAlertContent({
                status: false,
            });
        }, 500)
    }
  };



  const chageToText = () => {
    if (passwordSecure) {
      setPasswordSecure(false);
    } else {
      setPasswordSecure(true);
    }
  };

  if (isLoading) {
    return (
      <View
        style={[
          gloableStyles.Activitycontainer,
          gloableStyles.Activityhorizontal,
        ]}>
        <ActivityIndicator size="large" color={Colors.BUT_PRIMARY} />
      </View>
    );
  } else {
    return (

        <ScrollView style={gloableStyles.mainContainer}>
          {/* ALERT MESSAGE START */}
          <AwesomeAlert
            show={alertContent.status}
            showProgress={false}
            title={alertContent.title}
            message={alertContent.message}
            closeOnTouchOutside={false}
            contentContainerStyle={gloableStyles.alertContainer}
            titleStyle={gloableStyles.alertContentStyle}
            messageStyle={gloableStyles.alertContentStyle}
            closeOnHardwareBackPress={false}
          />
          {/* ALERT MESSAGE END*/}

          <View style={styles.textContainer}>
            <Text style={styles.loginToText}> Login </Text>
          </View>
          <View style={gloableStyles.textInputContainer}>
            <View style={gloableStyles.textInputGroup}>
              {/* { loginStatus=== false && <Text style={[gloableStyles.messageBlue, styles.customeMessage]}> {errorMessage} </Text> } */}
              <Text style={gloableStyles.inputLable}>Enter your mail ID</Text>
              <Controller
                control={control}
                render={({field: {onChange,value}}) => (
                  <TextInput
                    style={gloableStyles.inputStyle}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="example@gmail.com"
                    placeholderTextColor={Colors.GRAY_DARK}
                  />
                )}
                name="emailId"
                defaultValue=""
              />
              {errors.emailId && (
                <Text style={gloableStyles.messageBlue}>
                  {' '}
                  Kindly enter valid Email Id{' '}
                </Text>
              )}
            </View>
            <View style={gloableStyles.textInputGroup}>
              <Text style={gloableStyles.inputLable}>Enter your Password</Text>
              <Controller
                control={control}
                render={({field: {onChange,value}}) => (
                  <TextInput
                    style={gloableStyles.inputStyle}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="password"
                    placeholderTextColor={Colors.GRAY_DARK}
                    secureTextEntry={passwordSecure}
                  />
                )}
                name="password"
                defaultValue=""
              />
              <TouchableOpacity
                style={gloableStyles.passwordEyeIcon}
                onPress={() => chageToText()}>
                <Image source={passwordSecure ? eyeClose : eye} />
              </TouchableOpacity>
              {errors.password && (
                <Text style={gloableStyles.messageBlue}>
                 
                  Password is required
                </Text>
              )}
            </View>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[gloableStyles.btnPrimary, styles.customePbtnStyle]}
              onPress={handleSubmit(onSubmit)}>
              <Text style={gloableStyles.btnPrimaryText}> Login </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
   
    );
  }
};

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: 'flex-start',
    marginTop: hp('5%'),
  },
  btnContainer: {
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  welcomeText: {
    ...Typography.FONT_SEMIBOLD,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_24,
  },
  customeMessage: {
    textAlign: 'center',
    marginTop: hp('-4%'),
    paddingBottom: hp('1%'),
  },
  rightArrow: {
    display: 'flex',
    position: 'absolute',
    right: wp('5%'),
  },
  customePbtnStyle: {
    width: wp('90%'),
    marginVertical: hp('1.5%'),
    justifyContent: 'center',
    padding: wp('3.4%'),
  },
  loginToText: {
    ...Typography.FONT_LIGHT,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    paddingTop: hp('0.5%'),
  },
  notaMember: {
    ...Typography.FONT_LIGHT,
    color: Colors.WHITE,
    fontSize: FONT_SIZE_14,
    textAlign: 'center',
    paddingTop: hp('2%'),
  },
});

export default LoginScreen;