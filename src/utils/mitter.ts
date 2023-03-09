import mitt, { type Emitter } from "mitt";

type Events = {
  [propName: string]: any;
};
// 提供泛型参数让 emitter 能自动推断参数类型
const mitter: Emitter<Events> = mitt<Events>();

export default mitter;
