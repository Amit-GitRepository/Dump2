import superagent from 'superagent';

const createRequest = (apiConfig) => {
  const {baseUrl, path, method, headers = {}, query, data, timeout} = apiConfig;
  const url = baseUrl + path;
  const superAgentInstance = superagent[method.toLowerCase()](url)
    .query(query)
    .send(data)
    .set(headers)
    .timeout(timeout);

  const promise =  new Promise((resolve, reject) => {
    superAgentInstance.end((error, response) => {
      if (error) {
        return reject(response || {error});
      }
      return resolve(response);
    }).on('abort', () => reject({message: 'ABORTED'}));
  });
  promise.abort = () => superAgentInstance.abort();
  return promise;
};

export default createRequest;
