import colors from 'colors';

enum Colors {
	GREEN,
	YELLOW,
	RED,
}

export class PrimeNumber {
	private currnetColor = Colors.GREEN;

	private fromNum = +process.argv[2];
	private toNum = +process.argv[3];

	public init(): void {
		this.startIteration(this.fromNum, this.toNum);
	}

	private isPrime(num: number): boolean {
		for (let i = 2; i < num; i++) {
			if (num % i === 0) {
				return false;
			}
		}

		return num > 1;
	}

	private changeColor(): void {
		this.currnetColor++;

		if (this.currnetColor > Colors.RED) {
			this.currnetColor = Colors.GREEN;
		}
	}

	private isCorrectParams(firstVal: number, secondVal: number): boolean {
		if (firstVal < 1 || secondVal < 1) {
			console.log(colors.red('Введите положительные числа'));
			return false;
		}

		if (isNaN(firstVal) || isNaN(secondVal)) {
			console.log(colors.red('Введены не корректные параметры'));
			return false;
		}

		return true;
	}

	private colorPrint(num: number): void {
		switch (this.currnetColor) {
			case Colors.RED:
				console.log(colors.red(`${num}`));
				break;

			case Colors.YELLOW:
				console.log(colors.yellow(`${num}`));
				break;

			case Colors.GREEN:
				console.log(colors.green(`${num}`));
				break;
		}

		this.changeColor();
	}

	private startIteration(from: number, to: number): void {
		if (this.isCorrectParams(from, to)) {
			for (let i = from; i <= to; i++) {
				if (this.isPrime(i)) {
					this.colorPrint(i);
				}
			}

			return;
		}
	}
}
