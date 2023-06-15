import axios from 'axios';

export default (url, outputDir) => {
  console.log(`call page-loader module with parameters: ${url}, ${outputDir}`);

  axios.get(url)
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
      console.log('finally block');
    });

  return outputDir;
};
