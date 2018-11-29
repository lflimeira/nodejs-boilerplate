const log4js = require('log4js')
const escriba = require('escriba')

const log4jsConfig = {
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[%m%]%n',
      },
    },
  },
  categories: {
    default: { appenders: ['console'], level: process.env.LOGGER_LEVEL || 'info' },
  },
}

log4js.configure(log4jsConfig)

const escribaConfig = {
  loggerEngine: log4js.getLogger('Boilerplate'),
  service: 'Boilerplate',
  httpConf: {
    logIdPath: 'headers.x-request-id',
    propsToLog: {
      request: [
        'id',
        'method',
        'url',
        'body',
        'httpVersion',
        'user-agent',
      ],
      response: [
        'id',
        'method',
        'url',
        'statusCode',
        'body',
        'httpVersion',
        'user-agent',
        'latency',
      ],
    },
    skipRules: [
      {
        route: /\/_health_check/,
        method: /.*/,
        onlyBody: false,
      },
    ],
  },
}

module.exports = escriba(escribaConfig)
