const path = require('path');
const lessc = require('less');

const Promise = require('bluebird');

module.exports = (plugin, markserv) => includePath => new Promise((resolve, reject) => {
	markserv.helpers.readfile(includePath).then(plaintext => {
		lessc.render(plaintext, {
			// Includes must be relative to file for imports, paths, etc
			filename: path.resolve(includePath)
		}).then(result => {
			const styleTag = `<style>${result.css}</style>`;

			resolve(styleTag);
		}).catch(reject);
	}).catch(reject);
});
