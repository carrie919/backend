var knex = require('../config/query_builder');

exports.fetch = async function(storeUid){
    try {
        const queryResult = await knex.select().from('users').where('user_id', storeUid.User_id).timeout(1000);
        var results = JSON.parse(JSON.stringify(queryResult));
        return results;
    } catch (e) {
        console.error(e); 
    } 
};

exports.allUsers = async function(){
    try {
        const queryResult = await knex.select().table('users').timeout(1000);
        var results = JSON.parse(JSON.stringify(queryResult));
        return results;
    } catch (e) {
        console.error(e); 
    }
};