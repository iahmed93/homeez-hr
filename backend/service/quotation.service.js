const {Pool} = require('pg');
const DB_CONFIG = require('../constant/db_config');
const quotation_dao = require('../dao/quotation.dao');

const pool = new Pool({
    user: DB_CONFIG.user,
    host: DB_CONFIG.host,
    database: DB_CONFIG.database,
    password: DB_CONFIG.password,
    port: DB_CONFIG.port
});

const add_quotation = async (quotation_info) => {
    const quotation = await quotation_dao.insert_quotation(quotation_info, pool);
    return quotation;
}

const get_all_quotations = async () => {
    const quotations = await quotation_dao.get_all_quotations(pool);
    return quotations;
}

module.exports = {
    add_quotation,
    get_all_quotations
}