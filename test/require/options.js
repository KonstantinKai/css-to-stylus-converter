'use strict';

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
				],
				[
					[
						`.class-1 {`,
						`	background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(0,0,0,0)),color-stop(60%,rgba(0,0,0,0.15)),color-stop(100%,rgba(0,0,0,0.15)));`,
						`	background:-webkit-linear-gradient(top,rgba(0,0,0,0) 0%,rgba(0,0,0,0.15) 60%,rgba(0,0,0,0.15) 100%);`,
						`	background:-o-linear-gradient(top,rgba(0,0,0,0) 0%,rgba(0,0,0,0.15) 60%,rgba(0,0,0,0.15) 100%);`,
						`	background:-ms-linear-gradient(top,rgba(0,0,0,0) 0%,rgba(0,0,0,0.15) 60%,rgba(0,0,0,0.15) 100%);`,
						`	background:linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0.15) 60%,rgba(0,0,0,0.15) 100%);`,
						`}`
					].join('\n'),
					[
						`.class-1`,
						`	background linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0.15) 60%,rgba(0,0,0,0.15) 100%)`
					].join('\n'),
					{
						unprefix: true
					}
				],
				[
					[
						`.class-1 {`,
						`	display: -webkit-flex;`,
						`	display: -moz-flex;`,
						`	display: -ms-flex;`,
						`	display: -o-flex;`,
						`	display: flex;`,
						`}`
					].join('\n'),
					[
						`.class-1`,
						`	display flex`
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