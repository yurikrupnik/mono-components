import reduce from 'lodash/reduce';
import path from 'path';
import sass from 'rollup-plugin-sass';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
const name = process.cwd();
const input = path.join(name, 'lib/index.js');

const filter = reduce(
    Object.assign({}, pkg.peerDependencies, pkg.dependencies),
    (acc, val, key) => acc.concat(key), []
);

const fileName = 'index.js';
const plugins = [
    babel({
        rootMode: 'upward',
    }),
    resolve({
        extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    sass({}),
];

export default [
    // UMD
    {
        input,
        output: {
            file: path.join(name, 'dist', 'umd', `${fileName}`),
            format: 'umd',
            name: name
        },
        external: filter,
        plugins
    },
    // ES
    {
        input,
        output: {
            file: path.join(name, 'dist', 'esm', `${fileName}`),
            format: 'esm',
        },
        external: filter,
        plugins
    }
];
