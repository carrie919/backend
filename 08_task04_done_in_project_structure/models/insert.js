var knex = require('../config/query_builder');

exports.insert = async function(info){
    try {
        await knex('users').insert({
            user_id: info.User_id,
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