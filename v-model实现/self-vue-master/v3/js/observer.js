/**Observer 
 * 构造函数 
 * 1 用来做数据劫持,数据监听器
 * Observer劫持并监听所有属性变化,
 * 递归遍历
 * 
 * */
class Observer{
    constructor(data){
        this.data = data;
        this.walk(data);
    }
    walk(data){
        var self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });
    }
    defineReactive(data, key, val){
        var dep = new Dep();
        var childobj = observe(val)
        Object.defineProperty(data,key,{
            enumerable: true,
            configurable: true,
            get:function getter() {
                if (Dep.target) {
                   dep.addSub(Dep.target);
                }
                return val;  
            },
            set: function setter (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }  
        })
    }
}
function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};

class Dep{
    constructor(){
        this.subs = [];
    }
    addSub(sub){
        this.subs.push(sub);
    }
    notify(){
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}
Dep.target = null;
