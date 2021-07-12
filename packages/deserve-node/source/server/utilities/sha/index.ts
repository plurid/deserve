// #region imports
    // #region libraries
    import crypto from 'crypto';
    import util from 'util';
    import {
        PassThrough,
    } from 'stream';
    // #endregion libraries
// #endregion imports



// #region module
/**
 * Constructor
 *
 * @constructor
 * @param {string} hash type defaults to sha1
 * @param {object} options
 */
const SHAStream: any = function (
    this: typeof SHAStream,
    hashType: any,
    options: any,
){
    const that = this;
    that.hashType = hashType || 'sha1';

    PassThrough.call(that, options);

    that.sum = crypto.createHash(that.hashType);
    that[that.hashType] = null;

    that.on('finish', function(){
        that.hash = that.sum.digest('hex');
        that[that.hashType] = that.hash;

        that.emit('digest', that[that.hashType]);
        that.emit(that.hashType, that[that.hashType]);
    });
}

util.inherits(SHAStream, PassThrough);


/**
 * Transform data
 *
 * @param {Buffer} chunk
 * @param {string} encoding
 * @param {function} done
 */
SHAStream.prototype._transform = function(
    chunk: any,
    encoding: any,
    done: any,
) {
    try {
        this.sum.update(chunk);
        this.push(chunk);
        done();
    } catch(e) {
        done(e);
    }
}


const createSHAStream = (
    hashType: string = 'sha256',
) => new SHAStream(hashType);
// #endregion module



// #region exports
export {
    SHAStream,
    createSHAStream,
};
// #endregion exports
