<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  border: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  /* margin-top: 0px;
  margin-bottom: 0px; */
  margin: 0%
}
#app {
  font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

body {
  font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont,
    'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: none;
  background-color: #f5f5f5;
}

a,
a:active,
a:focus,
a:hover,
a:visited {
  text-decoration: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  color: #000000;
}

a,
img {
  -webkit-touch-callout: none;
}

ol,
ul {
  list-style: none;
}

input[type='button'],
input[type='submit'],
input[type='search'],
input[type='reset'] {
  -webkit-appearance: none;
}

textarea {
  -webkit-appearance: none;
}

.empty-data-msg {
  text-align: center;
  height: 100%;
  padding: 100% 0;
}
</style>
