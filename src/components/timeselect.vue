<template>
<div>
<Button @click="changetime()">修改时间</Button>
    <Modal v-model="timemodal" width="750" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>Delete confirmation</span>
      </p>
      <div  style="text-align:center;height:400px;overflow:auto;">
            <div class="listbox">
                <span class="leftsize timeselect_span"></span>
                <span class="topsize timeselect_span" v-for="(time,index) in times">
                    <Checkbox @on-change="changecheckboxtop(time.child == 0,index)" style="margin:auto;" :value="time.child == 0"></Checkbox>
                </span>
            </div>
            <div class="listbox" v-for="(day,index) in daylist">
                <span class="leftsize timeselect_span">
                    <Checkbox @on-change="changecheckboxleft(day.child == 0,(index+1))" style="float:left;margin:0;" :value="day.child == 0"></Checkbox>
                    <span style="float:right;">{{day.name}}</span>
                </span>
                <template v-for="(time,index2) in times" >
                    <span v-on:click="changespan((index+1)+'-'+index2,false)" v-if="time_str.indexOf(','+(index+1)+'-'+index2+',') > -1" class="timeselect_span"></span>
                    <span v-on:click="changespan((index+1)+'-'+index2,true)" v-if="time_str.indexOf(','+(index+1)+'-'+index2+',') == -1" class="timeselect_span timeselect_span_check"></span>
                </template>
            </div>
            <div class="listbox">
                <span class="leftsizebottom timeselect_span"></span>
                <span class="topsize timeselect_span">0</span><span class="topsize timeselect_span" v-for="time in 24">
                    {{time}}
                </span>
            </div>
      </div>
      <div slot="footer">
            <Button @click="subpoint()">提交</Button>
      </div>
    </Modal>
</div>
</template>

<script>
export default {
  name: 'timeselect',
  props: ['timelist'],
  data () {
    return {
        timemodal:false,
        value: '',
        single:true,
        times: [],
        daylist:[],
        subobj:{},
        time_str:',',
        days:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
    }
  },
  watch:{
    timelist (val,oldVal) {
        if(val != oldVal){
            this.start();
        }
    }
  },
  mounted () {
  },
  methods: {
      start(){
        this.times = [];
        this.daylist = [];
        this.subobj = {};
        this.time_str = ',';
        for(let i = 0;i < 24;i++){
            let obj = {
                id:"x_"+i,
                child:0
            }
            this.times.push(obj);
        }
        for(let i = 0;i < this.days.length;i++){
            let obj = {
                id:"y_"+i+1,
                name:this.days[i],
                child:0
            }
            this.daylist.push(obj);
        }
        let timelist = this.timelist;
        for(let i in timelist){
            let day = parseInt(timelist[i].weekDay);
            let start = parseInt(timelist[i].startHour);
            let end = parseInt(timelist[i].endHour);
            for(let j = 0; j < end-start;j++){
                let timestr = day+"-"+(start+j);
                this.addpoint(timestr);
            }
        }
      },
      changetime(){
        this.timemodal = true;
        this.start();
      },
      changespan(str,check){
        if(check){
            this.addpoint(str);
        }else{
            this.removepoint(str);
        }
      },
      addpoint(str){
          if(this.time_str.indexOf(","+str+",") == -1 ){
            let dayindex = parseInt(str.split("-")[0]);
            let timeindex = parseInt(str.split("-")[1]);
            this.daylist[dayindex-1].child++;
            this.times[timeindex].child++;
            this.time_str += str+",";
            if(!this.subobj[dayindex]){
                this.subobj[dayindex] = {};
            }
            this.subobj[dayindex][timeindex] = {
                isremove:'',
                endid:timeindex+1
            };
          }
      },
      removepoint(str){
         if(this.time_str.indexOf(","+str+",") > -1 ){
            let dayindex = parseInt(str.split("-")[0]);
            let timeindex = parseInt(str.split("-")[1]);
            this.daylist[dayindex-1].child--;
            this.times[timeindex].child--;
            this.time_str = this.time_str.replace(","+str+",",",");
            if(this.subobj[dayindex][timeindex]){
                delete this.subobj[dayindex][timeindex];
            }
         }
      },
      changecheckboxtop(type,index){
          for(let i = 1;i < 8;i++){
              if(type){
                this.addpoint(i+"-"+index);
              }else{
                this.removepoint(i+"-"+index);
              }
          }
      },
      changecheckboxleft(type,index){
          for(let i = 0;i < 24;i++){
              if(type){
                this.addpoint(index+"-"+i);
              }else{
                this.removepoint(index+"-"+i);
              }
          }
      },
      subpoint(){
        this.timemodal = false;
        console.log(this.subobj);
        //let timearray = this.time_str.split(",");//根据逗号分隔的数组
        let submitobj = JSON.parse(JSON.stringify(this.subobj)); //整理后的对象
        let timesubmit = []; //最终提交的对象
        let isstart = 0;//记录每次开始位置
        for(let i in submitobj){
            let thischild = submitobj[i];
            for(let j in thischild){
                let isremove = 'no';
                if(thischild[j-1]){
                    thischild[isstart].endid = parseInt(j)+1;
                }else{
                    isstart = j;
                    thischild[j].isremove = 'no';
                }
            }
        }
        for(let i in submitobj){
            for(let j in submitobj[i]){
                if(submitobj[i][j].isremove == 'no'){
                    timesubmit.push({
                        "weekDay": i,
                        "startHour": j,
                        "endHour": submitobj[i][j].endid
                    });
                }
            }
        }
        console.log(timesubmit);
        this.$emit('timeselected',timesubmit);
        //this.timelist = timesubmit;
      }
  }
}
</script>
<style >
  .timeselect_span{
      display:block;
      float:left;
      width:20px;
      height:20px;
      line-height:20px;
      text-align:center;
      background:#eee;
      margin:0 6px 6px 0;
      cursor:pointer;
      font-size:14px;
  }
  .timeselect{
      width:830px;
  }
  .listbox{
      height:30px;
  }
  .timeselect_span_check{
      background:#bbb;
  }
  .leftsize{
      width:70px;
      background:none;
  }
  .topsize{
      background:none;
  }
  .leftsizebottom{
      width:57px;
      background:none;
  }
</style>