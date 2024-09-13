
<script lang="ts">
    let loading = $state(false);
    let errorMessage:string | undefined = $state(undefined);
    let confirmTitle:string = $state("")
    let confirmMessage:string = $state("")
    let confirmDialog:any;
    let confirmDialogCallBack: ()=>void;
    function clear(){
        errorMessage = undefined;
        confirmMessage = ""
        confirmTitle = ""
    }

    async function handleConfirmDialog(yes:boolean){
        confirmDialog.close();
        if(yes){
            confirmDialogCallBack();
        }
    }


    export async function execute(promise:Promise<unknown>):Promise<unknown>{
        clear();
        loading = true;
        try{
            const result = await promise;
            loading = false;
            return result;
        }
        catch(e:any){
            loading = false;
            errorMessage = e;
        }

    }

    export function startLoading(){
        loading = true;
    }

    export function endLoading(error?:any){
        errorMessage = error;
        loading = false;
    }

    export async function confirm(title:string,message:string, callback:()=>void){
        clear();
        confirmMessage = message;
        confirmTitle = title;
        confirmDialogCallBack = callback;
        confirmDialog.showModal();
    }
</script>

{#if errorMessage}
<div class="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-50 bg-slate-500 bg-opacity-70">
    <div class="bg-white p-5 rounded shadow text-center lg:w-6/12 w-11/12">
        <div class="text-xl text-center text-error">Terjadi Kesalahan</div>
        <div class="text-center mt-5">{errorMessage}</div>
        <button class="btn mt-5" onclick={()=>errorMessage = undefined}>Kembali</button>
    </div>
 
</div>
{/if}
<div class="wrapper relative">
    <div class="absolute bg-gray-300 w-full h-full top-0 left-0 opacity-80 flex justify-center items-center rounded-lg" class:hidden={!loading}>
        {#if loading}
        <div class="loading loading-spinner text-primary"></div>
        {/if}
        
    </div>
    <slot></slot>
</div>
<dialog  class="modal" bind:this={confirmDialog}>
    <div class="modal-box">
      <h3 class="font-bold text-lg">{confirmTitle}</h3>
      <p class="py-4">{confirmMessage}</p>
      <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-warning" onclick={()=>handleConfirmDialog(true)}>Ya</button>
          <button class="btn" onclick={()=>handleConfirmDialog(false)}>Tidak</button>
      </div>
    </div>
  </dialog>