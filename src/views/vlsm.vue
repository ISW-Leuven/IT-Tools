<template>
  <div>
    <h2>VLSM</h2>
    
    <el-form :label-position="'top'" :model="form">
      <el-form-item label="Address block">
        <el-input v-model="form.addressBlock" />
      </el-form-item>
      <el-form-item label="Hosts">
        <el-tag :key="tag + '-' + index" v-for="(tag, index) in form.hosts" closable :disable-transitions="false" @close="handleClose(tag)">{{ tag }}</el-tag>
        <el-input
          type="number"
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New subnet</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-button @click.prevent="calculate">Calculate</el-button>
      </el-form-item>
    </el-form>

    <section>
      <el-table :data="result.subnets" stripe style="word-break:break-word;">
        <el-table-column prop="requestedSize" label="Requested size" />
        <el-table-column label="Allocated size">
          <template slot-scope="scope">
            {{ scope.row.allocatedSize }} <small>(+2)</small>
          </template>
        </el-table-column>
        <el-table-column label="CIDR Notation">
          <template slot-scope="scope">
            {{ `${scope.row.networkAddress}/${scope.row.networkMask}` }}
          </template>
        </el-table-column>
        <el-table-column prop="subnetMask" label="Subnet mask" />
        <el-table-column label="Available range">
          <template slot-scope="scope">
            {{ `${scope.row.firstUsable} - ${scope.row.lastUsable}` }}
          </template>
        </el-table-column>
        <el-table-column prop="broadcastAddr" label="Broadcast address" />
      </el-table>
    </section>
  </div>
</template>

<script>
import calculateVLSM from '../plugins/NetworkTools/vlsm';

export default {
  name: 'network-tools-vlsm',
  data () {
    return {
      form: {
        addressBlock: '22.11.192.0/18',
        hosts: [1048,456,300,90,34,33,4,4,3,2],
      },
      result: {
        subnets: [],
      },
      inputValue: '',
      inputVisible: true,
    }
  },
  methods: {
    calculate () {
      this.result = calculateVLSM(this.form.addressBlock, this.form.hosts);
    },
    handleClose(tag) {
      this.form.hosts.splice(this.form.hosts.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;

      /*this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });*/
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.hosts.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>