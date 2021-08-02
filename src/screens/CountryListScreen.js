import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../styles/index';
import {gloableStyles} from '../styles/gloableStyles';
import {useDispatch, useSelector} from 'react-redux';
import * as mainAction from '../store/actions/mainAction';

const CountryList = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const countryDetails = useSelector(state => state.mainReducer.countryDetails);

  useEffect(() => {
    loadDetails();
  }, []);

  //loading the details
  const loadDetails = async () => {
    setIsLoading(true);
    dispatch(mainAction.getCuntryDetails())
      .then(res => {
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('ERROR', error);
      });
  };

  const renderDomain = ({item}) => (
    <View>
      <Text style={gloableStyles.DecscriptionToText12}> {item}</Text>
    </View>
  );

  const renderitem = ({item}) => (
    <View style={styles.row}>
      <View style={styles.ProfileCart}>
        <View style={{paddingVertical: hp('3%'), paddingHorizontal: wp('4%')}}>
          <View>
            <Text style={gloableStyles.listTitile}>Name</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[
                gloableStyles.headingText16,
                {width: wp('70%'), flexWrap: 'wrap'},
              ]}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp('1%'),
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={gloableStyles.listTitile}>Country</Text>
              <Text style={gloableStyles.DecscriptionToText12}>
                {item.country}
              </Text>
            </View>
            <View>
              <Text style={gloableStyles.listTitile}>Domain</Text>
              <FlatList
                data={item.domains}
                renderItem={renderDomain}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const EmptyListMessage = ({item}) => {
    return (
      <View style={{marginLeft: wp('30%'), marginTop: hp('40%')}}>
        <Text style={gloableStyles.headingText18}>No Data Found</Text>
      </View>
    );
  };

  return (
    <View style={gloableStyles.mainContainer}>
      <View style={gloableStyles.logoContainer}>
        <Text style={gloableStyles.logoText}> UK Country List </Text>
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
                <FlatList
                  data={countryDetails}
                  maxToRenderPerBatch={6}
                  initialNumToRender={3}
                  onRefresh={loadDetails}
                  refreshing={isLoading}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={true}
                  renderItem={renderitem}
                  ListEmptyComponent={EmptyListMessage}
                />
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
    marginTop: hp('5%'),
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
  ProfileCart: {
    backgroundColor: Colors.SECONDARY_DARK,
    width: wp('88%'),
    marginTop: hp('2%'),
    borderRadius: wp('5%'),
    flexDirection: 'row',
    // paddingVertical: hp('3%'),
    // paddingHorizontal: wp('4%'),
  },
  Description: {
    paddingLeft: wp('2%'),
    width: wp('55%'),
    flexWrap: 'wrap',
  },
});

export default CountryList;
