import React, {Component} from 'react';
import StartScreen from './StartScreen';
import WaitScreen from './WaitScreen';
import { createStackNavigator } from 'react-navigation';

export default class App extends Component {

  state = {
    tipo: 'A',
    notify: false,
    doc: null
  }

  render(){
    return(
      <RootStack />
    );
  }

}

const RootStack = createStackNavigator(
    {
        Start: StartScreen,
        Wait: WaitScreen,
    },
    {
        initialRouteName: 'Start',
        navigationOptions: {
            headerStyle: {
                display: 'none'
            }
        }
    }
);


