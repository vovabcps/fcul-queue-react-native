import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Switch} from 'react-native';
import {Button} from 'react-native-elements';
import styles from './Styles.js';
import SecretariaApi from './api/SecretariaApi';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import NetworkState, { Settings } from 'react-native-network-state'

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});


export default class WaitScreen extends Component {

    state = {
        params: this.props.navigation.state.params,
        isLoading: true,

    };

    apiCall = () => {
        SecretariaApi.get(this.state.params.tipo).then(resp => {
            this.setState({
                senha_atual: resp.actual_ticket,
                alualizado_as: resp.updated_at,
                layoutOne: true
            })
        })
            .catch((err)=>console.log(err))
    };

    componentDidMount() {
        this.apiCall();
        this.setState({isLoading: false, sendNotification: true});
        this.interval = BackgroundTimer.setInterval(() => {
            this.apiCall();
        }, 1000);
    }

    componentDidUpdate() {
        let falta = this.state.params.senha - this.state.senha_atual;
        if (falta < 4 && this.state.sendNotification && this.state.params.notify) {
            PushNotification.localNotification({
                id: '7878',
                vibrate: true,
                playSound: true,
                message: "Senha atual: " + this.state.senha_atual.toString(),
            });
            this.setState({sendNotification: false})
        }
    }

    componentWillUnmount() {
        BackgroundTimer.clearInterval(this.interval);
        PushNotification.cancelLocalNotifications({id: '7878'});
    }

    calculateWaitTime() {
        let res = (this.state.params.senha - this.state.senha_atual) * 5;
        return res > 0 ? res : 0;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator
                        size="large"
                    />
                </View>
            )
        }
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <NetworkState
                    txtDisconnected='Erro na conexão á rede'
                />
                {this.state.error?conn_err:null}
                
                <Text style={styles.wait_descr}>Vossa senha:</Text>
                <Text style={styles.text}>{this.state.params.senha}</Text>

                <Text style={styles.wait_descr}>Senha atual: </Text>
                <Text style={styles.text}>{this.state.senha_atual}</Text>
                
                <Text style={styles.wait_descr}>Tempo estimado de espera: </Text>
                <Text style={styles.text}>{this.calculateWaitTime()} minútos</Text>
                
                <Text style={styles.wait_descr}>Atualizado ás</Text>
                <Text style={styles.text}>{this.state.alualizado_as}</Text>

                <Button
                    title='Cancelar'
                    onPress={() => navigate('Start')}
                    buttonStyle={[styles.button_element, {marginTop: 20}]}
                    fontSize={21}
                    backgroundColor={'#E05F68'}
                />
                
                <Button
                    title={'Refresh'}
                    onPress={this.apiCall}
                    buttonStyle={{
                        borderRadius: 20,
                        width: 80,
                        marginTop: 50,
                        alignSelf: 'center'
                    }}
                />

            </View>
        )
    }


}
