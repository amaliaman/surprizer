const CronJob = require('cron').CronJob;

class Croner {

}
const s = new Date();
s.setSeconds(s.getSeconds() + 60);

const a = new CronJob(s,
    () => {
        console.log('=========== cron at ' + s.toLocaleString());
    },
    null,
    true
);

const croner = new Croner();
module.exports = croner;