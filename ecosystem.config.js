module.exports = {
  apps : [{
	name: 'qlhd_hnn',
	script: 'server.js',
	cwd:__dirname,
	args: 'one',
	instances: 2,
	autorestart: true,
	watch: 'false',
	max_memory_restart: '1G',
	exec_mode: 'cluster',
	env: {
		NODE_ENV: 'production',
	},
}],
//developmet
  deploy : {
    production : {
      user : 'admin_hh',
      host : '103.88.121.45',
      ref  : 'origin/master',
      repo : 'https://gitlab.honeynet.vn/outsourcing-projects/qlhd_hnn.git',
      path : '/var/www/qlhd_hnn',
      //'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
