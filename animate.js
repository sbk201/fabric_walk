import * as R from "ramda";
import {canvas,render} from './canvas.js';
import {rects as rects_,areaLength} from './spawn.js';
const {sort, __, lte, converge, path, addIndex, curry, filter, prop, propEq, alwys, cond, equals, is, range, pipe, map, forEach, tap}= R;
const rects=R.splitEvery(areaLength)(rects_);
const mapIndex=addIndex(map);
const setRed=curry((rects, [x,y])=> rects[x][y].set('fill','red'))
// const setPosition= (_x,_y)=> object=> {
//   const x=cond([
//     [is(Number), i=>i],
//     [equals('0'), always(object.left)],
//     [is(String), x=> parseInt(x)+object.left],
//     [R.T, x=>{throw `unknown ${x}`}]
//   ])(_x);
//   const y=cond([
//     [is(Number), i=>i],
//     [equals('0'), always(object.top)],
//     [is(String), y=> parseInt(y)+object.top],
//     [i=>1, y=>{throw `unknown ${y}`}]
//   ])(_y);
//   object.set({left:x, top:y}); 
//   return object;
// }
var error= message=> {
  throw message;
}
const log=tap(console.log);
const startPoint=[3,3];
const setStep=([x,y,steps], index)=> {
  const step= (index+1)*Math.sign(steps);
  return [x, y, step]
}
// const setStep2= 
const addStep= sign=> ([x, y, step])=> sign==='x' ? 
  [x+step, y] : [x, y-step];
const validArr= ([x,y])=> (x>=0 && y>=0)? 
  ([x,y]) : error(`${[x,y]} is negative`)
const lineXY= (sign, steps, pos)=> pipe(
  Math.abs, loop, 
  map(a=>pos.concat(steps)),
  // mapIndex(setStep2),
  mapIndex(setStep),
  map(addStep(sign)),
  map(validArr),
  tap(forEach(setRed(rects))),
  R.last
)(steps)
console.log(lineXY('x',3,[3,3]));
window.setRed=setRed;
window.rects=rects;
const keypress=e=> {
  console.log(e);
  setRed(rects, startPoint);
  // setPosition("+10","+50")(rects[0]);
  // rect.set({left:0, top:0})
  render();
};
document.querySelector('body').addEventListener('keypress',keypress)
// forEach(o=>canvas.add(o))(rects);
// function itemRun(canvas, item ) {
//   item.animate('left', '+=50', {
//     duration: 3 * 1000,
//     onChange: render,
//     onComplete: function() {
//       itemRun(canvas, item)
//     }
//   })
// }
// itemRun(canvas,rect);