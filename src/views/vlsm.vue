<template>
  <div>
    <el-row :gutter="25">
      <!-- HEADER -->
      <el-col :span="24">
        <h1>VLSM Calculator</h1>
        <p>
          In the address block you enter the address block in a CIDR notation (eg 53.65.32.0/20). <br>
          Then below enter the amount of hosts (without network and broadcast address) required.
        </p>
      </el-col>

      <!-- FORM -->
      <el-col :sm="24" :md="12">
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
      </el-col>

      <!-- DETAILS -->
      <el-col :sm="24" :md="12">
        <aside v-if="result.details" id="vlsm-details">
          <h3>Details about this address pool</h3>
          <ul>
            <li>Actual network address: {{ result.networkAddress + '/' + result.networkMask }}</li>
            <li>Total addresses required: {{ result.details.requiredSpace }} <small>(with broadcast & network addresses)</small></li>
            <li>Total addresses available: {{ result.details.maxAddresses }}</li>
            <li>Total addresses left: {{ result.details.addresesLeft }}</li>
            <li>Total percentage used: {{ result.details.percentage }}%</li>
          </ul>
        </aside>
      </el-col>
    </el-row>

    <!-- RESULT -->
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
        addressBlock: '216.16.217.0/24',
        hosts: [55,31,19],
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
      try {
        this.result = calculateVLSM(this.form.addressBlock, this.form.hosts);
      } catch (error) {
        let msg = 'Something went wrong.';

        if (typeof error === 'string') msg = error;

        this.$alert(error, 'Whoeps!', {
          confirmButtonText: 'OK',
        });
      }
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

aside#vlsm-details {
  ul {
    padding-left: 1rem;
    margin: 0;

    li {
      margin-top: .35rem;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>