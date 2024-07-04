/**
 * 克隆数组或对象
 * @param obj array | object
 * @returns
 */
interface IClone {
    [x: string]: any;
    hasOwnProperty: (arg0: string) => any;
}
declare function clone(obj: IClone | IClone[] | null): any;
export { clone };
