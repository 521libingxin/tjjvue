<template>
    <div>
    	<Button v-on:click="openall(0)">全部开启</Button>
    	<Button v-on:click="openall(1)">全部关闭</Button>
        <Table border @on-selection-change="selchange" @on-select-all="selall"@on-select="onselect" @on-select-cancel="selcanc" ref="selection" :columns="columns4" :data="data1"></Table>
        <div style="margin: 10px;overflow: hidden">
	        <div style="float: right;">
	            <Page :total="100" :page-size="20" :current="current" @on-change="pagechange"></Page>
	        </div>
	    </div>
        <Button type="primary" v-on:click="sfsdfs">获取已选项</Button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            	current:1,
            	pagechange:(a)=>{
            		this.current = a;
            		console.log(this.current)
            		this.data1 = this.data2;
            		this.finaldata = [];
            	},
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
                ],
                data2: [
                    {
                        pause: 1,
                        id: 18,
                        status: '东方闪电1',
                    },
                    {
                        pause: 0,
                        id: 24,
                        status: '东方闪电2',
                    },
                    {
                        pause: 0,
                        id: 30,
                        status: '东方闪电3',
                    },
                    {
                        pause: 1,
                        id: 27,
                        status: '东方闪电4',
                    },
                    {
                        pause: 1,
                        id: 26,
                        status: '东方闪电5',
                    }
                ]
            }
        },
        methods: {
            selchange(index){
            	this.finaldata = index;
            	if(this.finaldata.length>0){
            		for(let i=0;i<this.data1.length;i++){
            			var has = false;
	            		for(let j=0;j<this.finaldata.length;j++){
	            			if(this.data1[i].id==this.finaldata[j].id){
	            				has = true;
	            				this.data1[i]._checked = true;
	            			}
	            		}
	            		if(!has){
	            			this.data1[i]._checked = false;
	            		}
	            	}
            	}
            },
            openall(a){
            	if(this.finaldata.length>0){
            		for(let i=0;i<this.data1.length;i++){
	            		for(let j=0;j<this.finaldata.length;j++){
	            			if(this.data1[i].id==this.finaldata[j].id){
	            				this.data1[i].pause = a;
	            			}
	            		}
	            	}
            	}
            },
            onselect(a,b){},
            selcanc(a,b){},
            selall(data){}
        }
    }
</script>