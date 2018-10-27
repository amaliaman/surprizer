const s = new Date();
s.setSeconds(s.getSeconds()+2);

const CronJob = require('cron').CronJob;
new CronJob(s, function() {
  console.log('You will see this ' + s.toLocaleString());
}, null, true, 'America/Los_Angeles');