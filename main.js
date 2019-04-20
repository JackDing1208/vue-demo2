/*声明全局组件
Vue.component('firs-component',{
    template:'<div>我是第一个组件</div>'
})*/

var app = new Vue({
    el: "#app",
    data: {
        parentMessage: '父组件中双向绑定的data',
        parentMessage2: '22222动态的data',
        width: 200,
        amount1: 1000,
        amount2: 1000,
        bus: new Vue(),
        init:'111',
        line:'line1'
    },
    methods: {
        amountChange: function (value) {    //value为子组件传过来的参数
            this.amount1 = value
        },
        getChild:function () {
            this.init=this.$refs.aaa.msg
        },
        lineSwitch(value){
            this.line='line'+value
        }
    },


    //声明局部组件
    components: {
        'btn-component': {
            template: "<button @click='add'>{{msg}}</button>",
            data: function () {   //data的值必须为方法，返回的对象数据来自本身
                return {msg: 0}
            },
            methods: {
                add: function () {
                    this.msg += 1
                }
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
                style1: function () {
                    return {
                        width: this.prop1 + 'px',
                        background: 'red',
                        lineHeight: '30px',
                    }
                },
                style2: function () {
                    return {
                        width: this.initWidth + 'px',
                        background: 'red',
                        lineHeight: '30px',
                    }
                }
            }
        },
        'amount-component': {
            template: `<div>
                        <button @click="plus">+1</button>
                        <button @click="minus">-1</button>       
                       </div>`,
            data: function () {
                return {
                    init: 1000,
                }
            },
            methods: {
                plus: function () {
                    this.init += 1
                    this.$emit('subclick', this.init)   //触发自定义事件并传递参数
                    this.$emit('input', this.init)
                },
                minus: function () {
                    this.init -= 1
                    this.$emit('subclick', this.init)   //触发事件名，要传的参数
                    this.$emit('input', this.init)
                }
            }
        },
        'aaa-component': {
            template: `<div>
            <input type="text" v-model="msg">
            <button @click="sendMsg">点我传内容</button></div>`,
            data: function () {
                return {
                    msg: '我是A组件要传的内容'
                }
            },
            methods: {
                sendMsg: function () {
                    this.$root.bus.$emit('haha', this.msg)
                }
            }
        },
        'bbb-component': {
            template: '<div>我是组件B：{{content}}</div>',
            data: function () {
                return {
                    content: '等着传内容'
                }
            },
            created: function () {
                this.$root.bus.$on('haha', (value) => {
                    this.content = value
                })
            }
        },
        'getparent-component':{
            template:'<div>{{init}}</div>',
            data:function () {
                return{
                    init:'111'
                }
            },
            created:function () {
                this.init=this.$parent.parentMessage
            }
        },
        'slot-component':{
            template:`<div>
                    <slot>默认内容</slot>
                       </div>`
        },
        'line1':{
            template:`<div>窗前明月光</div>`
        },
        'line2':{
            template:`<div>疑是地上霜</div>`
        },
        'line3':{
            template:`<div>举头望明月</div>`
        },
        'line4':{
            template:`<div>低头思故乡</div>`
        }


    }

})
