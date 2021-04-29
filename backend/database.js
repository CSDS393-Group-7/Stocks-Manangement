const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null,
};

exports.connect = (url, doneCallback) => {
    if (state.db) 
        return doneCallback();
    
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
        if (err)
            return doneCallback(err);
        state.db = db.db('CSDS393');
        doneCallback();
    });
};

exports.get = () => {
    return state.db;
};

exports.collection = (collectionName) => {
    return state.db.collection(collectionName);
};

exports.close = (doneCallback) => {
    if (state.db) {
        state.db.close((err, res) => {
            state.db = null;
            state.mode = null;
            doneCallback(err);
        }); 
    }
}