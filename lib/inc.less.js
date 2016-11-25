const path = require('path');
// const fs = require('fs');

// const Promise = require('bluebird');
const lessc = require('less');

module.exports = (plugin, markserv) => {
  markserv.trace(plugin);

  return (includePath, includeData, domNode) => {
    return new Promise((resolve, reject) => {
      // markserv.trace(includePath);
      // markserv.trace(includeData);
      // markserv.trace(domNode);

      markserv.readfile(includePath).then(plaintext => {
        lessc.render(plaintext, {
          // Includes must be relative to file for imports, paths, etc
          filename: path.resolve(includePath)
        }).then(result => {
          const styleTag = `<style>${result.css}</style>`;

          resolve(styleTag);
        }).catch(err => {
          reject(err);
        });
      });
    });
  };
};
