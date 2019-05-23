module.exports = function (api) {
    api.cache(true);
// console.log('api', api);

    const presets = [
        ['@babel/preset-env', {
            // rootMode: 'upward',
            'targets': {
                'node': 'current'
            },
            'modules': false,
            'loose': true
        }],
        ['@babel/preset-react']
    ];
    const plugins = [
        '@babel/plugin-syntax-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        // 'react-loadable/babel'
    ];

    return {
        babelrcRoots: [
            '.',
            'packages/*'
        ],
        presets,
        plugins,
        env: {
            test: {
                plugins: [
                    "transform-es2015-modules-commonjs"
                ]
            }
        }
    };
};

// {
//   'presets': [
//     ['@babel/preset-env', {
//       'targets': {
//         'node': 'current'
//       },
//       'modules': false,
//       'loose': true
//     }],
//     ['@babel/preset-react']
//   ],
//   'plugins': [
//     '@babel/plugin-syntax-object-rest-spread',
//     '@babel/plugin-syntax-dynamic-import',
//     'react-loadable/babel'
//   ],
//   'env': {
//     'test': {
//       'plugins': [
//         'transform-es2015-modules-commonjs'
//       ]
//     }
//   }
// }
