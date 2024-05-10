// Example
import { CsvToObject } from './src/csvToObject.js';

const csvParser = new CsvToObject('my/csv/file/path');

console.log(csvParser.parse());

/* 

Output example:

[
  {
    id: '10233',
    id_cita: '282920252',
    bodega: '5',
    req: '144804',
    placa: 'COT000'
  },
  {
    id: '10098',
    id_cita: '0',
    bodega: '5',
    req: '137530',
    placa: 'COT000'
  },
  {
    id: '7479',
    id_cita: '280956886',
    bodega: '5',
    req: '116535',
    placa: 'COT000'
  },
  {
    id: '6605',
    id_cita: '280940676',
    bodega: '5',
    req: '109629',
    placa: 'COT000'
  },
  {
    id: '4554',
    id_cita: '280940676',
    bodega: '5',
    req: '95814',
    placa: 'COT000'
  }
]

*/