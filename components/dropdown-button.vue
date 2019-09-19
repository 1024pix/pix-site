<template>
  <div class="btn-group">
    <li
      v-if="selectedOption.name !== undefined"
      class="dropdown-toggle"
      @click="toggleMenu()"
    >
      {{ selectedOption.name }}
      <span class="caret"></span>
    </li>

    <li
      v-if="selectedOption.name === undefined"
      class="dropdown-toggle"
      @click="toggleMenu()"
    >
      {{ placeholderText }}
      <span class="caret"></span>
    </li>
    <ul v-if="showMenu" class="dropdown-menu">
      <li v-for="option in options" :key="option.key">
        <a href="javascript:void(0)" @click="updateOption(option)">
          {{ option.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DropdownButton',
  props: {
    options: {
      type: [Array, Object],
      default: null
    },
    selected: {
      type: Object,
      default: null
    },
    placeholder: {
      type: [String],
      default: null
    }
  },
  data() {
    return {
      selectedOption: {
        name: ''
      },
      showMenu: false,
      placeholderText: 'Please select an item'
    }
  },

  mounted() {
    this.selectedOption = this.selected
    if (this.placeholder) {
      this.placeholderText = this.placeholder
    }
  },

  methods: {
    updateOption(option) {
      this.selectedOption = option
      this.showMenu = false
      this.$emit('updateOption', this.selectedOption)
    },

    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style scoped>
.btn-group {
  min-width: 160px;
  height: 30px;
  position: relative;
  margin: 0;
  display: inline-block;
  vertical-align: middle;
}
.btn-group a:hover {
  text-decoration: none;
}

.dropdown-toggle {
  color: #636b6f;
  min-width: 160px;
  padding: 3px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 7px;
  border: 0;
  transition: background 0s ease-out;
  float: none;
  box-shadow: none;
  border-radius: 0;
}
.dropdown-toggle:hover {
  background: #e1e1e1;
  cursor: pointer;
}

.dropdown-menu {
  position: fixed;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}

.dropdown-menu > li > a {
  padding: 0;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
}
.dropdown-menu > li > a:hover {
  background: #efefef;
  color: #409fcb;
}

.dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.caret {
  width: 0;
  position: relative;
  top: 10px;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  float: right;
}

li {
  list-style: none;
}

ul li::before {
  content: '';
  margin: 0;
}
</style>
