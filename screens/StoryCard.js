import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

import firebase from 'firebase';
import db from '../config';


import Ionicons from 'react-native-vector-icons/Ionicons';

export default class StoryCard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      lightTheme : true,
      story_id: this.props.story.key,
      story_data: this.props.story.value
    }
  }

  fetchTheme = async()=>{
  let theme;
    await db
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        theme = data.val().current_theme;
        this.setState({
          lightTheme: theme === 'light' ? true : false,
        });
      });
  }

  componentDidMount(){
    this.fetchTheme();
  }

  render() {
    let story = this.state.story_data;
     let images = {
        image_1: require("../images/story_image_1.png"),
        image_2: require("../images/story_image_2.png"),
        image_3: require("../images/story_image_3.png"),
        image_4: require("../images/story_image_4.png"),
        image_5: require("../images/story_image_5.png")
      };
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('StoryScreen', {
            story: story,
          })
        }>
        <View style={this.state.lightTheme == true
            ? styles.storyContainerLight : styles.storyContainer}>
          <Image
            source={images[story.preview_image]}
            style={styles.storyImage}
          />
          <View style={styles.titleContainer}>
            <Text style={this.state.lightTheme == true
            ? styles.titleTextLight : styles.titleText}>{story.title}</Text>
            <Text style={this.state.lightTheme == true
            ? styles.authorTextLight : styles.authorText}>{story.author}</Text>
            <Text style={this.state.lightTheme == true
            ? styles.descriptionLight : styles.description}>
              {story.description}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likebutton}>
              <Ionicons name="heart" color={this.state.lightTheme==true? "black": "white"} size={RFValue(30)} />
              <Text style={this.state.lightTheme == true
            ? styles.likeTextLight : styles.likeText}>{story.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  storyContainer: {
    backgroundColor: '#2f345d',
    padding: 10,
    height: undefined,
    borderRadius: 20,
    marginTop: -20,
    marginBottom: 20,
    marginVertical: 20,
  },
  storyContainerLight : {
    backgroundColor: 'white',
    padding: 10,
    height: undefined,
    borderRadius: 20,
    marginTop: -20,
    marginBottom: 20,
    marginVertical: 20,
  },
  storyImage: {
    width: '95%',
    height: RFValue(250),
    borderRadius: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(25),
    color: 'white',
  },
  titleTextLight: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(25),
    color: 'black',
  },
  authorText: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(18),
    color: 'white',
  },
  authorTextLight: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(18),
    color: 'black',
  },
  description: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(10),
    color: 'white',
  },
   descriptionLight: {
    fontFamily: 'BubbleGum-sans',
    fontSize: RFValue(10),
    color: 'black',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likebutton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
    width: RFValue(160),
    height: RFValue(40),
  },
  likeText: {
    color: 'white',
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-sans',
    fontSize: RFValue(25),
    marginTop : 6
  },
  likeTextLight: {
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-sans',
    fontSize: RFValue(25),
    marginTop : 6,
    color : 'black'
  },
});
