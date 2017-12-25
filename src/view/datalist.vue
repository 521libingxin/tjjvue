<template>
    <div>
    <i-switch v-model="showCheckbox" style="margin-right: 5px"></i-switch>
    <Table :border="showBorder" @on-selection-change="abc" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''" :size="tableSize" :data="tableData3" :columns="tableColumns3"></Table>
    </div>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {
      username: '沈阳礼品回收',
      tableData3: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                showBorder: false,
                showStripe: false,
                showHeader: true,
                showIndex: true,
                showCheckbox: false,
                fixedHeader: false,
                tableSize: 'default'
    }
  },
    computed: {
        tableColumns3 () {
            let columns = [];
            if (this.showCheckbox) {
                columns.push({
                    type: 'selection',
                    width: 60,
                    align: 'center'
                })
            }
            if (this.showIndex) {
                columns.push({
                    type: 'index',
                    width: 60,
                    align: 'center'
                })
            }
            columns.push({
                title: 'Date',
                key: 'date',
                sortable: true
            });
            columns.push({
                title: 'Name',
                key: 'name',
                sortable: true
            });
            columns.push({
                title: 'Age',
                key: 'age',
                sortable: true,
                filters: [
                    {
                        label: 'Greater than 25',
                        value: 1
                    },
                    {
                        label: 'Less than 25',
                        value: 2
                    }
                ],
                filterMultiple: false,
                filterMethod (value, row) {
                    if (value === 1) {
                        return row.age > 25;
                    } else if (value === 2) {
                        return row.age < 25;
                    }
                }
            });
            columns.push({
                title: 'Address',
                key: 'address',
                filters: [
                    {
                        label: 'New York',
                        value: 'New York'
                    },
                    {
                        label: 'London',
                        value: 'London'
                    },
                    {
                        label: 'Sydney',
                        value: 'Sydney'
                    }
                ],
                filterMethod (value, row) {
                    return row.address.indexOf(value) > -1;
                }
            });
            return columns;
        }
    },
    methods: {
      abc (a) {
        console.log(a);
      }
    }
}
</script>
