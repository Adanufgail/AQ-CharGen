const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema ({
	name: {
		type: String,
		required: true
	},
	dateCreated:
	{
		type: Date,
		required: true,
		default: Date.now
	},
	dateModified:
	{
		type: Date,
		required: true,
		default: Date.nowfa
	},
	path:
	{
		type: String,
		required: true
	},
	owner: {
		type: String,
		required: true
	},
	public: {
		type: Boolean,
		required: true
	},
	type: {
		type: String,
		required: false
	},
	gender: {
		type: String,
		required: false
	},
	position: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('characterList', characterSchema);