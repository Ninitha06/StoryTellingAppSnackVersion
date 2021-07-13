import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Switch,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config';

import firebase from 'firebase';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      name: '',
      lightTheme: true,
      profile_image: '',
    };
  }

  fetchUser = async () => {
    let theme, full_name, profileImg;
    await db
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        theme = data.val().current_theme;
        full_name = `${data.val().first_name} ${data.val().last_name}`;
        profileImg = data.val().profile_picture;

        this.setState({
          lightTheme: theme === 'light' ? true : false,
          profile_image: profileImg,
          isEnabled: theme === 'light' ? false : true,
          name: full_name,
        });
      });
  };

  componentDidMount() {
    this.fetchUser();
  }
  toggleSwitch = () => {
    var newState = this.state.lightTheme == true ? 'dark' : 'light';
    console.log('Triggered ' + newState);
    db.ref('users/' + firebase.auth().currentUser.uid).update({
      current_theme: newState,
    });

    this.setState({
      lightTheme: this.state.lightTheme == true ? false : true,
      isEnabled: this.state.isEnabled == false ? true : false,
    });
  };
  render() {
    return (
      <View
        style={
          this.state.lightTheme == true
            ? styles.containerLight
            : styles.container
        }>
        <SafeAreaView style={styles.droidSafeArea}>
          <View style={styles.titleContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../images/logo.png')}
                style={styles.icon}
              />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={
                  this.state.lightTheme == true
                    ? styles.titleTextLight
                    : styles.titleText
                }>
                {'StoryTelling App'}
              </Text>
            </View>
          </View>
          <View style={styles.screenContainer}>
            <View style={styles.profilePicContainer}>
              <Image
                source={{ uri: this.state.profile_image }}
                style={styles.profileImage}
              />
              <Text
                style={
                  this.state.lightTheme == true
                    ? styles.nameTextLight
                    : styles.nameText
                }>
                {this.state.name}
              </Text>
            </View>
            <View style={styles.themeContainer}>
              <Text
                style={
                  this.state.lightTheme == true
                    ? styles.themeTextLight
                    : styles.themeText
                }>
                Dark Theme
              </Text>
              <Switch
                style={{ transform: [{ scaleX: 1.3}, {scaleY: 1.3 }] }}
                trackColor={{ false: '#767577', true: 'white' }}
                thumbColor={this.state.isEnabled ? '#ee8249' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.toggleSwitch()}
                value={this.state.isEnabled}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    flex: 1,
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  titleContainer: {
    flex: 0.1,
    flexDirection: 'row',
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  titleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'BubbleGum-sans',
    textAlign: 'center',
  },
  titleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'BubbleGum-sans',
    textAlign: 'center',
  },
  profilePicContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(20),
  },
  screenContainer: {
    flex: 0.9,
  },
  profileImage: {
    height: RFValue(140),
    width: RFValue(140),
    borderRadius: RFValue(70),
  },
  nameText: {
    marginTop: RFValue(10),
    fontSize: RFValue(40),
    fontFamily: 'BubbleGum-sans',
    color: 'white',
  },
  nameTextLight: {
    marginTop: RFValue(10),
    fontSize: RFValue(40),
    fontFamily: 'BubbleGum-sans',
    color: 'black',
  },
  themeText: {
    color: 'white',
    fontSize: RFValue(30),
    fontFamily: 'BubbleGum-sans',
    marginRight: RFValue(15),
  },
  themeTextLight: {
    color: 'black',
    fontSize: RFValue(30),
    fontFamily: 'BubbleGum-sans',
    marginRight: RFValue(15),
  },
});
