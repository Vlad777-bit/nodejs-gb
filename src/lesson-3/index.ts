import fs from 'fs';
import { piper } from './piper';
import { config } from './config';

export const lesson3 = (): void => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const readStream = new fs.ReadStream(`${__dirname}/${config.file}`, 'utf8');

	config.ips.forEach((ip) => piper(ip, readStream));
};
