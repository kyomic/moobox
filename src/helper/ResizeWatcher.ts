import { Emitter } from "@/event"

export type DOMRect = {
  x:number,y:number,width:number,height:number,bottom?:number,top?:number,left?:number,right?:number
}
export type ResizeObserverEntry = {
  borderBoxSize?:Array<{inlineSize:number, blockSize:number}>,
  contentBoxSize?:Array<{inlineSize:number, blockSize:number}>,
  devicePixelContentBoxSize?:Array<{inlineSize:number, blockSize:number}>,
  contentRect:DOMRect,
  target:HTMLElement
}

export class PolyfillResizeObserver{
  private _callback:(entries:ResizeObserverEntry )=>void
  private _target:HTMLElement|null = null;
  private _evtOnResize
  constructor( callback:(entries:ResizeObserverEntry )=>void){
    this._callback = callback
    this._evtOnResize = this.onResize.bind(this)
  }
  observe( target:HTMLElement){
    this._target = target
    window.addEventListener('resize', this._evtOnResize);
    
  }
  unobserver(target:HTMLElement){
    
  }
  disconnect(){
    window.removeEventListener('resize', this._evtOnResize);
  }

  private onResize(e:Event){
    if( this._target ){
      this._callback({
        contentRect:this._target.getBoundingClientRect(),
        target:this._target
      })
    }
  }
}
export default class ResizeWatcher extends Emitter{
  private _target:HTMLElement|null = null;
  private _observer;
  constructor(){
    super()
    if( ('ResizeObserver' in window) ){
      const ResizeObserver:any= window['ResizeObserver']
      this._observer = new ResizeObserver(entries => {
          console.log(entries)
          this.dispatch('resize')
      })
    }else{
      this._observer = new PolyfillResizeObserver(entries=>{
        console.log(entries)
        this.dispatch('resize')
      })
    }
  }
  observe( target:HTMLElement){
    this._target = target
    this._observer.observe( target )
  }
  unobserver(target:HTMLElement){
    this._observer.unobserver()
  }
  disconnect(){
    this._observer.unobserver()
  }
}
