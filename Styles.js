import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    text: {
        fontSize: 27,
        alignSelf: 'center',
        color: 'black'
    },
    input: {
        fontSize: 22,
        height: 40,
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    container: {
        width: '90%',
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    element: {
        width: '91%',
        alignSelf: 'center'
    },
    button_element: {
        height: 50,
        borderRadius: 5,
        width: '103%',
        alignSelf: 'center'
    },
    error_element: {
        height: 30,
        fontSize: 22,
        color: 'red',
        alignSelf: 'center'
    },
    wait_descr: {
        marginLeft: 30
    },
    validation_error: {
        height: 40,
        color: 'red',
        marginTop: 10,
        alignSelf: 'center',
    }
})
