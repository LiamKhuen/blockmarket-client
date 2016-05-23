/// <reference path="../typings/index.d.ts" />
import * as sass from 'gulp-sass';

class Test {
  public t:string = "hello";

  constructor() {
    alert("Hello!");
  }
}

var t:Test = new Test();
