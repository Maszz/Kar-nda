import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ZStack} from 'native-base';
import DebugScreen from './DebugScreen';
import {useTranslation} from 'react-i18next';
import SettingScreen from './SettingScreen';
import HomeScreen from './HomeScreen';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Box, Button} from 'native-base';
import {useDispatch, useSelector, connect} from 'react-redux';
import {Styles} from '../styles';

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerScreenComponent = ({navigationState}) => {
  const {t} = useTranslation();
  const [currentDate, setCurrentDate] = useState({day: 0, month: 0, year: 0});
  const month = [
    t('month:january'),
    t('month:february'),
    t('month:march'),
    t('month:april'),
    t('month:may'),
    t('month:june'),
    t('month:july'),
    t('month:august'),
    t('month:september'),
    t('month:october'),
    t('month:november'),
    t('month:december'),
  ];

  useEffect(() => {
    let tempObj = {};
    const currenDate = new Date(Date.now());
    tempObj.day = currenDate.getDate();
    tempObj.month = currenDate.getMonth();
    tempObj.year = currenDate.getFullYear();
    setCurrentDate(tempObj);
  }, []);
  return (
    <>
      <StatusBar
        translucent
        animated={true}
        barStyle={'light-content'}
        networkActivityIndicatorVisible={true}
        backgroundColor="transparent"
        showHideTransition="slide"
      />
      <Drawer.Navigator
        // drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#334155',
          },
          unmountOnBlur: true,
          drawerStatusBarAnimation: 'slide',
          drawerActiveTintColor: 'gray',
          drawerLabelStyle: {color: Styles.globalStyles.textPrimaryColor},
          headerStyle: {
            backgroundColor: '#1F2937',
          },
        }}>
        <Drawer.Screen
          name="Calendar"
          r
          component={HomeScreen}
          // options={{headerShown: false}}
          options={{
            title: `${t('common:calendar')}`,
            headerTitle: `${currentDate.day} ${month[currentDate.month]} ${
              currentDate.year
            }`,
            headerRight: () => {
              return (
                <TouchableOpacity style={{marginRight: 8}}>
                  <Button
                    variant="unstyled"
                    onPress={() => {
                      navigationState.navigation.navigate('WeekSummary');
                    }}>
                    <Image
                      source={require('../assets/weekSummaryIcon.png')}
                      style={{width: 15, height: 15}}
                    />
                  </Button>
                </TouchableOpacity>
              );
            },

            headerTitleStyle: {color: Styles.globalStyles.textPrimaryColor},
          }}
        />

        {/* <Drawer.Screen
        name="All to do list "
        component={Article}
        options={{ title: `${t('common:allTodoList')}` }}
      /> */}

        {/* <Drawer.Screen
        name="All Event"
        component={AllEventScreen}
        options={{ title: `${t('common:allEvent')}` }}
      /> */}
        {/* <Drawer.Screen
          name="Setting Test"
          component={DebugScreen}
          options={{
            headerShown: false,
            title: 'Debug',
            drawerLabelStyle: {color: 'white'},
          }}
        /> */}
        <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            headerShown: false,
            title: `${t('common:setting')}`,
            drawerLabelStyle: {color: Styles.globalStyles.textPrimaryColor},
          }}
        />

        {/* <Drawer.Screen name="Test" component={TestScreen} />
      <Drawer.Screen name="Test2" component={TestScreen2} options={{ title: "tet", headerTitle: monthCalendarState.month + ' ' + monthCalendarState.year }}
      /> */}
      </Drawer.Navigator>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    navigationState: state.StackNavigation,
  };
};
export default connect(mapStateToProps)(DrawerScreenComponent);
