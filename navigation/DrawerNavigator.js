import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { createDrawerNavigator } from '@react-navigation/drawer';

import firebase from 'firebase';
import db from '../config';

import StackNavigator from './StackNavigator';
import Profile from '../screens/Profile';
import Logout from '../screens/Logout';

import CustomSideBarMenu from './CustomSideBarMenu';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightTheme: true,
    };
  }

  fetchTheme = async () => {
    let theme;
    await db
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        theme = data.val().current_theme;
        this.setState({
          lightTheme: theme === 'light' ? true : false,
        });
      });
  };

  componentDidMount() {
    this.fetchTheme();
  }

  render() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          inactiveTintColor: this.state.lightTheme ? 'black' : 'white',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSideBarMenu {...props}/>}>
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}></Drawer.Screen>
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}></Drawer.Screen>
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}></Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}
