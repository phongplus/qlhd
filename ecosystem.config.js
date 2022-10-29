module.exports = {
  apps : [{
    name: 'qlhd_hnn',
    script: './server/index.js',
    cwd: __dirname,
    instances: 2,
    autorestart: true,
    exec_mode: 'cluster',
    watch: true,
    env:{
      NODE_ENV:'production'
    }
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'nhhon110100@gmail.com',
      host : '103.88.121.45',
      ref  : 'origin/main',
      repo : 'git@gitlab.honeynet.vn:63379/outsourcing-projects/qlhd_hnn.git',
      path : 'qlhd_hnn/server',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
