import Pino from 'pino';

const IS_PROD = process.env.NODE_ENV === 'production';
const IS_DEV = process.env.NODE_ENV === 'development';
const IS_TEST = process.env.NODE_ENV === 'test';

export function createLogger(): Pino.Logger {
  const baseConfig: Pino.LoggerOptions = {
    level: process.env.LOG_LEVEL || 'info',
    base: undefined,
    name: process.env.SERVICE_NAME,
    timestamp: Pino.stdTimeFunctions.isoTime,
  };

  if (IS_PROD) {
    baseConfig.messageKey = 'message';
  }

  if (IS_DEV) {
    baseConfig.transport = {
      target: 'pino-pretty',
      options: { ignore: 'pid,hostname', translateTime: true },
    };
  }

  if (IS_TEST) {
    baseConfig.transport = { target: 'pino-pretty', options: { destination: '/dev/null' } };
  }

  return Pino(baseConfig);
}

const logger = createLogger();

export default logger;
