import { fabric } from 'fabric';

const width=window.innerWidth;
const height=window.innerHeight;
const canvasConfig={
	backgroundColor: 'rgba(0,0,0,.3)',
	width, height
}
// document.querySelector('canvas').width = ;
// document.querySelector('canvas').height = ;
const canvas = new fabric.StaticCanvas('canvas',canvasConfig);
const render=canvas.renderAll.bind(canvas);
window.render=render;
export {canvas,render};
