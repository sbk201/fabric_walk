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