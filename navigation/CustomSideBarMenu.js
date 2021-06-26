import * as React from 'react';

import { View, Text } from 'react-native';

import firebase from 'firebase';
import db from '../config';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default class CustomSideBarMenu extends React.Component {
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
    let props = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.lightTheme ? 'white' : '#15193c',
        }}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  }
}
