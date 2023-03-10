var pathModule = require('path');
var assert = require('assert').ok;

module.constructor.prototype.require = function (path) {
    var self = this;
    assert(typeof path === 'string', 'path must be a string');
    assert(path, 'missing path');

    try {
        return self.constructor._load(path, self);
    } catch (err) {
        // if module not found, we have nothing to do, simply throw it back.
        if (err.code === 'MODULE_NOT_FOUND') {
            throw err;
        }
        // resolve the path to get absolute path
        path = pathModule.resolve(__dirname, path)

        // Write to log or whatever
        console.log('Error in file: ' + path);
    }
}