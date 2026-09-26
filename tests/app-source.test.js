import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('owned province military panel calls the existing war-target helper',()=>{
 const source=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 assert.match(source,/for\(const row of warTargetCities1300\(game\)\)/);
 assert.doesNotMatch(source,/warTargetSCities1300/);
});
