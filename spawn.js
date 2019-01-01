import * as R from "ramda";
import {canvas,render} from './canvas.js';
const {sort, __, lte, converge, path, addIndex, curry, filter, prop, propEq, alwys, cond, equals, is, range, pipe, map, forEach, tap}= R;
const loop= range(0);
const log=tap(console.log);
window.canvas=canvas;
window.loop=loop;
const padding=30;
const offset=50;
const areaLength=7;
const getPosition= xy=> (xy-offset)/padding;
const getRect=([x,y],i)=> new fabric.Rect({
  name:"rect",
  index:i,
  positionArray:[getPosition(x), getPosition(y)],
  position:`${getPosition(x)},${getPosition(y)}`,
  left: x, top: y,
  originX: "center", 
  originY: "center",
  fill: 'white',
  width: 20, height: 20,
  count: 0,
  ani: []
});
const path0= path(['positionArray',0])
const diff= (a,b)=> path0(a)>path0(b);

const spawnRects=(cols,rows,padding,xoff,yoff)=>
  pipe(
  R.addIndex(map)((__,i)=>[~~(i%cols)*padding+xoff, ~~(i/cols)*padding+yoff]),
  R.addIndex(map)(getRect),
  sort(diff),
  forEach(o=>canvas.add(o))
  )(range(0,rows*cols))
spawnRects(areaLength, areaLength, padding, offset, 50)
const rects=filter(propEq('name','rect'))(canvas.getObjects());
export {rects,render,areaLength}