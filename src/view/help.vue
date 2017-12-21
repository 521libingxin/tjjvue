<template>
    <div>
        <Table border @on-selection-change="selchange" ref="selection" :columns="columns4" :data="data1"></Table>
       <!-- <Button @click="handleSelectAll(true)">Set all selected</Button>-->
        <Button v-on:click="sfsdfs">Cancel all selected</Button>
        {{sfsdfs}}
    </div>
</template>
<script>
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
                        width: 100,
                        align: 'center',
                        title:'全选'
                    },
                    {
                        title: '开关',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                      //true-value:params.row.select
                                      value:params.row.name,
                                      'true-value':0,
                                      'false-value':1
                                    },
                                    on:{
	                                    'on-change':(changeval) => {
	                                        console.log(changeval);
	                                    }
	                                }
                                })
                            ]);
                        }
                    },
                    {
                        title: 'ID',
                        key: 'age'
                    },
                    {
                        title: '计划状态',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 0,
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                    },
                    {
                        name: 1,
                        age: 24,
                        address: 'London No. 1 Lake Park',
                    },
                    {
                        name: 0,
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                    },
                    {
                        name: 1,
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        name: 1,
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                    }
                ]
            }
        },
        methods: {
            selchange(index){
            	console.log(index)
            	this.finaldata = index;
            },
            haha(){
            	console.log('haha');
            }
        }
    }
</script>