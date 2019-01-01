import * as R from "ramda";
import {canvas,render} from './canvas.js';
import {rects as rects_,areaLength} from './spawn.js';
const { compose, always, inc, lensPath, view, over, set:setLens, countBy, last, tail, reduce, sort, __, lte, converge, path, addIndex, curry, filter, prop, propEq, alwys, cond, equals, is, range, pipe, map, forEach, tap}= R;
const log=tap(console.log);
const rects=R.splitEvery(areaLength)(rects_);
const mapIndex=addIndex(map);
const setColor=curry((color, rects, [x,y])=> rects[x][y].set('fill',color))

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
)(steps))
const userInput= [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2];
const xyOr= index=> index%2 ===0? "x" :"y";
const pnOr= index=> (index%4 ===0 || index%4 ===3)? 1 : -1;
const mapFn= (step,index)=> lineXY( xyOr(index), step* pnOr(index) );
const reduceFn= (self,lineFn)=> self.concat(lineFn(last(self)))

const getLines=(function (){
  const startPoint=[3,3];
  return pipe(
  mapIndex(mapFn), reduce(reduceFn,[startPoint]), tail
  );
})();
const addCount= curry((rects,posArr)=>{
  const adding= (rects, pos)=> {
    const thePath=lensPath(pos.concat('count'));
    return over(thePath, inc, rects);
  };
  return reduce(adding, rects)(posArr);
});
const whichColor= cond([
  [equals(0), always('white')],
  [i=> (i-1)%2===0, always('red')],
  [i=> (i-1)%2===1, always('blue')],
]);
const setRectsColor= forEach(forEach(
  rect=> anim.size(rect, rect.get('scaleX'))
  ))
const setRectsColor2= forEach(forEach(
  rect=> setColor(whichColor(rect.count), rects, rect.positionArray)
  ))
const updateRects= rects=> {
  return pipe(
  getLines,
  addCount(rects),
  setRectsColor,
  render
  )};
// console.log(result);
// console.log(result[3][3])
const anim=(function (){
  const animateSize=(theRect, initX)=>{
    const initV= theRect.get('scaleX');
    const fn1= toSize(initV, 1.4, theRect);
    const fn2= toSize(1.4, 1, theRect);
    const fn3= ()=>{};
    const fns=[fn1,fn2,fn3];
    fn1({index:1, fns});
    // fn1(()=>fn2(()=>fn3));

    // fn1(fn2)(f);
    // fn2(f);
    // fn1([fn2,f]);
    // const result=fn1();
    // console.log('result is :',result)
        
    // setColor=curry((color, rects, [x,y])
  }
  /*
  next={index:0, fns=[f1,f2,f3]}
  onComplete:()=>{
    const {index, fns} = next;
    fns[index]({index:index+1, fns});
  }
  */
  const toSize= curry((initV, endV, target, next)=>{
    fabric.util.animate({
      startValue: initV,
      endValue: endV,
      duration: 200,
      onChange: function(value) {
        target.scale(value);
        canvas.renderAll();
      },
      onComplete: function() {
        const {index, fns} = next;
        fns[index]({index:index+1, fns});
        // nextFn && nextFn();
        // if( !is(Array,nextFn) ) console.error("nextFn is not array, ",nextFn);
        // nextFn[0] && nextFn[0](nextFn.slice(1));
        // setColor(whichColor(target.count), rects, target.positionArray);
      }
    });
  });
  return {size:animateSize, }
})();
const keypress=e=> {
  const target=rects[3][3];

  anim.size(target, target.get('scaleX'));

  render();
};
const result=updateRects(rects)(userInput);
const onUserInput=updateRects(rects);
document.querySelector('body').addEventListener('keypress',keypress)
const rect=rects[4][3];
Object.assign(window,{updateRects,lineXY, rect, rects, mapIndex, onUserInput});
