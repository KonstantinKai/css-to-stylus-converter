'use strict';

module.exports = (test) => {
	describe('keyframes', function () {
		test([
			[
				[
					`@-moz-keyframes play {`,
					`	from {`,
					`		background-position: 0 0px;`,
					`	}`,
					`	to {`,
					`		background-position: 0 -560px`,
					`	}`,
					`}`,
					`@keyframes play {`,
					`	0% { background-position: 0 0px; }`,
					`	60% { background-position: 0 -560px; }`,
					`	100% { background-position: 0 -1060px; }`,
					`}`
				].join('\n'),
				[
					`@-moz-keyframes play`,
					`	from`,
					`		background-position 0 0px`,
					`	to`,
					`		background-position 0 -560px`,
					`@keyframes play`,
					`	0%`,
					`		background-position 0 0px`,
					`	60%`,
					`		background-position 0 -560px`,
					`	100%`,
					`		background-position 0 -1060px`
				].join('\n')
			],
			[
				[
					`@-moz-keyframes play {`,
					`	from {`,
					`		background-position: 0 0px;`,
					`	}`,
					`	to {`,
					`		background-position: 0 -560px`,
					`	}`,
					`}`,
					`@keyframes play {`,
					`	0% { background-position: 0 0px; }`,
					`	60% { background-position: 0 -560px; }`,
					`	100% { background-position: 0 -1060px; }`,
					`}`
				].join('\n'),
				[
					`@keyframes play`,
					`	0%`,
					`		background-position 0 0px`,
					`	60%`,
					`		background-position 0 -560px`,
					`	100%`,
					`		background-position 0 -1060px`
				].join('\n'),
				{
					unprefix: true
				}
			],
			[
				[
					`@keyframes play {`,
					`	0% { background-position: 0 0px; }`,
					`	60% { background-position: 0 -560px; }`,
					`	100% { background-position: 0 -1060px; }`,
					`}`,
					`@keyframes stop {`,
					`	0% { background-position: 0 0px; }`,
					`	/*60% { background-position: 0 -560px; }*/`,
					`	100% { background-position: 0 -1060px; }`,
					`}`
				].join('\n'),
				[
					`@keyframes play`,
					`	0%`,
					`		background-position 0 0px`,
					``,
					`	60%`,
					`		background-position 0 -560px`,
					``,
					`	100%`,
					`		background-position 0 -1060px`,
					``,
					`@keyframes stop`,
					`	0%`,
					`		background-position 0 0px`,
					``,
					`	/*60% { background-position: 0 -560px; }*/`,
					``,
					`	100%`,
					`		background-position 0 -1060px`,
					``
				].join('\n'),
				{
					separateRules: true
				}
			]
		]);
	});
}