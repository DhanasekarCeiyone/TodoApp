import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Alert 
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Typography, Colors} from '../styles/index';
import {gloableStyles} from '../styles/gloableStyles';
import { set } from 'react-native-reanimated';

const HomeScreen = ({navigation}) => {

  const [task, setTask] = useState('');
  const [newTags, setNewTags] = useState('');
  const [isSearchActive, setSearchActive] = useState(false);
  const taskInput = useRef();
  const tagInput = useRef();
  const textSearch =  useRef();
  const [searchList, setSearchList] = useState([]);
  const [taskId, setTaskId] = useState();
  const [isTagVisible, setIsTagVisible] = useState(false)
  const [catagories, setCatagories] = useState([
    {
      id: '1',
      task: '11:30 Board Meeting',
      tags: [
        {
          tagId: 1,
          tagName: 'home',
        },
        {
          tagId: 2,
          tagName: 'work',
        },
      ],
    },
  ]);

  // Add new Task
  const addNewTask = () => {
      if(task.trim() === "" || undefined) {
        Alert.alert(
            "Error",
            "Kindly Type Something",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
      } else {
        var obj = {};
        obj['id'] = catagories.length + 1;
        obj['task'] = task.trim();
        obj['tags'] = [];
        setCatagories([...catagories, obj]);
        taskInput.current.clear();
      }
  };

  // Delete Task
  let temList = [...catagories];
  const deleteTask = index => {
    temList.splice(index, 1);
    setCatagories(temList);
  };

  //search Task
  let temp = [];
  const searchTags = value => {
    setSearchActive(true);
    catagories.map(item => {
      if (item.tags.length !== 0) {
        item.tags.filter(tags => {
          if (tags.tagName.toLowerCase() === value.toLowerCase()) {
            temp.push(item);
            setSearchList(temp);
          } else {
            setSearchList(temp);
          }
        });
      }
    });
  };

  //submit tags value

  const submitTags = () => {

    if(newTags.trim() === "" || undefined) {
      Alert.alert(
          "Error",
          "Kindly Type Something",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
    } else { 

    setIsTagVisible(false)
    setSearchActive(false);
    var tagStr = newTags;
    var tagStrArray = tagStr.split(',');


    catagories.filter((item, index) => {
        if(item.id === taskId) {
            let tempTags = item.tags

            for(var i = 0; i < tagStrArray.length; i++) {
              tagStrArray[i] = tagStrArray[i].replace(/^\s*/, "").replace(/\s*$/, "");
                    var obj = {};
                    obj['tagId'] = tempTags.length+1;
                    obj['tagName'] = tagStrArray[i];
                    tempTags.push(obj)
            }

            temList[index].tags = tempTags
            setCatagories(temList)
        }
    })
  }
  }

  //Add tags in perticular list
  const addTags = (value) => {
    setTaskId(value)
    setIsTagVisible(true)
  }

  const renderTags = ({item}) => (
    <View style={{marginHorizontal: wp('4%')}}>
      <Text style={gloableStyles.DecscriptionToText12}> {item.tagName}</Text>
    </View>
  );
  const EmptyList = () => (
    <View style={{marginHorizontal: wp('4%'), flexDirection: 'row', justifyContent:'center'}}>
    <Text style={gloableStyles.DecscriptionToText12}> No data found </Text>
   </View>
  )
  const renderCard = ({item, index}) => (
    <TouchableOpacity style={[styles.mainCart, styles.activeBorder]}>
      <View>
        <Text style={gloableStyles.DecscriptionToText}> {item.task}</Text>
        <FlatList
          data={item.tags}
          renderItem={renderTags}
          keyExtractor={item => item.tagId}
        />
      </View>
      <TouchableOpacity
        style={[gloableStyles.btnPrimary, styles.customePbtnStyle]}
        onPress={() => addTags(item.id)}>
        <Text style={gloableStyles.btnPrimaryText}> + tag </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[gloableStyles.btnPrimary, styles.customePbtnStyle]}
        onPress={() => deleteTask(index)}>
        <Text style={gloableStyles.btnPrimaryText}> Delete </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.MainContainer}>
      <View style={styles.ProfileContainer}>
        <View style={styles.ProfileStyle}>
          <Text style={styles.homeHeading}> My Todo List </Text>
        </View>
      </View>
      { ! isTagVisible ? (
               <View style={{marginTop: hp('2%')}}>
               <View style={styles.InputGroup}>
                 <TextInput
                   style={gloableStyles.inputStyle}
                   placeholder="search"
                   placeholderTextColor="#fff"
                   onChangeText={value => searchTags(value)}
                   ref = {textSearch}
                 />
                 <TouchableOpacity
                   style={{position: 'absolute', top: hp('2%'), right: wp('10%')}}
                   onPress={() => {setSearchActive(false), textSearch.current.clear()  }}>
                   <Text style={gloableStyles.DecscriptionToText12}> Cancel </Text>
                 </TouchableOpacity>
               </View>
               {
                   ! isSearchActive && (
                       <View>
                       <View style={[styles.InputGroup, {marginVertical: hp('2%')}]}>
                           <TextInput
                             style={gloableStyles.inputStyle}
                             placeholder="Enter Your Task"
                             placeholderTextColor="#fff"
                             onChangeText={value => setTask(value)}
                             ref={taskInput}
                           />
                         </View>
                       <View style={{marginHorizontal: wp('3%')}}>
                               <TouchableOpacity
                                   style={[gloableStyles.btnPrimary, styles.customePbtnStyle]}
                                   onPress={() => addNewTask()}>
                                   <Text style={gloableStyles.btnPrimaryText}> Add Task </Text>
                               </TouchableOpacity>
                       </View>
                       </View>
                   )
               }
             
              
             
               <View style={styles.bodyContainer}>
                 <FlatList
                   data={!isSearchActive ? catagories : searchList}
                   renderItem={(item, index) => renderCard(item, index)}
                   keyExtractor={item => item.id}
                   ListEmptyComponent={EmptyList}
                 />
               </View>
             </View>

      ) : (

        <View>
        <View style={[styles.InputGroup, {marginVertical: hp('2%')}]}>
            <TextInput
              style={gloableStyles.inputStyle}
              placeholder="Enter Your Task"
              placeholderTextColor="#fff"
              onChangeText={value => setNewTags(value)}
              ref={tagInput}
            />
          </View>
            <View style={{marginHorizontal: wp('3%')}}>
                    <TouchableOpacity
                        style={[gloableStyles.btnPrimary, styles.customePbtnStyle]}
                        onPress={() => submitTags()}>
                        <Text style={gloableStyles.btnPrimaryText}> Add  </Text>
                    </TouchableOpacity>
            </View>
        </View>
      )
        
      }
 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    textAlign: 'center',
    alignSelf: 'stretch',
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  row: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  bodyContainer: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    marginBottom: hp('10%')
  },

  ProfileContainer: {
    flexDirection: 'row',
  },
  ProfileStyle: {
    flexDirection: 'row',
    width: wp('100%'),
    paddingBottom: hp('2%'),
    borderColor: '#717272',
    borderBottomWidth: hp('0.05%'),
    justifyContent: 'center',
  },

  actBtnIcon: {
    transform: [{scale: 1.2}],
    marginTop: hp('1.5%'),
    marginLeft: wp('3%'),
  },
  gameBtnStyle: {
    transform: [{scale: 0.7}],
    marginTop: hp('1%'),
    marginLeft: wp('1%'),
  },
  storiesItem: {
    paddingVertical: hp('1%'),
  },
  storiesDes: {
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  homeHeading: {
    ...Typography.FONT_SEMIBOLD,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.WHITE,
    paddingHorizontal: wp('3%'),
    paddingBottom: hp('1%'),
  },
  mainCart: {
    backgroundColor: Colors.SECONDARY_DARK,
    borderRadius: wp('3%'),
    width: wp('95%'),
    marginHorizontal: wp('1%'),
    marginVertical: hp('1.5%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    justifyContent: 'space-between',
  },
  cartIcon: {
    transform: [{scale: 0.6}],
  },
  activeBorder: {
    // borderColor: Colors.BUT_PRIMARY,
    borderWidth: wp('0.3%'),
  },
  customePbtnStyle: {
    marginVertical: hp('2%'),
    justifyContent: 'center',
    padding: wp('3.4%'),
    height: hp('6%')
  },
});

export default HomeScreen;
