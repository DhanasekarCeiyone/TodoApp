import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../styles/index';
import {gloableStyles} from '../styles/gloableStyles';
import {useDispatch, useSelector} from 'react-redux';
import * as mainAction from '../store/actions/mainAction';
import DropDownPicker from 'react-native-dropdown-picker';

const StateWiseCovidDetailsScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('All');
  const [error, setError] = useState(false);
  const states = require('../constants/IndianStates.json');

  const caseDetailsList = useSelector(state => state.mainReducer.caseDetails);
  console.log("HAIIII")
  useEffect(() => {
    loadDetails();
  }, []);

  //loading the details 
  const loadDetails = async () => {
    setIsLoading(true);
    dispatch(mainAction.getCovidDetails(value))
      .then(res => {
        setIsLoading(false);
        setError(false);
        console.log('SUCCESS');
      })
      .catch(error => {
        setIsLoading(false);
        setError(true);
        console.log('ERROR', error);
      });
  };

  return (
    <View style={gloableStyles.mainContainer}>
      <View style={gloableStyles.logoContainer}>
        <Text style={gloableStyles.logoText}> COVID 19 Metrics </Text>
        <Text style={gloableStyles.logoText}> India </Text>
      </View>
      <View style={styles.btnContainer}>
        <Text style={gloableStyles.headingText16}> State </Text>
        <DropDownPicker
          schema={{
            label: 'title',
            value: 'val',
          }}
          open={open}
          value={value}
          items={states}
          setOpen={setOpen}
          setValue={setValue}
          searchable={true}
          onChangeValue={value => {
            console.log(value);
            loadDetails();
          }}
          placeholder="select State"
        />
      </View>

      <View style={styles.textContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.BUT_PRIMARY} />
        ) : (
          <View>
            {error ? (
              <View>
                <Text style={gloableStyles.logoText}>
                  {' '}
                  some failure occured!{' '}
                </Text>
                <TouchableOpacity
                  style={[gloableStyles.btnPrimary, styles.customePbtnStyle]}
                  onPress={() => loadDetails()}>
                  <Text> Try it again </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {value === 'All' ? (
                  <View>
                    <Text
                      style={[
                        gloableStyles.headingText16,
                        {
                          textAlign: 'center',
                          opacity: 0.4,
                          marginBottom: hp('2%'),
                        },
                      ]}>
                      {' '}
                      as on : {caseDetailsList.date}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: wp('80%'),
                      }}>
                      <Text style={gloableStyles.headingText20}>Confirmed</Text>
                      <Text style={gloableStyles.headingText20}>
                        {caseDetailsList.dailyconfirmed}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: wp('80%'),
                      }}>
                      <Text style={gloableStyles.headingText20}>Deceased</Text>
                      <Text style={gloableStyles.headingText20}>
                        {caseDetailsList.dailydeceased}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: wp('80%'),
                      }}>
                      <Text style={gloableStyles.headingText20}>Recovered</Text>
                      <Text style={gloableStyles.headingText20}>
                        {caseDetailsList.dailyrecovered}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={[
                        gloableStyles.headingText16,
                        {
                          textAlign: 'center',
                          opacity: 0.4,
                          marginBottom: hp('2%'),
                        },
                      ]}>
                      {' '}
                      as on : {caseDetailsList.lastupdatedtime}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: wp('80%'),
                      }}>
                      <Text style={gloableStyles.headingText20}>Confirmed</Text>
                      <Text style={gloableStyles.headingText20}>
                        {caseDetailsList.confirmed}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: wp('80%'),
                      }}>
                      <Text style={gloableStyles.headingText20}>Active</Text>
                      <Text style={gloableStyles.headingText20}>
                        {caseDetailsList.active}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: wp('80%'),
                      }}>
                      <Text style={gloableStyles.headingText20}>Recoverd</Text>
                      <Text style={gloableStyles.headingText20}>
                        {caseDetailsList.recovered}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: wp('80%'),
                      }}>
                      <Text style={gloableStyles.headingText20}>Death</Text>
                      <Text style={gloableStyles.headingText20}>
                        {caseDetailsList.deaths}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: 'center',
    marginTop: hp('10%'),
  },
  btnContainer: {
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  customePbtnStyle: {
    width: wp('75%'),
    marginVertical: hp('2%'),
    width: wp('75%'),
    justifyContent: 'center',
    padding: wp('3.4%'),
  },
});

export default StateWiseCovidDetailsScreen;
