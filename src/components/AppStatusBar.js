import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const AppStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={[styles.statusBar, backgroundColor]}>
            <StatusBar backgroundColor={backgroundColor} {...props} />
        </View>
    );
};


const styles = StyleSheet.create({
    statusBar: {
        height: hp('1.5%')
    },
});

export default AppStatusBar;