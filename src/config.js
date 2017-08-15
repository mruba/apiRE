/* eslint-disable no-unused-vars */
import path from 'path'
import _ from 'lodash'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    masterKey: requireProcessEnv('MASTER_KEY'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    },
    predictionio: {
      engine: {
        user: {
          timeout: 1000
        },
        cart: {
          timeout: 1000
        }
      }
    }
  },
  test: {
    mongo: {
      uri: 'mongodb://localhost/sanpablo-api-test',
      options: {
        debug: false
      }
    },
    predictionio: {
      engine: {
        user: {
          url: 'http://localhost',
          port: 8000
        },
        cart: {
          url: 'http://localhost',
          port: 8100
        }
      }
    },
    solr: {
      host: 'solr-01.qa-east.hybris.fsanpablo.io',
      port: 8983,
      path: '/solr/master_fsp_Product_flip'
    }
  },
  development: {
    mongo: {
      uri: 'mongodb://localhost/sanpablo-api-dev',
      options: {
        debug: true
      }
    },
    predictionio: {
      engine: {
        user: {
          url: 'http://localhost',
          port: 8000
        },
        cart: {
          url: 'http://localhost',
          port: 8000
        }
      }
    },
    solr: {
      host: 'solr-01.qa-east.hybris.fsanpablo.io',
      port: 8983,
      path: '/solr/master_fsp_Product_flip'
    }
  },
  staging: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/sanpablo-api'
    },
    predictionio: {
      engine: {
        user: {
          url: 'http://pio-01.staging-east.sanpablo.fsanpablo.io',
          port: 8000
        },
        cart: {
          url: 'http://pio-01.staging-east.sanpablo.fsanpablo.io',
          port: 8100
        }
      }
    },
    solr: {
      host: '172.31.49.56',
      port: 8983,
      path: '/solr/master_fsp_Product_flip'
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/sanpablo-api'
    },
    predictionio: {
      engine: {
        user: {
          url: 'http://pio-01.production-east.sanpablo.fsanpablo.io',
          port: 8000
        },
        cart: {
          url: 'http://pio-01.production-east.sanpablo.fsanpablo.io',
          port: 8100
        }
      }
    },
    solr: {
      host: '172.31.49.56',
      port: 8983,
      path: '/solr/master_fsp_Product_flip'
    }
  }
}

module.exports = _.merge(config.all, config[config.all.env])
export default module.exports
