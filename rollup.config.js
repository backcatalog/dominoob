import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default [
    {
        input: 'src/_main.js',
        output: {
            file: 'dist/dominoob.js',
            format: 'iife',
            name: 'dominoob',
        },
        plugins: [
            babel({exclude: 'node_modules/**'}),
        ],
        watch: {
            include: 'src/**',
        },
    },
    {
        input: 'src/_main.js',
        output: {
            file: 'dist/dominoob.min.js',
            format: 'iife',
            name: 'dominoob',
        },
        plugins: [
            babel({exclude: 'node_modules/**'}),
            uglify(),
        ],
        watch: {
            include: 'src/**',
        },
    },
];
