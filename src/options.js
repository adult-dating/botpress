export default {
  dataDir: { type: 'string', required: false, default: './data', env: 'BOTPRESS_DATA_DIR' },
  botUrl: { type: 'string', required: false, default: 'localhost', env: 'BOT_URL' },
  port: { type: 'number', required: false, default: 3000, env: 'PORT' },
  modulesConfigDir: { type: 'string', required: false, default: './modules_config', env: 'BOTPRESS_CONFIG_DIR' },
  formsDir: { type: 'string', required: false, default: './forms' },
  disableFileLogs: { type: 'bool', required: false, default: false },
  optOutStats: { type: 'bool', required: false, default: false },
  'log.file': { type: 'string', required: false, default: 'bot.log' },
  'log.maxSize': { type: 'number', required: false, default: 1e6 },
  'notification.file': { type: 'string', required: false, default: 'notifications.json' },
  'notification.maxLength': { type: 'number', required: false, default: 50 },

  'login.enabled': { type: 'bool', required: false, default: false, env: 'LOGIN_ENABLED' },
  'login.password': { type: 'string', required: false, default: 'password', env: 'BOTPRESS_PASSWORD' },
  'login.tokenExpiry': { type: 'string', required: false, default: '6 hours' },
  'login.maxAttempts': { type: 'number', required: false, default: 3 },
  'login.resetAfter': { type: 'number', required: false, default: 10 * 60 * 1000 },

  'postgres.enabled': { type: 'bool', required: false, default: true },
  'postgres.connection': { type: 'string', required: false, env: 'DATABASE_URL' },
  'postgres.host': { type: 'string', required: false, default: '127.0.0.1', env: 'PG_HOST' },
  'postgres.port': { type: 'number', required: false, default: 5432, env: 'PG_PORT' },
  'postgres.user': { type: 'string', required: false, default: 'postgres', env: 'PG_USER' },
  'postgres.password': { type: 'string', required: false, default: 'postgres', env: 'PG_PASSWORD' },
  'postgres.database': { type: 'string', required: false, default: 'botpress-foobot', env: 'PG_DB' },
  'postgres.ssl': { type: 'bool', required: false, default: false, env: 'PG_SSL' },

  'umm.contentPath': { type: 'string', required: false, default: 'content.yml' },
  'middleware.autoLoading': { type: 'bool', required: false, default: true },
  'license.customerId': { type: 'string', required: false, env: 'BOTPRESS_CUSTOMER_ID' },
  'license.licenseKey': { type: 'string', required: false, env: 'BOTPRESS_LICENSE_KEY' },
  'ghostContent.enabled': { type: 'bool', required: false, default: false }
}
