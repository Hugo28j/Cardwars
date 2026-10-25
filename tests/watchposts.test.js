import test from 'node:test';
import assert from 'node:assert/strict';
import {watchpostCapacity1300,watchpostTravelDays1300,incomingWatchpostSoldiers1300,watchpostSupplyBill1300} from '../src/watchposts1300.js';

test('watchpost capacity scales with level and has safe bounds',()=>{
 assert.equal(watchpostCapacity1300(1),150);
 assert.equal(watchpostCapacity1300(2),400);
 assert.equal(watchpostCapacity1300(3),900);
 assert.equal(watchpostCapacity1300(200),900);
});
test('stationing and withdrawing takes a few days based on placement grid distance',()=>{
 assert.equal(watchpostTravelDays1300(3,2),2);
 assert.equal(watchpostTravelDays1300(0,0),5);
 assert.ok(watchpostTravelDays1300(6,4)>watchpostTravelDays1300(4,2));
});
test('incoming transport troops reserve space at their destination',()=>{
 const transfers=[{direction:'to-post',postId:9,units:{archers:8,'levy-swordsmen':7}},{direction:'from-post',postId:9,units:{archers:5}},{direction:'to-post',postId:12,units:{archers:50}}];
 assert.equal(incomingWatchpostSoldiers1300(transfers,9),15);
 assert.equal(incomingWatchpostSoldiers1300(transfers,12),50);
});
test('food is dynamically cheapest and maintenance includes small wood or stone share',()=>{
 const prices={grain:5,fish:3,meat:7,wood:2,stone:10};
 const p={level:1,men:40};
 const bill=watchpostSupplyBill1300(p,id=>prices[id]);
 assert.equal(bill.food,'fish');assert.equal(bill.material,'wood');
 assert.ok(bill.total>0);assert.ok(bill.foodQty*prices[bill.food]>bill.materialQty*prices[bill.material]);
 prices.grain=1;
 assert.equal(watchpostSupplyBill1300(p,id=>prices[id]).food,'grain');
 assert.equal(watchpostSupplyBill1300({level:3,men:80},id=>prices[id]).material,'stone');
});
