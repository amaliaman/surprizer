const CronJob = require('cron').CronJob;

const s = new Date();
s.setSeconds(s.getSeconds() + 60);

const a = new CronJob(s,
    () => {
        console.log('=========== cron at ' + s.toLocaleString());
    },
    null,
    true
);

module.exports = a;