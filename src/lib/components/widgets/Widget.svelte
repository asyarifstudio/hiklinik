<script lang="ts">
  import { RefreshCcw } from "lucide-svelte";
  import { onMount } from "svelte";

  interface WidgetInterface {
    title:string,
    body:any,
    promise:()=>Promise<any>
  }

    let {title,body, promise } : WidgetInterface= $props()
    let data:any | undefined = $state(undefined)
    async function get() {
        data = undefined;
        data = await promise();
    }

    onMount(()=>{
        get();
    })
</script>
{#if !data}
<div class="skeleton rounded w-full h-12"></div>
{:else}
<div class="rounded bg-white p-3 flex flex-col">
    <div class="flex justify-between">
        <div class="font-semibold">{title}</div>
        <button class="btn btn-square btn-sm btn-ghost" onclick={get}><RefreshCcw size=16></RefreshCcw> </button>
    </div>
    <div class="flex-1">
        {@render body(data)}
    </div>
</div>

{/if}