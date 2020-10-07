const CONSTANTS = require('../constant/db_struct');

const insert_quotation = async (quotation_info, pool) => {
    const insert_statement = {
        name: 'insert_quotation',
        text: `INSERT INTO ${CONSTANTS.QUOTATION.table_name} (${CONSTANTS.QUOTATION.quotation_info}) VALUES ($1) RETURNING *`,
        values: [quotation_info]
    };

    try {
        const result = await pool.query(insert_statement);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const get_all_quotations = async (pool) => {
    const select_statement = {
        name: 'select_all_quotations',
        text: `SELECT * FROM ${CONSTANTS.QUOTATION.table_name}`,
        values: []
    };

    try {
        const result = await pool.query(select_statement);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    insert_quotation,
    get_all_quotations
}
