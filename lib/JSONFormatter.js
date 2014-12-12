function JSONFormatter() {

}

JSONFormatter.prototype.format = function (parameters) {
    return JSON.stringify(parameters);
};

module.exports = JSONFormatter;