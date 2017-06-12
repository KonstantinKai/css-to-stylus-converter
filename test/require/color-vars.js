'use strict';

module.exports = (test) => {
	describe('color-variables', function () {
		test([
			[
				[
					`.class-1 {`,
					`	color: #fff`,
					`}`
				].join('\n'),
				[
					`$color-1 = #fff`,
					``,
					`.class-1`,
					`	color $color-1`,
				].join('\n'),
				{
					colorVariables: true
				}
			],
			[
				[
					`.class-1 {`,
					`	border: 1px solid rgb(255 255 255);`,
					`	background: url(./xxx.img) hsla(10%, 14%, 70% 0.3);`,
					`	box-shadow: 0 0 0 0 #34343456;`,
					`	border-color: rgba(0,0,0,0.6);`,
					`	background-color: rgb(255 255 255);`,
					`}`
				].join('\n'),
				[
					`$color-1 = rgb(255 255 255)`,
					`$color-2 = hsla(10%, 14%, 70% 0.3)`,
					`$color-3 = #34343456`,
					`$color-4 = rgba(0,0,0,0.6)`,
					``,
					`.class-1`,
					`	border 1px solid $color-1`,
					`	background url(./xxx.img) $color-2`,
					`	box-shadow 0 0 0 0 $color-3`,
					`	border-color $color-4`,
					`	background-color $color-1`
				].join('\n'),
				{
					colorVariables: true
				}
			],
			[
				[
					`.class-1 {`,
					`	border-color: #fff;`,
					`	background-color: #ffffff;`,
					`	color: #ffffffff;`,
					`}`
				].join('\n'),
				[
					`_c1 = #fff`,
					``,
					`.class-1`,
					`	border-color _c1`,
					`	background-color _c1`,
					`	color _c1`
				].join('\n'),
				{
					colorVariables: true,
					colorPrefix: '_c'
				}
			],
			[
				[
					`.colors {`,
					`	border-top: 1px solid #FFF;`,
					`	color: #ffffff;`,
					`}`
				].join('\n'),
				[
					`$color-1 = #fff`,
					``,
					`.colors`,
					`	border-top 1px solid $color-1`,
					`	color $color-1`
				].join('\n'),
				{
					colorVariables: true
				}
			]
		]);
	});
}