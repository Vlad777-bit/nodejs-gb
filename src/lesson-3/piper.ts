import fs from 'fs';
import { config } from './config';
import { Transform } from 'stream';
import { EOL } from 'os';

export const piper = (ip: string, stream: fs.ReadStream): void => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const fileWrite = new fs.WriteStream(`${__dirname}/${ip}${config.suffix}`, {
		flags: 'a',
		encoding: 'utf-8',
	});

	const search = new RegExp(`(${ip}.*)`, 'g');

	const transformStream = new Transform({
		transform(chunk, encoding, callback): void {
			const transformedChunk = chunk.toString().match(search);

			if (transformedChunk.length) {
				transformedChunk.forEach((line: string) => this.push(line + EOL));
			}

			callback();
		},
	});

	stream.pipe(transformStream).pipe(fileWrite);
};
