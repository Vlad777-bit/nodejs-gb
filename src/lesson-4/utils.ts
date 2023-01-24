import fs from 'fs';
import inquirer from 'inquirer';
import yargs from 'yargs';
import { Transform } from 'stream';
import { EOL } from 'os';

export const isFile = (filepath: string): boolean => {
	return fs.lstatSync(filepath).isFile();
};

export const getFileNamesInDirectory = async (
	directory: string,
): Promise<string[]> => {
	return await new Promise((resolve) => {
		fs.readdir(directory, (err, data) => {
			if (directory !== '/') {
				data.unshift('..');
			}
			resolve(data);
		});
	});
};

export const promptUser = async (choices: string[]): Promise<any> => {
	const optionKey = 'optionKey';

	const result = await inquirer.prompt([
		{
			name: optionKey,
			type: 'list',
			message: 'Please choose a file to read',
			choices,
		},
	]);

	return result[optionKey];
};

export const yargsConf = (): any => {
	return yargs
		.usage('Usage: -p <path>')
		.option('p', {
			alias: 'path',
			describe: 'Path to file',
			type: 'string',
			demandOption: false,
		})
		.option('s', {
			alias: 'search',
			describe: 'Search string in file',
			type: 'string',
			demandOption: true,
		}).argv;
};

export const transformChunks = (search: RegExp): Transform => {
	return new Transform({
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		transform(chunk, encoding, callback) {
			const transformedChunk = chunk.toString().match(search);

			if (transformedChunk?.length) {
				transformedChunk.forEach((line: string) => {
					this.push(
						`| ${line.trim()} ${EOL}|----------------------------------- ${EOL}`,
					);
				});
			}

			callback();
		},
	});
};
