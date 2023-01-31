import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import {
	errorHandler,
	getFileNamesInDirectory,
	isFile,
	showFileContents,
} from './func';

export const lesson5 = (): any =>
	http
		.createServer(async (request, response) => {
			const queryParams = url.parse(request.url as string, true).query;
			const queryPath = queryParams.path ?? process.cwd();
			const queryTarget = queryParams.target ?? '';
			const navPath = path.join(queryPath as string, queryTarget as string);

			if (!fs.existsSync(queryPath as string)) {
				errorHandler(response, 'path');
			} else if (
				fs.existsSync(queryPath as string) &&
				!fs.existsSync(navPath)
			) {
				errorHandler(response, 'file');
			} else {
				if (isFile(navPath)) {
					response.writeHead(200, {
						'Content-Type': 'text/plain',
					});
					await showFileContents(navPath, response);
				} else {
					response.writeHead(200, {
						'Content-Type': 'text/html',
					});
					const res = await getFileNamesInDirectory(navPath);
					res.forEach((item) => {
						response.write(
							`<p><a href="?target=${item}&path=${navPath}">${item}</a></p>`,
						);
					});
				}
				response.end();
			}
		})
		.listen(3000, 'localhost');
