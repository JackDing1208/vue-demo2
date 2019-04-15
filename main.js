var app=new Vue({
    el:"#app",
    data:{},
    components:{
        app1:{
        template:"<div>{{msg}}</div>",
            data:function () {
                 msg='haha'
            }

        }
    }
})
