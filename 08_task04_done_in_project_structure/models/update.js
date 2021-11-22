var knex = require('../config/query_builder');

module.exports.update = async function(info, storeUid){
    try {
        await knex('users')
        .where('user_id', '=', storeUid.User_id)
        .update({
            f_name: info.First_name,
            l_name: info.Last_name,
            email_id: info.Email_id,
            phone_no: info.Phone_number,
            address: info.Address
        });
    } catch (e) {
        console.error(e);
    };
};