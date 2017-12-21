/* eslint no-console: 0 */  // --> OFF
import httpServer from 'http';
import urlParser from 'url';

export default httpServer.createServer((req, res) => {
  if (req.url === '/hang') {
    setTimeout(() => {
      res.end();
    }, 1000);
    console.log('hanging...not returning a res for 1 sec');
  }

  const query = urlParser.parse(req.url, true).query;
  const bodyChunks = [];
  res.on('error', (err) => console.error(err));
  req.on('error', (err) => console.error(err))
    .on('data', (chunk) => {
      bodyChunks.push(chunk);
    }).on('end', () => {
      const body = bodyChunks.concat().toString();
      res.setHeader('Content-Type', 'application/json');
      const {headers = {}, method, url} = req;
      res.statusCode = headers.status || 200; // just send whatever status the test demands through req
      const resBody = {headers, method, url, body, query};
      res.write(JSON.stringify(resBody));
      res.end();
    });
});
