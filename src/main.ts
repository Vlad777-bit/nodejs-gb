import EventEmitter from 'events';
import { Handler } from './lesson-2/Handler';
import { Time } from './lesson-2/Time';

class TimeEmitter extends EventEmitter {}
const emitter = new TimeEmitter();

emitter.on('getTimers', Handler.handler.bind(Handler));

Handler.interval = setInterval(() => emitter.emit('getTimers'), 1000);

const args = process.argv.slice(2);

args.forEach((item) => {
	Handler.setTimer(new Time(item));
});
