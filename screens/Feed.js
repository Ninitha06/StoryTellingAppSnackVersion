import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  FlatList,
  SafeAreaView
} from 'react-native';

import StoryCard from './StoryCard';
import firebase from 'firebase';
import db from '../config';

//let stories = require('../temp.json');

import {RFValue} from 'react-native-responsive-fontsize';

export default class CreateStory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lightTheme : true,
      stories : []
    }
  }
  renderItem = ({ item: story }) => {
    return <StoryCard story={story} navigation={this.props.navigation} />;
  };

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

  fetchStories = async() =>{
    console.log("hi")
    await db.ref("posts/").on("value",snapshot => {
      let stories = [];
      if(snapshot.val()){
        Object.keys(snapshot.val()).forEach(function(key){
          stories.push({
            key : key,
            value : snapshot.val()[key]
          })
        })
        
      }
      this.setState({stories : stories});
      console.log(this.state.stories)
      this.props.setUpdateToFalse();
      
    },function(error){
      console.log("Read failed "+error.code)
    })
  }

  componentDidMount(){
    this.fetchTheme();
    this.fetchStories();
  }

  render() {
    const {stories} = this.state;
    return (
      <View style={this.state.lightTheme == true
            ? styles.containerLight : styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../images/logo.png')}
              style={{
                height: 60,
                width: 60,
                resizeMode: 'contain',
                marginLeft: 10,
              }}
            />
          </View>
          <View style={styles.titleTextContainer}>
            <Text style={this.state.lightTheme == true
            ? styles.titleTextLight : styles.titleText}>Story Telling App</Text>
          </View>
        </View>
         {!this.state.stories[0] ? (
            <View style={styles.noStories}>
              <Text
                style={
                  this.state.lightTheme
                    ? styles.noStoriesTextLight
                    : styles.noStoriesText
                }
              >
                No Stories Available
              </Text>
            </View>
          ) :
        (<View style={styles.cardContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            data={stories}
          />
        </View>)}
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
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    flex: 0.07,
  },
  iconContainer: {
    flex: 0.6,
  },
  titleTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'BubbleGum-sans',
    paddingLeft: 20,
  },
  titleTextLight: {
    color: 'black',
    fontSize: 28,
    fontFamily: 'BubbleGum-sans',
    paddingLeft: 20,
  },
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: "BubbleGum-sans"
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "BubbleGum-sans"
  }
});
