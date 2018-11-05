var path = require('path'),
	webpack = require('webpack');
module.exports = function(config) {
	var appFiles = ['test/require.js', 'config/**/*.js', 'app/**/*.js'];

	var testFiles = ['test/sandbox/test.js'];
	config.set({
		basePath: '',
		frameworks: ['jasmine', 'jasmine-matchers'],
		plugins: [
			'karma-jasmine',
			'karma-jasmine-matchers',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-jasmine-html-reporter',
			'karma-coverage',
			'karma-junit-reporter',
			'karma-coverage-istanbul-reporter'
		],
		files: appFiles.concat(testFiles),
		preprocessors: {
			'test/**/*.js': ['coverage']
		},
		webpack: {
			resolve: {
				root: [
					path.resolve('app'),
					path.resolve('config')
				],
				modulesDirectories: [
					'app',
					'node_modules'
				],
				alias: {},
				extensions: ['', '.js', '.json']
			},
			module: {},
			stats: {
				colors: true,
				reasons: true
			},
			progress: true,
			plugins: []
		},
		reporters: ['progress', 'junit', 'kjhtml', 'coverage'],
		coverageReporter: {
			dir: 'coverage/',
			reporters: [
				{ type: 'lcov', subdir: 'report-lcov' },
				{ type: 'cobertura', subdir: 'report-cobertura' }
			]
		},
		junitReporter: {
			outputDir: 'tests/xml-reports/'
		},
		kjhtmlReporter: {
			outputDir: 'tests/html-reports/'
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['PhantomJS', /*'ChromiumHeadless'*/],
		customLaunchers: {
			ChromiumHeadless: {
				base: 'Chromium',
				flags: [
					'--headless',
					'--no-sandbox',
					'--disable-gpu',
					'--remote-debugging-port=9222'
				]
			}
		},
		singleRun: false,
		concurrency: Infinity
	})
}
