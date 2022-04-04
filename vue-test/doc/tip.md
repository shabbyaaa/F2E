v-model

```js
<input v-model="searchText" />
// 等价于
<input :value="searchText" @input="searchText = $event.target.value" />

```
