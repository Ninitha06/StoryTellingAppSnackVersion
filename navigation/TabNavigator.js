import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { StyleSheet } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { RFValue } from 'react-native-responsive-fontsize';

import Feed from '../screens/Feed';
import CreateStory from '../screens/CreateStory';

import firebase from 'firebase';
import db from '../config';

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightTheme: true,
      isUpdated: false,
    };
  }

  changeUpdated = () => {
    this.setState({
      isUpdated: true,
    });
  };

  removeUpdated = () => {
    this.setState({
      isUpdated: false,
    });
  };

  renderStory = (props) => {
    return <CreateStory setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  renderFeed = (props) => {
    return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
  };

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
      <Tab.Navigator
        labeled={false}
        barStyle={
          this.state.lightTheme == true
            ? styles.bottomTabStyleLight
            : styles.bottomTabStyle
        }
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Story Feed') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name == 'Create a Story') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            return (
              <Ionicons
                name={iconName}
                size={30}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}
        activeColor={'#ee8249'}
        inactiveColor="gray">
        <Tab.Screen
          name="Story Feed"
          component={this.renderFeed}
           options={{unmountOnBlur: true}}
          ></Tab.Screen>
        <Tab.Screen
          name="Create a Story"
          component={this.renderStory}
           options={{unmountOnBlur: true}}
          ></Tab.Screen>
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: '#2f345d',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '8%',
    overflow: 'hidden',
    position: 'absolute',
  },
  bottomTabStyleLight: {
    backgroundColor: '#eaeaea',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '8%',
    overflow: 'hidden',
    position: 'absolute',
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});
