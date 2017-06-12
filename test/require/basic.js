'use strict';

module.exports = (test) => {
	describe('basic', function () {
		test([
			[
				[
					`.class-1 {`,
					`	padding-bottom: ;`,
					`}`,
				].join('\n'),
				[
					``
				].join('\n')
			],
			[
				[
					`.class-1 {`,
					`	margin: auto;`,
					`	padding-bottom: ;`,
					`}`,
				].join('\n'),
				[
					`.class-1`,
					`	margin auto`
				].join('\n')
			],
			[
				[
					`#header .second.nmenu > li {`,
					`	margin-right: 10px;`,
					`}`,
					`#header .second.nmenu > li > a {`,
					`	width: 55px;`,
					`	color: #bfd7ff;`,
					`}`,
					`#header .nmenu > li a.active {`,
					`	background-color: #4c5ac2;`,
					`}`,
					`#header .second.nmenu > li:hover > a {`,
					`	color: #fff;`,
					`}`,
					`#header .second.nmenu > li:last-child{`,
					`	margin-right: -6px;`,
					`}`,
					`#header .second.nmenu > li > a .icon {`,
					`	top: 16px;`,
					`	margin-bottom: 27px;`,
					`	width: 22px;`,
					`	height: 15px;`,
					`}`
				].join('\n'),
				[
					`#header`,
					`	.second`,
					`		&.nmenu`,
					`			>li`,
					`				margin-right 10px`,
					`				>a`,
					`					width 55px`,
					`					color #bfd7ff`,
					`					.icon`,
					`						top 16px`,
					`						margin-bottom 27px`,
					`						width 22px`,
					`						height 15px`,
					`				&:hover`,
					`					>a`,
					`						color #fff`,
					`				&:last-child`,
					`					margin-right -6px`,
					`	.nmenu`,
					`		>li`,
					`			a`,
					`				&.active`,
					`					background-color #4c5ac2`
				].join('\n')
			]
		])
	});
};