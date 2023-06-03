import { Emitter } from "@/event";
import { createNode } from "@/utils";

export type IconStyle = {
  color?:number|string,
  width?:number,
  height?:number
}
export default class Icon extends Emitter{
  static defaultOption:IconStyle ={
    width:20,height:20,
    color:'#FFFFFF'
  }
  public container:HTMLElement
  public name:string
  public icon
  public style:IconStyle
  constructor(root:HTMLElement,name, style:IconStyle= Icon.defaultOption ){
    super()
    this.container = root;
    this.name = name
    this.style = Object.assign({}, style||{})
    this.icon = createNode('icon', this.container)
    let html = `
    <svg class="svg-icon" style="width: ${this.style.width}px; height:${this.style.height}px; color: ${this.style.color}">
    <use xlink:href="#${this.name}" fill="${this.style.color}" />
  </svg>
    `
    this.icon.innerHTML = html;
  }
}
