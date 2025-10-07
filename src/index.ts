import http from 'http';
import HazelServer from 'hazel-server';
import logger from './logger';

const GH_ACCOUNT = process.env.RELEASE_SERVER_GITHUB_ACCOUNT || 'Chesscom';
const GH_REPOSITORY = process.env.RELEASE_SERVER_GITHUB_REPOSITORY || 'proctor-app-releases';
const GH_TOKEN = process.env.RELEASE_SERVER_GITHUB_TOKEN;
const PORT = parseInt(process.env.PORT || '4000', 10);
const RELEASE_SERVER_URL = process.env.RELEASE_SERVER_URL;

const hazelServer = HazelServer({
  account: GH_ACCOUNT,
  repository: GH_REPOSITORY,
  token: GH_TOKEN,
  url: RELEASE_SERVER_URL,
});

http
  .createServer((req, res) => hazelServer(req, res))
  .listen(PORT, () => logger.info(`proctor-release-server ready on http://localhost:${PORT}`));
