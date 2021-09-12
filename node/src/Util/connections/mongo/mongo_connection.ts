import { Collection, Db, MongoClient, Document, ObjectId } from 'mongodb'
import * as l from '../../logger';

/**
 * Log Tag
 */
const tag = 'mongo';

/**
 * Main Mongo DB
 */
export var db: Db | null = null;

export function toObjectId(value: any){
    return new ObjectId(value);
}

export class Collections{
    static getGameProjects(): Collection<Document>{
        return db!.collection('gameprojects');
    }

    static getGroupChats(): Collection<Document>{
        return db!.collection('chats_multi');
    }
}

export async function initialize(){
    // 'edge_gbelp' is the name of our Mongo Database
    const url = 'mongodb://root:root@localhost:7000/edge_gbelp?authSource=admin';
    const dbName = 'edge_gbelp';
    // const options = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }

    // initialize connection to db
    l.logc('Trying to connect to mongo...', tag);
    // mongoose.connect(url, options);
    
    // // get connection reference to our db
    // db = mongoose.connection;
    // db.on('error', (err) => {
    //     l.logc(JSON.stringify(err), tag);
    // });
    // db.once('open', () => {
    //     l.logc('MongoDB Connected', tag);
    // });

    MongoClient.connect(url).then((client) => {
        db = client.db(dbName);
        l.logc('MongoDB Connected', tag);
    }).catch((error) => {
        l.logc(JSON.stringify(error), tag);
    })
}