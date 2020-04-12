
/**
 * 
 * @param {*} res 
 * @param {Json} data 
 * @param {Number} status 
 */
export function success(res, data, status) {
    const DataResponse = {
        status: status ? status : 200,
        success: true,
        data: data ? data : {},
    };
    return res.status(status ? status : 200).json(DataResponse);
}




/**
 * 
 * @param {*} res 
 * @param {*} req 
 * @param {String} error 
 * @param {Number} status 
 */
export function error(res, req, error, status) {
    const DataResponse = {
        status: status ? status : 500,
        success: false,
        data: {
            error: error.message || error || `bruh`,
            request: req.originalUrl,
            method: req.method
        }
    };
    return res.status(status ? status : 500).json(DataResponse);
}
