import React, {Component} from 'react';
import {View, Text, Picker, TextInput} from 'react-native';
import {CheckBox, Button} from 'react-native-elements';
import styles from './Styles.js'
import SecretariaApi from './api/SecretariaApi';

export default class StartScreen extends Component {

    state = {
        tipo: 'A',
        senha: '',
        notify: true,
        error: '',
        showError: false,
        isLoading: false
    };

    async validateInput() {
        if (!this.state.tipo in ['A', 'B', 'C', 'D', 'E']) {
            this.setState({error: 'Tipo de senha errado'});
        }
        if (!/^[1-9][0-9]*$/.test(this.state.senha)) {
            this.setState({error: 'Número de senha errado'});
        }
        if (this.state.senha.length < 1) {
            this.setState({error: 'Número de senha não se encontra inserido'});
        }

    }

    onSubmit = () => {
        this.setState({error: ''});
        this.validateInput().then(() => {
            const error = this.state.error;
            const senha = this.state.senha;
            if (!error) {
                this.setState({isLoading: true});
                SecretariaApi.get(this.state.tipo).then(resp => {
                    if (resp.is_closed) {
                        this.setState({error: 'Secretaria está encerrada'})
                    } else if (resp.actual_ticket > senha ||
                        resp.actual_ticket + resp.queue_tickets < senha) {
                        this.setState({error: 'Número de senha errado'});
                    } else {
                        const {navigate} = this.props.navigation;
                        navigate('Wait', {tipo: this.state.tipo, senha: senha, notify: this.state.notify})
                    }
                })
                    .catch(() => {
                        this.setState({error: 'Erro na conexão á rede'})
                    })
                    .done(() => this.setState({isLoading: false}));

            }
        });
    };

    render() {
        const active_button = 
        <Button
            buttonStyle={[styles.button_element]}
            title='Submeter'
            onPress={this.onSubmit}
            fontSize={21}
        />;
        const loading_button = 
        <Button
            loading
            buttonStyle={[styles.button_element]}
        />;
        return (
            <View style={styles.container}>
                <Text>Escolhe tipo de senha:</Text>

                <Picker mode={'dropdown'}
                        selectedValue={this.state.tipo}
                        style={[styles.element]}
                        onValueChange={(itemValue) => this.setState({tipo: itemValue})}>
                    <Picker.Item label="A	1º Ciclo - Licenciaturas" value="A"/>
                    <Picker.Item label="B	2º Ciclo - Mestrados" value="B"/>
                    <Picker.Item label="C	3º Ciclo - Doutoramentos" value="C"/>
                    <Picker.Item label="D	Pagamento de Propinas" value="D"/>
                    <Picker.Item label="E	Tesouraria" value="E"/>
                </Picker>

                <Text>Insira número de senha:</Text>

                <TextInput
                    style={[styles.element, styles.input]}
                    value={this.state.senha}
                    keyboardType={'numeric'}
                    onChangeText={(senha) => this.setState({senha})}
                />

                <CheckBox
                    title={'Notifiсar quando aproxima'}
                    style={[styles.element]}
                    checkedIcon={'check'}
                    checked={this.state.notify}
                    onPress={() => this.setState({notify: !this.state.notify})}
                />

                <Text style={styles.validation_error}>
                    {this.state.error}
                </Text>

                {this.state.isLoading ? loading_button : active_button}

            </View>
        )
    }
}
