import { sum } from './main';

describe('Sum', () => {
	it('150 + 150 = 300', () => {
		expect(sum(150, 150)).toBe(300);
	});
});
