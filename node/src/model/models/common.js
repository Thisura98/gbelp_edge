class Response{
    /**
     * 
     * @param {boolean} success 
     * @param {number} code 
     * @param {string} description 
     * @param {Object | null} data 
     */
    constructor(
        success,
        code,
        description,
        data
    ){}
}

module.exports.ResponseModel = Response;