module.exports = {
  apps: [{
    name: 'accounts',
    script: './server/bin/wwws.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    node_args: '-r dotenv/config',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }],

  deploy: {
  },
};
