import winston, { Logger } from 'winston';
import { isDevelopment, isProduction, isTest } from '../utils/server';

export class LoggerService implements ILoggerService {
  private logger: Logger;

  constructor(settings?: ILoggerSettings) {
    const {
      silent = false,
      errorFile = 'error.log',
      combinedFile = 'combined.log',
    } = settings || {};

    this.logger = winston.createLogger({
      silent,
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        this.logFormat(),
      ),
    });

    if (isProduction()) {
      this.logger.add(new winston.transports.File({ filename: errorFile, level: 'error' }));
      this.logger.add(new winston.transports.File({ filename: combinedFile }));
    }

    if (isDevelopment()) {
      this.logger.add(new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          this.logFormat(),
        ),
      }));
    }
  }

  info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: any): void {
    this.logger.debug(message, meta);
  }

  private logFormat() {
    return winston.format.printf(
      ({ level, message, timestamp }) => (
        `${level}: ${timestamp} - ${message}`
      ),
    );
  }
}

export default new LoggerService({ silent: isTest() });

export interface ILoggerService {
  info: ILogMethod;
  error: ILogMethod;
  warn: ILogMethod;
}

export interface ILogMethod {
  (message: string, meta?: any): void;
}

export interface ILoggerSettings {
  errorFile?: string;
  combinedFile?: string;
  silent?: boolean;
}
