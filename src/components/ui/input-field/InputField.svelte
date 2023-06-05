<script lang="ts">
  // import Textfield from "@smui/textfield";

  export let label: string;
  export let id: string;
  export let type: string;
  export let className: string;
  export let placeholder: string;
  export let required: boolean = true;
  // export let onChange: (event: Event) => void;
  export let val: string;
  function typeAction(node: any) {
    node.type = type;
  }
</script>

<!-- <div>
  <Textfield
    {id}
    {placeholder}
    {type}
    {label}
    {value}
    variant="outlined"
    required
    on:input={handleInput}
  />
</div> -->
<label for={id}>{label}</label>
<input
  class={className}
  use:typeAction
  {placeholder}
  {required}
  bind:value={val}
/>

<style>
  .form-input {
    border: 1px solid #b7efea;
    height: 1.473em;
    padding-top: 15px;
    font-size: 1em;
    padding-left: 15px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: 5px;
    margin-top: 10px !important;
    max-width: 450px;

    &::placeholder {
      font-size: 1rem;
      color: #bcbfc1;
    }
    &:focus {
      outline: none;
    }
  }
</style>
