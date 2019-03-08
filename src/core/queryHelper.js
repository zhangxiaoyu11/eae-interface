/**
 * @fn QueryHelper
 * @desc
 * @param config
 * @constructor
 */
function QueryHelper(config = {}) {
    let _this = this;
    _this.config = config;

    _this._translateCohort = QueryHelper.prototype._translateCohort.bind(this);

    // Bind member functions
    _this.buildPipeline = QueryHelper.prototype.buildPipeline.bind(this);
}

QueryHelper.prototype._translateCohort = function(cohort){


};


/**
 * @fn buildPipeline
 * @desc Methods that builds thee pipeline for the mongo query
 * @param query
 * structure of the request
 * {
    "cohort": {
        {
        "field": String, // Field identifier
        "value": String Or Float, // Value requested can either categorical
        "op": String // Logical operation
        },
        {
        "field": String, // Field identifier
        "value": String Or Float, // Value requested can either categorical
        "op": String // Logical operation
        }
     },
    "data_requested": [ "field1",  "field2", "field3"] // Fields requested
    }
 }
 */
QueryHelper.prototype.buildPipeline = function(query){
    let _this = this;

    // m_eid  = patient_id ?
    let fields = {_id: 0, m_eid: 1};
    query.data_requested.forEach(function (field) {
        fields[field] = 1;
    });
    let match = _this._translateCohort(query.cohort);

    return pipeline =[
        {$match: {match}},
        {$project: {fields}}
    ];
};

module.exports = QueryHelper;
