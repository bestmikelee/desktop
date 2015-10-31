var _ = require('lodash');

function dbHelper(model){
		this.setArray =[];
		this.updateAddTo = [];

		_.keys(_.omit(model.schema.paths,['_id','__v'])).forEach(function(key){
			if (model.schema.paths[key].instance === 'Array')
				this.updateAddTo.push(key);
			else
				this.setArray.push(key);
		})

		this.newDoc = function(body) {
			console.log(this)
			var updateObj = _.pick(body,this.setArray)
			var addToObj = _.pick(body,this.updateAddTo)
			return _.merge(updateObj,addToObj)
		}
	return {
		setArray: this.setArray,
		updateAddTo: this.updateAddTo,
		newDoc: this.newDoc,
		updateAppend: function(body) {
			var updateObj = _.keys(_.pick(body,this.setArray)).length ? _.pick(body,this.setArray) : null;
			var addToObj = _.keys(_.pick(body,this.updateAddTo)).length ? _.pick(body,this.updateAddTo) : null;
			return _.omit({ $set: updateObj, $addToSet: addToObj }, _.isNull)
		},
		updateSet: function(body) {
			var obj = this.newDoc(body);
			return { $set : obj };
		}

	}

}

module.exports = dbHelper;