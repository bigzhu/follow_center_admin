<template>
  <table class="ui celled padded table">
    <thead>
      <tr><th class="single line">用户名</th>
        <th class="single line">类型</th>
        <th class="single line">次数</th>
        <th class="single line">原因</th>
        <th class="single line">批准删除</th>
        <th class="single line">帐号存在的</th>
    </tr></thead>
    <tbody>
      <tr v-for="apply_del in apply_dels">
        <td>
          <a :href="'http://follow.center/God/'+ apply_del.god_name" target="blank">
          {{apply_del.social_name}}
        </a>
        </td>
        <td>
          <button :class=" 'ui ' + apply_del.type + ' button'">
            <i :class="apply_del.type + ' icon'"></i>
            {{apply_del.type}}
          </button>
        </td>
        <td>
          {{apply_del.count}}
        </td>
        <td>
          {{apply_del.reason}}
        </td>
        <td>
          <button @click="$store.dispatch('approveApplyDel', apply_del)" class="ui compact icon button">
            <i class="delete icon"></i>
          </button>
        </td>
        <td>
          <button @click="$store.dispatch('rejectApplyDel', apply_del.id)" class="ui compact icon button">
            <i class="hand spock icon"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: [],
    components: {
    },
    computed: {
      apply_dels () {
        return this.$store.state.apply_dels
      }
    },
    data: function () {
      return {
      }
    },
    mounted () {
      this.$store.dispatch('getApplyDel')
    },
    methods: {
      approve: function (apply_del) {
        this.approveApplyDel(apply_del, this.getApplyDel)
      }
    }
  }
</script>
