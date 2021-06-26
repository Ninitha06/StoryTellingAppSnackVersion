import * as React from 'react';
import { Text, View } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component {
  checkIfLoggedIn=()=>{
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.props.navigation.navigate("Dashboard")
      }
      else{
        this.props.navigation.navigate("Login")
      }
    })
  }

  componentDidMount(){
    this.checkIfLoggedIn();
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
}
