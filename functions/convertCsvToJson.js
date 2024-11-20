import Papa from 'papaparse';

const convertCsvToJson = (csvData) => {
  const json = Papa.parse(csvData, {
    header: true,
    transform: (value) => value.replace(/\\n/g, '\n'),
  });
  return json.data;
};

export default convertCsvToJson;
