module.exports = {
  apps : [{
    name: 'qlhd_hnn',
    append_env_to_name: true,
    script: './server/index.js',
    instances: 2,
    autorestart: true,
    watch: '.',
  },
    env: {
       NODE_ENV: 'development'
  },
    env_production:{
	NODE_ENV: "production",
	PORT: 5000
    },
    env_development: {
	NODE_ENV: "development",
	PORT: 5000
    },
]],

  deploy : {
    production : {
      user : 'admin_hh',
      host : '103.88.121.45',
      ref  : 'origin/main',
      repo : 'https://gitlab.honeynet.vn/outsourcing-projects/qlhd_hnn',
      path : '~/admin_hh/qlhd_hnn',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
