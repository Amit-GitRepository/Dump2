import echoServer from '../../../__helpers__/echoServer.helper';
import request from '../request.util';

describe('the client performs a get request to echo server', () => {

  beforeAll((done) => echoServer.listen(3008, (err) => {
    if (err) {
      done.fail(err);
    }
    done();
  }));

  afterAll((done) => echoServer.close(done));

  it('should send a get request with query parameters', (done) => {
    const apiConfig = {path: '/', baseUrl: 'http://localhost:3008', method: 'GET', query: {name: 'hello'}};
    request(apiConfig).then(({body}) => {
      const {method, query} = body; // body will contain the response from the echo server which is basically exact copy of the request
      expect(method).toEqual('GET');
      expect(query).toEqual({name: 'hello'});
      done();
    }).catch((err) => done.fail(err));
  });

  it('should go the catch block if a request fails (non 2xx status code)', (done) => {
    const apiConfig = {path: '/', baseUrl: 'http://localhost:3008', method: 'GET', headers: {status: 404}, query: {name: 'hello'}};
    request(apiConfig)
      .then(() => {
        done.fail('Non 2xx status code should fail');
      }).catch((errResponse) => {
        expect(errResponse.status).toBe(404);
        done();
      });
  });

  it('should send a post request with body parameters', (done) => {
    const apiConfig = {path: '/', baseUrl: 'http://localhost:3008', data: {name: 'hello'}, method: 'POST'};
    request(apiConfig)
      .then(({body}) => {
        expect(body.method).toEqual('POST');
        expect(JSON.parse(body.body)).toEqual({name: 'hello'});
        done();
      }).catch((err) => done.fail(err));
  });

  it('should send a put request with body parameters', (done) => {
    const apiConfig = {path: '/', baseUrl: 'http://localhost:3008', data: {name: 'hello'}, method: 'PUT'};
    request(apiConfig)
      .then(({body}) => {
        expect(body.method).toEqual('PUT');
        expect(JSON.parse(body.body)).toEqual({name: 'hello'});
        done();
      }).catch((err) => done.fail(err));
  });

  it('should send a delete request with body parameters', (done) => {
    const apiConfig = {path: '/', baseUrl: 'http://localhost:3008', query: {product: '1'}, method: 'DELETE'};
    request(apiConfig)
      .then(({body}) => {
        expect(body.method).toEqual('DELETE');
        expect(body.query).toEqual({product: '1'});
        done();
      }).catch((err) => done.fail(err));
  });

  it('should fail get request when hitting wrong requests', (done) => {
    const apiConfig = {path: '/', baseUrl: 'WRONG_URL', method: 'GET', query: {name: 'hello'}};
    request(apiConfig)
      .then(() => {
        done.fail('Should not succeed');
      }).catch(() => done());
  });

  it('should have the ability to cancel requests', (done) => {
    const apiConfig = {path: '/hang', baseUrl: 'http://localhost:3008', method: 'GET'};
    const reqPromise = request(apiConfig);
    reqPromise.then(() => {
      done.fail('Promise didnt cancel');
    }).catch((err) => {
      expect(err).toEqual({message: 'ABORTED'});
      done();
    });
    reqPromise.abort(); // cancelling the request should get me to the catch block with 'Failed';
  });

});
