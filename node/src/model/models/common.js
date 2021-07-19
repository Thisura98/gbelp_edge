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
    ){
        this.success = success;
        this.code = code;
        this.description = description;
        this.data = data;
    }
}

class ResponsePlain{
    /**
     * 
     * @param {boolean} success 
     * @param {number} code 
     * @param {string} description 
     */
     constructor(
        success,
        code,
        description
    ){
        this.success = success;
        this.code = code;
        this.description = description;
    }
}

module.exports.ResponseModel = Response;
module.exports.ResponsePlainModel = ResponsePlain;