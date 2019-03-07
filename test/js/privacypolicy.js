
var privacypolicySectionClass = function(){
    var parent = new BaseSectionAnimationClass("#privacypolicy.page .privacypolicy.section");
    parent.onCreate = function(){
        parent.inheritance.onCreate();
    }
    parent.onActive = function(){
        parent.inheritance.onActive();
    }
    return parent;
}
var privacypolicyPageClass = function(){
    var parent = new PjaxPageClass();
    parent.parts = {
        s1: new privacypolicySectionClass()
    }
    return parent;
}