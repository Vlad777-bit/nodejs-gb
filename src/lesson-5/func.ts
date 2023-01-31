import fs from 'fs';

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

export const showFileContents = async (
	filepath: string,
	func: any,
): Promise<any> => {
	return new Promise((resolve) => {
		const stream = fs.createReadStream(filepath, 'utf-8');

		stream.on('end', resolve);
		stream.pipe(func);
	});
};

export const errorHandler = (res: any, text: string): void => {
	res.writeHead(404, {
		'Content-Type': 'text/html',
	});
	res.write(`<p><a href="?path=${process.cwd()}">home</a></p>`);
	res.end(`${text} not found`);
};
