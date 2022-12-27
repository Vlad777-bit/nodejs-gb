export class Time {
	constructor(public time: string) {}

	timeToSeconds(): number {
		// eslint-disable-next-line prefer-const
		let [hour, day, month, year]: any[] = this.time.split('-');

		if (year?.toString().length === 2) {
			year = Number(`20${year}`);
		}

		const date = new Date(year, month - 1, day, hour);
		return date.getTime();
	}
}
