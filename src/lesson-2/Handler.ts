import { Time } from './Time';

export class Handler {
	private static timers: any[] = [];
	static interval: null | NodeJS.Timer = null;

	static setTimer(timer: Time): void {
		this.timers.push(timer);
	}

	private static leftTimeToString(time: number): string {
		const timer = {
			seconds: Math.floor((time / 1000) % 60),
			minutes: Math.floor((time / 1000 / 60) % 60),
			hours: Math.floor((time / (1000 * 60 * 60)) % 24),
			days: Math.floor(time / (1000 * 60 * 60 * 24)),
		};
		return `осталось ${timer.days} дней и ${timer.hours}:${timer.minutes}:${timer.seconds}`;
	}

	static handler(): void {
		const now = Date.now();

		if (!this.timers.length) {
			console.log('Нет ни одного таймера!');
			if (this.interval) clearInterval(this.interval);
		} else {
			this.timers.forEach((target) => {
				const diffTime = target.timeToSeconds() - now;
				if (diffTime > 0) {
					console.log(target.time, Handler.leftTimeToString(diffTime));
				} else {
					console.log(target.time, 'закончил отсчет');
					this.timers = this.timers.filter((item) => item !== target);
				}
			});
		}
		console.log('__________________________________');
	}
}
