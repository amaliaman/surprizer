const CronJob = require('cron').CronJob;

class Croner {
    createCronJob(date, onTick) {
        console.log('===== This job should be run at ', date.toUTCString())
        new CronJob(date, onTick, null, true);
        // TODO: persist in DB
    }
}

const croner = new Croner();
module.exports = croner;