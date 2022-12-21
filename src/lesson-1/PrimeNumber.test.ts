import { PrimeNumber } from './PrimeNumber';

describe('Testing methods', () => {
	it('isPrime method return true', () => {
		const prime = new PrimeNumber();
		expect(prime['isPrime'](5)).toBeTruthy();
	});

	it('isPrime method return false', () => {
		const prime = new PrimeNumber();
		expect(prime['isPrime'](21)).toBeFalsy();
	});

	it('isCorrectParams method return true', () => {
		const prime = new PrimeNumber();
		expect(prime['isCorrectParams'](4, 20)).toBeTruthy();
		expect(prime['isCorrectParams'](4, 20)).toBeTruthy();
	});

	it('isCorrectParams method return false', () => {
		const prime = new PrimeNumber();

		expect(prime['isCorrectParams'](0, 20)).toBeFalsy();
		expect(prime['isCorrectParams'](-4, 20)).toBeFalsy();
		expect(prime['isCorrectParams'](4, -20)).toBeFalsy();
		expect(prime['isCorrectParams'](-4, -20)).toBeFalsy();
		expect(prime['isCorrectParams'](+'str', 20)).toBeFalsy();
		expect(prime['isCorrectParams'](4, +'str')).toBeFalsy();
	});
});
