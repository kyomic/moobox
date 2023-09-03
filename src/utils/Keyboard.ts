import { Emitter } from "@/event";
import { browser } from "./browser";

export type KeyboardEventType = 'keydown' | 'keypress' | 'keyup'
export const KeyMap = {
  '9': 'TAB',
  '27': 'ESC'
}
/**
 *  支持的组合键
 */
export const ComposeKey = ['CTRL', 'ALT', 'SHIFT']
export default class Keyboard extends Emitter {
  static _instance: Keyboard
  static _handles: Record<string, () => void> = {}
  constructor() {
    super()
  }

  static getInstance() {
    if (!Keyboard._instance) {
      Keyboard._instance = new Keyboard()
    }
    return Keyboard._instance
  }

  static __onKeyEvent() {

  }
  static isMatchCode(event: KeyboardEvent, str: string) {
    const { keyCode, altKey, shiftKey, ctrlKey, metaKey } = event
    const keyinfo: string[] = str.split('+').filter((item => {
      return ((!!item) ? item : '').toUpperCase()
    }))

    const key = KeyMap[keyCode] || String.fromCharCode(keyCode).toUpperCase()
    let matchedComposeKey = true;
    let matchedKey = true;
    const pressKey = keyinfo.find(item => {
      if (ComposeKey.indexOf(item) === -1) {
        return true;
      } else {
        if (item == 'CTRL' && browser.platform.ios) {
          // ios 时 meta键当ctrl键用
          item = 'META'
        }
        const lowerkey = item.toLowerCase() + 'Key'
        if (!event[lowerkey]) {
          matchedComposeKey = false;
        }
      }
    })
    if (pressKey && pressKey != key) {
      matchedKey = false;
    }
    if (matchedComposeKey && matchedKey) {
      return true;
    }
    return false;
  }

  static generatePrivateHandler(type: KeyboardEventType, key: string, callback?: (() => void)) {
    const uniqueKey = `${type}_${key}`;
    const handler = Keyboard._handles[uniqueKey] || ((evt) => {
      const matchKeyCode = this.isMatchCode(evt as KeyboardEvent, key)
      if (matchKeyCode) {
        evt.preventDefault();
        if (callback) {
          callback()
        }
      }
    })
    // TODO
    //Keyboard._handles[uniqueKey] = handler;
    return handler;
  }
  static addEventListener(type: KeyboardEventType, key: string, handler: () => void) {
    document.addEventListener(type, Keyboard.generatePrivateHandler(type, key, handler))
  }
  static removeEventListener(type: KeyboardEventType, key: string) {
    document.removeEventListener(type, Keyboard.generatePrivateHandler(type, key))
  }
}
