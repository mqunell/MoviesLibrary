const mongoose = require('mongoose')

const seriesSchema = new mongoose.Schema(
	{
		seriesName: { type: String, required: true },
		seriesLength: { type: Number }
	}
)

const Series = mongoose.model('Series', seriesSchema)
module.exports = Series
