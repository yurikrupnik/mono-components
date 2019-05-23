import cjsPlugin from 'rollup-plugin-commonjs';
import { terser as terserPlugin } from 'rollup-plugin-terser';
import nodeResolvePlugin from 'rollup-plugin-node-resolve';
import analyze from 'rollup-plugin-analyzer'
import babelPlugin from 'rollup-plugin-babel';

const { LERNA_ROOT_PATH } = process.env;

export const anal = analyze();

export const cjs = cjsPlugin({
	include: /node_modules/,
	namedExports: {
		// '../../node_modules/react/index.js': [
		// 	'Children',
		// 	'Component',
		// 	'createElement',
		// 	'createContext',
		// ],
		// '../../node_modules/react-is/index.js': ['isValidElementType'],
	},
});

export const terser = terserPlugin({
	compress: {
		pure_getters: true,
		unsafe: true,
		unsafe_comps: true,
		warnings: false,
	},
});

export const nodeResolve = nodeResolvePlugin();

export const babel = babelPlugin({
	// cwd: LERNA_ROOT_PATH,
	runtimeHelpers: true,
	exclude: 'node_modules/**',
    rootMode: 'upward',
});
