/**
 * @fn QueryController
 * @desc Controller to manage the mongo Queries
 * @param queryCollection mongo collection with the queries
 * @param dataCollection mongo collection with the patient data
 * @param queryHelper Helper to help build the mongo pipelines
 * @constructor
 */
function QueryController(queryCollection,dataCollection,queryHelper) {
    let _this = this;
    _this._queryCollection = queryCollection;
    _this._dataCollection = dataCollection;
    _this._queryHelper = queryHelper;

    // Bind member functions
    this.processQuery = QueryController.prototype.processQuery.bind(this);
}

/**
 * @fn getStatus
 * @desc HTTP method GET handler on this service status
 * @param query_id id of the query in mongo
 */
QueryController.prototype.processQuery = function(query_id) {
    let _this = this;
    return new Promise(function(resolve, reject) {
        _this._queryCollection.findOne({id : query_id}).then(function(query){
            let pipeline = _this._queryHelper.buildPipeline(query);
            resolve(_this._dataCollection.aggregate(pipeline));
        },function(error){
            reject('Error while processing the query ' + query_id, error);
        });
    });
};

module.exports = QueryController;

