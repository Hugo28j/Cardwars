// Government outposts: independent of private company buildings.
export const WATCHPOST_CAPACITY_1300=Object.freeze({1:150,2:400,3:900});
export function watchpostCapacity1300(level){
 return WATCHPOST_CAPACITY_1300[Math.max(1,Math.min(3,Math.floor(Number(level)||1)))];
}
// The province has a seven-by-five placement grid; the castle is at (3,2).
// Crossing additional squares takes more in-game days, never instant.
export function watchpostTravelDays1300(x,y){
 const distance=Math.abs(Math.max(0,Math.min(6,Number(x)||0))-3)+Math.abs(Math.max(0,Math.min(4,Number(y)||0))-2);
 return 2+Math.ceil(distance/2);
}
export function incomingWatchpostSoldiers1300(transfers,postId){
 return (transfers||[]).filter(t=>t.direction==='to-post'&&String(t.postId)===String(postId))
  .reduce((sum,t)=>sum+Object.values(t.units||{}).reduce((n,v)=>n+Math.max(0,Math.floor(Number(v)||0)),0),0);
}
export function watchpostSupplyBill1300(post,price){
 const food=['grain','fish','meat'].reduce((best,id)=>price(id)<price(best)?id:best,'grain');
 const level=Math.max(1,Math.min(3,Math.floor(Number(post?.level)||1)));
 const men=Math.max(0,Math.floor(Number(post?.men)||0));
 const material=level===1?'wood':'stone',foodQty=men*.006+level*.12,materialQty=.025*level;
 return {food,foodQty,material,materialQty,total:Math.round(7*(foodQty*price(food)+materialQty*price(material))*100)/100};
}
