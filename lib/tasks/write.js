var fs = require('fs');

/**
 * Write the message to disk with an optional checksum in the filename.
 *
 * @param options {Object} Write task options.
 * @param options.file {String} Filename to write.
 * @param message {Object} Incoming message.
 * @param done {Function} Callback on task completion.
 */
exports.write = {
    fn: function(options, message, done) {
        var name = options.file,
            checksum;

        if (name.indexOf('{checksum}') > -1) {  // Replace {checksum} with md5 string
            checksum = Crypto.createHash('md5');
            checksum.update(message.body);
            name = name.replace('{checksum}', checksum.digest('hex'));
        }

        fs.writeFile(name, message.body, function(err) {
            done(err, {
                meta: {
                    file: name
                },
                body: message.body
            });
        });
    }
};