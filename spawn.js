import * as R from "ramda";
import {canvas,render} from './canvas.js';
const {sort, __, lte, converge, path, addIndex, curry, filter, prop, propEq, alwys, cond, equals, is, range, pipe, map, forEach, tap}= R;
const loop= range(0);
window.canvas=canvas;
window.loop=loop;
const padding=25;
const offset=50;
const areaLength=7;
const getRect=([x,y],i)=> new fabric.Rect({
  name:"rect",
  index:i,
  position:[(x-offset)/padding, (y-offset)/padding],
  left: x,
  top: y,
  fill: 'white',
  width: 20,
  height: 20
});
const path0= path(['position',0])
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