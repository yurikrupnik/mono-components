// import replace from 'rollup-plugin-replace';
import reduce from 'lodash/reduce';
// import autoExternal from 'rollup-plugin-auto-external';

import path from 'path';
//

// import * as plugins from './rollup/plugins';
// import { terser as terserPlugin } from 'rollup-plugin-terser';
import sass from 'rollup-plugin-sass';
import resolve from 'rollup-plugin-node-resolve';
// import analyze from 'rollup-plugin-analyzer';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const name = process.cwd();
const input = path.join(name, 'lib/index.js');

const filter = reduce(
    Object.assign({}, pkg.peerDependencies, pkg.dependencies),
    (acc, val, key) => acc.concat(key), []
).concat([
    '@material-ui/core/Button'
]);

const fileName = 'index.js';
const plugins = [
    babel({
        // runtimeHelpers: true,
        // exclude: 'node_modules/**',
        rootMode: 'upward',
    }),
    resolve({
        // modulesOnly: true, // Default: false
        extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    sass({
        // insert: true
    }),
    // analyze()
];
// console.log('PACKAGE_ROOT_PATH', PACKAGE_ROOT_PATH);

export default [
    // UMD
    {
        input,
        output: {
            file: path.join(name, 'dist', 'umd', `${fileName}`),
            format: 'umd',
            name: name
            // indent: false,
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
            // indent: false,
        },
        external: filter,
        plugins
    }
];
