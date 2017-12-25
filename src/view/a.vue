<template>
    <div>
    	<Button v-on:click="openall">全部开启</Button>
    	<Button v-on:click="closeall">全部关闭</Button>
        <Table border @on-select-all="selall"@on-select="onselect" @on-select-cancel="selcanc" ref="selection" :columns="columns4" :data="data1"></Table>
        <Button  type="primary" v-on:click="sfsdfs">获取已选项</Button>
    </div>
</template>
<script>
	let setall = function(a,b,c){
		if(a.length>0){
			for(let i=0;i<b.length;i++){
	    		for(let j=0;j<a.length;j++){
	    			if(b[i].id==a[j].id){
	    				b[i].pause = c;
	    			}
	    		}
	    	}
		}
	}
	export default {
    data () {
        return {
        	sfsdfs: ()=>{
        		console.log(this.finaldata)
        	},
        	finaldata:[],
            columns4: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    //title:'全选',
                },
                {
                    title: '开关',
                    key: 'pause',
                    render: (h, params) => {
                    	//console.log(h)
                    	//console.log(params)
                        return h('div', [
                            h('i-switch', {
                                props: {
                                  value:params.row.pause,
                                  'true-value':0,
                                  'false-value':1
                                },
                                on:{
                                    'on-change':(changeval) => {
                                        //params.row.pause = changeval;
                                        this.data1[params.index].pause = changeval;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: 'ID',
                    key: 'id'
                },
                {
                    title: '计划状态',
                    key: 'status'
                }
            ],
            data1: [
                {
                    pause: 0,
                    id: 18,
                    status: 'New1',
                },
                {
                    pause: 1,
                    id: 24,
                    status: 'New2',
                },
                {
                    pause: 0,
                    id: 30,
                    status: 'New3',
                },
                {
                    pause: 1,
                    id: 27,
                    status: 'New4',
                },
                {
                    pause: 1,
                    id: 26,
                    status: 'New5',
                }
            ]
        }
    },
    methods: {
        openall(){
        	setall(this.finaldata,this.data1,0);
        },
        closeall(){
        	setall(this.finaldata,this.data1,1);
        },
        onselect(a,b){
        	this.finaldata = a;
        	for(let i=0;i<this.data1.length;i++){
        		if(this.data1[i].id==b.id){
        			this.data1[i]._checked = true;
        		}
        	}
        },
        selcanc(a,b){
        	this.finaldata = a;
        	for(let i=0;i<this.data1.length;i++){
        		if(this.data1[i].id==b.id){
        			this.data1[i]._checked = false;
        		}
        	}
        },
        selall(data){
        	this.finaldata = this.data1;
        	for(let i=0;i<this.data1.length;i++){
        		this.data1[i]._checked = true;
        	}
        }
    }
	}
</script>