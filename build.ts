import s from 'shelljs';
const config = require('./tsconfig.json');
const outDir = 'dist';

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);