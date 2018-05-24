export default class Util {
  public static center(object: any, parent: any) {
    this.hcenter(object, parent);
    this.vcenter(object, parent);
  }

  public static hcenter(object: any, parent: any) {
    object.x = (parent.width - object.width) / 2;
  }

  public static vcenter(object: any, parent: any) {
    object.y = (parent.height - object.height) / 2;
  }
}
