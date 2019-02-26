import React from 'react';



class SecretariaApi {

    static async get(type) {
        return this.fetchHtml().then(res => this.processData(type, res))
    }

    static async fetchHtml() {
        //https://ciencias.ulisboa.pt/servicos/perfil/SenhasAtendimento/data
        return fetch('https://ciencias.ulisboa.pt/servicos/perfil/SenhasAtendimento/data')
            .then((resp) => resp.text())
    }

    static processData(type, html) {
        let closed = false;
        let actual = null;
        let queue = null;
        let row;
        if (html.indexOf('Encerrado') > -1) {
            closed = true;
        } else {
            let index;
            switch (type) {
                case 'A':
                    index = 3;
                    break;
                case 'B':
                    index = 5;
                    break;
                case 'C':
                    index = 7;
                    break;
                case 'D':
                    index = 9;
                    break;
                case 'E':
                    index = 11;
            }
            let elements_arr = html.split(/<tr>|<\/tr>/);
            row = elements_arr[index];
            let ps_cols = row.split(/<\s*\w*\s*style.*?>|<\/td>/);
            actual = ps_cols[4];
            queue = ps_cols[6];
        }
        let updated_at = html.match(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/)[0];
        return {
            is_closed: closed,
            actual_ticket: parseInt(actual),
            queue_tickets: parseInt(queue),
            updated_at: updated_at
        }
        //return {is_closed: false, actual_ticket: 13, queue_tickets: 10, updated_at: updated_at  }
    }

}

export default SecretariaApi;
