const MixinAjax = {
  baseAjax(x){
    return {
      actNo:x,
      timestamp: new Date().getTime(),
      terminalOs:'H5',
      appVersion:'1.0.0',
      userId : sessionStorage.userId,
    }
  }
}
export default  MixinAjax;
