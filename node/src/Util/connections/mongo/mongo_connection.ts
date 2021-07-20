import mongoose from 'mongoose';
import * as l from '../../logger';
import * as models from './mongo_schema';

/**
 * Log Tag
 */
const tag = 'mongo';

/**
 * Main Mongo DB
 */
var db = null;

export function initialize(){
    // 'edge_gbelp' is the name of our Mongo Database
    const url = 'mongodb://root:root@localhost:7000/edge_gbelp?authSource=admin';
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    // initialize connection to db
    l.logc('Trying to connect to mongo...', tag);
    mongoose.connect(url, options);
    
    // get connection reference to our db
    db = mongoose.connection;
    db.on('error', (err) => {
        l.logc(JSON.stringify(err), tag);
    });
    db.once('open', () => {
        l.logc('MongoDB Connected', tag);
    });
}

export { models };