<template>
    <label :for="id">{{ label }}</label>
    <input :id="id" type="text" class="form-control" :value='value' :readonly="readonly" />
</template>
<script>

export default {
    props: ['label', 'id', 'value', 'readonly']
}
</script>
