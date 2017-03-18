module.exports = (test) => {
	describe('nested', function () {
		test([
			[
				[
					`.class-1.class-4 {`,
					`	display: block;`,
					`}`,
				].join('\n'),
				[
					`.class-1`,
					`	&.class-4`,
					`		display block`
				].join('\n'),
			],
			[
				[
					`.class-1:hover:after {`,
					`	display: block;`,
					`}`,
				].join('\n'),
				[
					`.class-1`,
					`	&:hover`,
					`		&:after`,
					`			display block`
				].join('\n'),
			],
			[
				[
					`.class-1:not(.class-4):nth-child(2n) {`,
					`	display: block;`,
					`}`,
				].join('\n'),
				[
					`.class-1`,
					`	&:not(.class-4)`,
					`		&:nth-child(2n)`,
					`			display block`
				].join('\n'),
			],
			[
				[
					`.class-1#id-1 {`,
					`	display: block;`,
					`}`,
					`.class-1 {`,
					`	margin: auto;`,
					`}`,
					`.class-1#id-1 input {`,
					`	width: 10px;`,
					`}`
				].join('\n'),
				[
					`.class-1`,
					`	margin auto`,
					`	&#id-1`,
					`		display block`,
					`		input`,
					`			width 10px`
				].join('\n'),
			],
			[
				[
					`.class-1 > a.class-2 {`,
					`	display: block;`,
					`}`,
					`.class-1 > a {`,
					`	margin: auto;`,
					`}`
				].join('\n'),
				[
					`.class-1`,
					`	>a`,
					`		margin auto`,
					`		&.class-2`,
					`			display block`
				].join('\n'),
			],
			[
				[
					`span ~ input[type=text].class-1 {`,
					`	display: block;`,
					`}`,
					`span ~ input[type=text] .class2:hover:before {`,
					`	margin: auto;`,
					`}`
				].join('\n'),
				[
					`span`,
					`	~input[type=text]`,
					`		&.class-1`,
					`			display block`,
					`		.class2`,
					`			&:hover`,
					`				&:before`,
					`					margin auto`
				].join('\n'),
			],
			[
				[
					`input[type="search"]::-webkit-input-placeholder {`,
					`	color: #ffd595;`,
					`}`,
				].join('\n'),
				[
					`input[type="search"]::-webkit-input-placeholder`,
					`	color #ffd595`
				].join('\n')
			]
		]);
	});
}