module.exports = (test) => {
	describe('options', function () {
		describe('unprefix', function () {
			test([
				[
					[
						`.mobile-menu-icon {`,
						`	-webkit-transition: all .3s;`,
						`	-moz-transition: all .3s;`,
						`	-ms-transition: all .3s;`,
						`	-o-transition: all .3s;`,
						`	transition: all .3s;`,
						`}`
					].join('\n'),
					[
						`.mobile-menu-icon`,
						`	transition all .3s`,
					].join('\n'),
					{
						unprefix: true
					}
				],
				[
					[
						`@-o-keyframes play {`,
						`	from {`,
						`		background-position: 0 0px;`,
						`	}`,
						`	to {`,
						`		background-position: 0 -560px`,
						`	}`,
						`}`,
						`@keyframes play {`,
						`	from {`,
						`		background-position: 0 0px;`,
						`	}`,
						`	to {`,
						`		background-position: 0 -560px`,
						`	}`,
						`}`
					].join('\n'),
					[
						`@keyframes play`,
						`	from`,
						`		background-position 0 0px`,
						`	to`,
						`		background-position 0 -560px`
					].join('\n'),
					{
						unprefix: true
					}
				]
			]);
		});
		
		describe('indent', function () {
			test([
				[
					[
						`.class-1 .class-2 {`,
						`	padding: 20px;`,
						`}`
					].join('\n'),
					[
						`.class-1`,
						`  .class-2`,
						`    padding 20px`
					].join('\n'),
					{
						indent: 2
					}
				],
				[
					[
						`.class-1 .class-2 {`,
						`	padding: 20px;`,
						`}`
					].join('\n'),
					[
						`.class-1`,
						`   .class-2`,
						`      padding 20px`
					].join('\n'),
					{
						indent: 3
					}
				]
			]);
		});

		describe('css syntax', function () {
			test([
				[
					[
						`.class-1 .class-2 {`,
						`	padding: 20px;`,
						`}`
					].join('\n'),
					[
						`.class-1 {`,
						`	.class-2 {`,
						`		padding: 20px;`,
						`	}`,
						`}`
					].join('\n'),
					{
						cssSyntax: true
					}
				]
			]);
		});

		describe('keep colons', function () {
			test([
				[
					[
						`.class-1 .class-2 {`,
						`	padding: 20px;`,
						`}`
					].join('\n'),
					[
						`.class-1`,
						`	.class-2`,
						`		padding: 20px`
					].join('\n'),
					{
						keepColons: true
					}
				]
			]);
		});

		describe('separate rules', function () {
			test([
				[
					[
						`.class-1 {`,
						`	padding: 20px;`,
						`}`,
						`.class-2 {`,
						`	margin: auto;`,
						`}`
					].join('\n'),
					[
						`.class-1`,
						`	padding 20px`,
						``,
						`.class-2`,
						`	margin auto`,
						``
					].join('\n'),
					{
						separateRules: true
					}
				]
			]);
		});
	});
}