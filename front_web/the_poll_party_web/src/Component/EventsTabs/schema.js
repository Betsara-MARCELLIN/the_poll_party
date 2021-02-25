export default {
	type: 'object',
	properties: {
		question: { type: 'string'},
		reponses: { type: 'string', maxLength: 120 }
	},
	required: [
		'question',
	],
};