import React from 'react';
import { StyleSheet, StatusBar, View, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { Typography, Colors, Spacing} from '../styles/index';
  import { gloableStyles } from '../styles/gloableStyles';
  import { Logo, arrowRight, arrowBack } from '../assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AppBackbtn = ({backgroundColor, ...props}) => {
    return (
        <TouchableOpacity style={styles.backButtonConatiner} {...props}>
                <Image
                source={arrowBack}
                style={styles.backArrowStyle}
                />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    backButtonConatiner: {
        backgroundColor: Colors.SECONDARY_DARK,
        padding: wp('1%'),
        borderRadius: wp('3%'),
        width: wp('9%'),
        shadowColor: Colors.BLACK,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    backArrowStyle: {
     transform: [{scale: 0.6}],
    }
});

export default AppBackbtn;