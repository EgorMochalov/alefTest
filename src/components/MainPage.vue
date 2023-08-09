<template>
  <div class="container">
    <div class="content">
      <h3 class="error" v-if="err">Заполните все поля</h3>
      <h3 class="title">Персональные данные</h3>
      <div class="input-field mb-10">
        <input v-model="data.name" class="input-text" name="name" type="text" />
        <span>Имя</span>
      </div>
      <div class="input-field ">
        <input v-model="data.age"
          v-on:keydown="(evt) => { ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault(); }" class="input-text"
          name="age" type="number" />
        <span>Возраст</span>
      </div>
    </div>
    <div class="content">
      <div class="child-head">
        <h3 class="title">Дети (макс. 5)</h3>
        <button class="button-add" v-on:click="addChild" v-if="flag">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.13332 10.8556C4.50125 10.8555 3.98887 11.3679 3.98887 12C3.98887 12.6321 4.50126 13.1445 5.13332 13.1445L10.8554 13.1445L10.8554 18.8668C10.8554 19.4989 11.3678 20.0113 11.9999 20.0113C12.632 20.0113 13.1444 19.4989 13.1444 18.8668L13.1443 13.1445L18.8667 13.1445C19.4988 13.1445 20.0112 12.6321 20.0112 12C20.0112 11.3679 19.4988 10.8556 18.8667 10.8556L13.1443 10.8556L13.1443 5.13338C13.1443 4.50132 12.632 3.98893 11.9999 3.98893C11.3678 3.98893 10.8554 4.50131 10.8554 5.13338L10.8554 10.8556L5.13332 10.8556Z"
              fill="#01A7FD" />
          </svg>
          <span>Добавить ребенка</span>
        </button>
      </div>
      <ul class="child-list">
        <li class="child-item" v-for="child in data.child" :key="child.id">
          <div class="input-field">
            <input v-model="child.name" class="input-text" name="name" type="text" />
            <span>Имя</span>
          </div>
          <div class="input-field ">
            <input v-on:keydown="(evt) => { ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault(); }"
              v-model="child.age" class="input-text" name="age" type="number" />
            <span>Возраст</span>
          </div>
          <button class="delite-button" v-on:click="() => deliteChild(child.id)">Удалить</button>
        </li>
      </ul>
      <button class="button-save" v-on:click="saveChild">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      data: {},
      flag: true,
      err: false
    }
  },
  created() {
    this.data = Object.assign({}, this.$store.state.data)
    this.data.child = [...this.$store.state.data.child]
    if (this.data.child.length >= 4) {
      this.flag = false
    }
  },
  methods: {
    addChild() {
      if (this.data.child.length < 4) {
        if (this.data.child.length != 0) {
          this.data.child.push({ id: this.data.child[this.data.child.length - 1].id + 1, name: '', age: '' })
        }
        else {
          this.data.child.push({ id: 0, name: '', age: '' })
        }
      }
      else if (this.data.child.length == 4) {
        this.data.child.push({ id: this.data.child[this.data.child.length - 1].id + 1, name: '', age: '' })
        this.flag = false
      }
    },
    saveChild() {
      if (this.data.name == '' || this.data.age == '') {
        this.err = true
      }
      else {
        this.err = false
        this.data.child.forEach(item => {
          if (item.name == '' || item.age == '') {
            this.err = true
            return
          }
          else {
            this.err = false
          }
        });
      }
      if (!this.err) {
        this.$store.dispatch('editData', this.data)
      }

    },
    deliteChild(id) {
      this.flag = true
      this.data.child = this.data.child.filter(function (item) {
        return item.id !== id;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-text {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #F1F1F1;
  padding: 6px 16px;
  padding-top: 26px;
  color: #111;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.input-field {
  display: flex;
  position: relative;
  flex: 1;
}

.input-field span {
  position: absolute;
  left: 16px;
  top: 8px;
  color: rgba(17, 17, 17, 0.48);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.child-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.child-item {
  display: flex;
  gap: 18px;
}

.child-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
}

.child-head .title {
  margin-bottom: 0;
}

.delite-button {
  background: none;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  color: #01A7FD;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  align-self: center;
}

.button-save {
  padding: 10px 20px;
  border-radius: 100px;
  background-color: #01A7FD;
  align-self: flex-start;
  border: none;
  outline: none;
  color: #FFF;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-top: 30px;
  cursor: pointer;
}

.button-add {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border-radius: 100px;
  border: 2px solid #01A7FD;
  padding: 10px 20px;
}

.button-add span {
  color: #01A7FD;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.error {
  color: red;
  margin-top: 0;
}

.mb-10 {
  margin-bottom: 10px;
}
</style>
