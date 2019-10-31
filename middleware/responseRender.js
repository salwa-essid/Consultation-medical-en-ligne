module.exports = (data = {}, error = "", message = "") => {
    return {
        data: { data },
        error: error,
        message: message
    }
}
