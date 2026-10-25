// Strategic orders for the province-based campaign. Never mint units or bypass army movement.
export function campaignFrontOrders1300(game){
 if(!game)return [];
 if(!Array.isArray(game.frontOrders))game.frontOrders=[];
 game.frontOrders=game.frontOrders.filter(o=>o&&['attack','defend'].includes(o.type)&&typeof o.armyKey==='string'&&typeof o.target==='string'
   &&Number.isFinite(Number(o.expiresDay))&&Number(o.expiresDay)>Number(game.day||0)).slice(-80);
 return game.frontOrders;
}
export function createCampaignFrontOrder1300(game,{type,armyKey,from,target,travelDays=0}){
 if(!game||!['attack','defend'].includes(type)||!armyKey||!target)return null;
 const orders=campaignFrontOrders1300(game);
 const startDay=Math.max(0,Math.floor(Number(game.day)||0));
 const order={id:'front-'+startDay+'-'+String(armyKey).replace(/[^a-z0-9_-]/gi,'').slice(0,50),
  type,armyKey:String(armyKey),from:String(from||target),target:String(target),createdDay:startDay,
  expiresDay:startDay+Math.max(10,Math.ceil(Number(travelDays)||0)+10)};
 game.frontOrders=[...orders.filter(o=>o.armyKey!==order.armyKey),order].slice(-80);
 return order;
}
export function frontOrderDefensePct1300(game,armyKey,cityId){
 return campaignFrontOrders1300(game).some(o=>o.type==='defend'&&o.armyKey===armyKey&&o.target===cityId)?15:0;
}
