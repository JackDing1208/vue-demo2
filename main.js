/*声明全局组件
Vue.component('firs-component',{
    template:'<div>我是第一个组件</div>'
})*/

var app = new Vue({
    el: "#app",
    data: {
        parentMessage: '父组件中双向绑定的data',
        parentMessage2: '22222动态的data',
        width: 200

    },
    //声明局部组件
    components: {
        'btn-component': {
            template: "<button @click='msg++'>{{msg}}</button>",
            data: function () {   //data的值必须为方法，返回的对象数据来自本身
                return {msg: 0}
            }
        },
        'child-component': {
            props: ['msg'],    //props中数据对象来自父级
            template: '<div>{{msg}}</div>  '
        },
        'bind-component': {
            props: ['msg'],    //props中数据对象来自父级
            template: '<div>{{msg}}</div>  '
        },
        'width-component': {
            props: ['prop1'],    //props中数据对象来自父级data,随其动态变化,属性名自定义
            template: `<div>
                <div :style="style1">我的宽度是动态的{{prop1}}px</div> 
                <div :style="style2">我的宽度是初始的{{initWidth}}px</div> 
                     </div>`,
            data: function () {
                return {
                    initWidth: this.prop1   //作为基础值存在组件data中不会随父组件动态变化
                }
            },
            computed: {
                style1:function(){
                    return{
                        width: this.prop1 + 'px',
                        background:'red',
                        lineHeight:'30px',
                    }
                },
                style2:function(){
                    return{
                        width: this.initWidth + 'px',
                        background:'red',
                        lineHeight:'30px',
                    }
                }
            }
        },
    }
})
