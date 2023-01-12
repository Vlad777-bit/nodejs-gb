type TypeConfig = {
	file: string;
	ips: string[];
	suffix: string;
};

export const config: TypeConfig = {
	file: 'access.log',
	ips: ['89.123.1.41', '34.48.240.111'],
	suffix: '_requests.log',
};
