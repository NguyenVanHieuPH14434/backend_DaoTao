import {MongoClient} from 'mongodb';

export {Db as MongoDB, MongoError} from 'mongodb';

export enum ErrorCodes {
    Duplicate = 11000
}

async function Connect(url: string, opts: {replica?: boolean}={}){
    const client = new MongoClient(url);

    await client.connect();
    if(!opts.replica){
        return client;
    }

    return client;
}

export const MongoCommon = {
    Connect
}