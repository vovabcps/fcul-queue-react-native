import SecretariaApi from '../api/SecretariaApi';


var sample_html = '<table style="width:100%" class="ciencias  numeros  ">' +
    '' +
    '	<thead>' +
    '		<tr>' +
    '			<th>Tipo</th>' +
    '			<th style="min-width:200px;">Descrição</th>' +
    '			<th>Senha Atual</th>' +
    '			<th>Senhas em Espera</th>' +
    '            <th>Tempo (estimado) de espera</th>' +
    '        </tr>' +
    '	</thead>' +
    '    <tbody>' +
    '    	        <tr>' +
    '        	<td  style="text-align:center">A</td>' +
    '            <td><b>1º Ciclo - Licenciaturas</b></td>' +
    '                        <td style="text-align:center">22</td>' +
    '            <td style="text-align:center">17</td>' +
    '            <td  style="text-align:center">102 minutos</td>' +
    '                        ' +
    '            ' +
    '        </tr>' +
    '                <tr>' +
    '        	<td  style="text-align:center">B</td>' +
    '            <td><b>2º Ciclo - Mestrados</b></td>' +
    '                        <td style="text-align:center">8</td>' +
    '            <td style="text-align:center">6</td>' +
    '            <td  style="text-align:center">36 minutos</td>' +
    '                        ' +
    '            ' +
    '        </tr>' +
    '                <tr>' +
    '        	<td  style="text-align:center">C</td>' +
    '            <td><b>3º Ciclo - Doutoramentos</b></td>' +
    '                        <td style="text-align:center">1</td>' +
    '            <td style="text-align:center">4</td>' +
    '            <td  style="text-align:center">24 minutos</td>' +
    '                        ' +
    '            ' +
    '        </tr>' +
    '                <tr>' +
    '        	<td  style="text-align:center">D</td>' +
    '            <td><b>Pagamento de Propinas</b></td>' +
    '                        <td style="text-align:center">2</td>' +
    '            <td style="text-align:center">0</td>' +
    '            <td  style="text-align:center">0 minutos</td>' +
    '                        ' +
    '            ' +
    '        </tr>' +
    '                <tr>' +
    '        	<td  style="text-align:center">E</td>' +
    '            <td><b>Tesouraria</b></td>' +
    '                        <td style="text-align:center">2</td>' +
    '            <td style="text-align:center">1</td>' +
    '            <td  style="text-align:center">6 minutos</td>' +
    '                        ' +
    '            ' +
    '        </tr>' +
    '            </tbody>' +
    '</table>' +
    'Atualizado às 2018-09-20 10:21:18<script type="text/javascript">' +
    'jQuery(document).ready(function() {' +
    '	jQuery(".ui-dialog-buttonset").html (\'<button class="btnCI btnCI-mini" onclick="closeDiag()">Fechar</button>\');' +
    '});' +
    '' +
    'function closeDiag() ' +
    '{' +
    '	jQuery(dialog).remove();' +
    '}' +
    '</script>';


test('senha A retorna dados certos', () => {
    expect(SecretariaApi.processData('B', sample_html)).toBe({hui: 'hui'})
});