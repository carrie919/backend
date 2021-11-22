var knex = require('../config/query_builder');

module.exports.delete = async function(storeUid){
    try {
        await knex('users')
            .where('user_id', storeUid.User_id)
            .del();
    } catch (e) {
        console.error(e);
    }
};