import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import * as Speech from 'expo-speech';

import firebase from 'firebase';
import db from '../config';

export default class StoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakerColor: 'gray',
      speakerIcon: 'volume-high-outline',
      lightTheme: true,
    };
  }

  initiateTTS = async (title, author, story, moral) => {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === 'gray' ? '#ee8249' : 'gray',
    });

    if (current_color === 'gray') {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak('The moral of the story is!');
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
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
     let images = {
        image_1: require("../images/story_image_1.png"),
        image_2: require("../images/story_image_2.png"),
        image_3: require("../images/story_image_3.png"),
        image_4: require("../images/story_image_4.png"),
        image_5: require("../images/story_image_5.png")
      };
    if (!this.props.route.params) {
      this.props.navigation.navigate('Home');
    } else {
      return (
        <View
          style={
            this.state.lightTheme == true
              ? styles.containerLight
              : styles.container
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.titleContainer}>
            <View style={styles.appIcon}>
              <Image
                source={require('../images/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.lightTheme == true
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }>
                Storytelling App
              </Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView
              style={
                this.state.lightTheme == true
                  ? styles.storyCardLight
                  : styles.storyCard
              }>
              <Image
                source={images[this.props.route.params.story.preview_image]}
                style={styles.image}></Image>

              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text
                    style={
                      this.state.lightTheme == true
                        ? styles.storyTitleTextLight
                        : styles.storyTitleText
                    }>
                    {this.props.route.params.story.title}
                  </Text>
                  <Text
                    style={
                      this.state.lightTheme == true
                        ? styles.storyAuthorTextLight
                        : styles.storyAuthorText
                    }>
                    {this.props.route.params.story.author}
                  </Text>
                  <Text
                    style={
                      this.state.lightTheme == true
                        ? styles.storyAuthorTextLight
                        : styles.storyAuthorText
                    }>
                    {this.props.route.params.story.created_on}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.initiateTTS(
                        this.props.route.params.story.title,
                        this.props.route.params.story.author,
                        this.props.route.params.story.story,
                        this.props.route.params.story.moral
                      )
                    }>
                    <Ionicons
                      name={this.state.speakerIcon}
                      color={this.state.speakerColor}
                      size={RFValue(30)}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.storyTextContainer}>
                <Text
                  style={
                    this.state.lightTheme == true
                      ? styles.storyTextLight
                      : styles.storyText
                  }>
                  {this.props.route.params.story.story}
                </Text>
                <Text
                  style={
                    this.state.lightTheme == true
                      ? styles.moralTextLight
                      : styles.moralText
                  }>
                  Moral - {this.props.route.params.story.moral}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons
                    name={'heart'}
                    size={RFValue(30)}
                    color={this.state.lightTheme == true ? 'black' : 'white'}
                  />
                  <Text
                    style={
                      this.state.lightTheme == true
                        ? styles.likeTextLight
                        : styles.likeText
                    }>
                    {this.props.route.params.story.likes}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
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
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  titleContainer: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'BubbleGum-sans',
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'BubbleGum-sans',
  },
  storyContainer: {
    flex: 1,
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
  },
  storyCardLight: {
    margin: RFValue(20),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    shadowColor: 'black',
    shadowOffset: {
      height: 3,
      width: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    alignSelf: 'center',
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: 'contain',
  },
  dataContainer: {
    flexDirection: 'row',
    padding: RFValue(20),
  },
  titleTextContainer: {
    flex: 0.8,
  },
  storyTitleText: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(25),
    color: 'white',
  },
  storyTitleTextLight: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(25),
    color: 'black',
  },
  storyAuthorText: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(18),
    color: 'white',
  },
  storyAuthorTextLight: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(18),
    color: 'black',
  },
  iconContainer: {
    flex: 0.2,
  },
  storyTextContainer: {
    padding: RFValue(20),
  },
  storyText: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(15),
    color: 'white',
  },
  storyTextLight: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(15),
    color: 'black',
  },
  moralText: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  moralTextLight: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeTextLight: {
    color: 'black',
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
