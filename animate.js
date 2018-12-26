import * as R from "ramda";
import {canvas,render} from './canvas.js';
import {rects as rects_,areaLength} from './spawn.js';
const {last, tail, reduce, sort, __, lte, converge, path, addIndex, curry, filter, prop, propEq, alwys, cond, equals, is, range, pipe, map, forEach, tap}= R;
const log=tap(console.log);
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
const startPoint=[3,3];
const setStep=([x,y,steps], index)=> {
  const step= (index+1)*Math.sign(steps);
  return [x, y, step]
}
const addStep= sign=> ([x, y, step])=> sign==='x' ? 
  [x+step, y] : [x, y-step];
const validArr= ([x,y])=> (x>=0 && y>=0)? 
  ([x,y]) : error(`${[x,y]} is negative`)
const lineXY= curry((sign, steps, pos)=> pipe(
  Math.abs, loop, 
  map(a=>pos.concat(steps)),
  mapIndex(setStep),
  map(addStep(sign)), 
  // map(validArr),
  // tap(forEach(setRed(rects))),
)(steps))
const userInput= [1,2,3,4];
const xyOr= index=> index%2 ===0? "x" :"y";
const pnOr= index=> (index%4 ===0 || index%4 ===1)? 1 : -1;
const mapFn= (step,index)=> lineXY( xyOr(index), step* pnOr(index) );
const reduceFn= (self,lineFn)=> self.concat(lineFn(last(self)))
const theLines=pipe(
mapIndex(mapFn),
reduce(reduceFn,[[3,3]]),tail
)(userInput);
console.log(theLines);
Object.assign(window,{lineXY, setRed, rects, mapIndex});
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