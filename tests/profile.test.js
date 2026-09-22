import test from 'node:test';
import assert from 'node:assert/strict';
import {freshProfile,migrateProfile,validateProfile} from '../src/engine.js';
test('fresh profiles and v6 migration retain the current campaign format',()=>{const p=freshProfile();assert.ok(validateProfile(p));const old={...p,version:6,activeGame:{economy:{taxRate:20},buildings:{city:{fields:1}}}};const next=migrateProfile(old);assert.ok(validateProfile(next));assert.deepEqual(next.activeGame,old.activeGame);});
test('invalid campaign envelopes remain rejected',()=>{for(const p of [null,{},[],{...freshProfile(),florins:-1},{...freshProfile(),deck:Array(17).fill('city')},{...freshProfile(),collection1300:[]}])assert.equal(validateProfile(p),false);});
