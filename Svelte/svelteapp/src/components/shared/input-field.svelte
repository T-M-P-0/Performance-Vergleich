<label for={id}>{label}</label>
<input id={id} type="text" class="form-control" value={value} readonly={readonly} />

<script>
   export let id;
   export let label;
   export let value;
   export let readonly;
</script>