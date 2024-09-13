<script lang="ts">
  import { goto } from "$app/navigation";
  import { getAuthenticated } from "$lib/provider/firebase/auth.firebase.svelte";
    import { Mail } from "lucide-svelte";

    let loading = $state(false);
    let errorMessage = $state("");
    let emailSent = $state(false)
    let authenticated = getAuthenticated();

    $effect(()=>{
        if(authenticated.state === 'AUTHENTICATED'){
            goto("/")
        }
    })


    async function handlePasswordReset(event:SubmitEvent){
        loading = true;
        emailSent = false;
        const formElement = event.target as HTMLFormElement
        const data = new FormData(formElement)
        const email = data.get("email")!.toString()

        loading = false;
    }
</script>
<section class="h-full flex flex-col justify-center">
    <div class="p-5 shadow rounded-lg md:min-w-80 relative">
        <div>
            <div class="text-center">FORGET YOUR PASSWORD</div>
            {#if !emailSent}
            <div class="mt-5 flex flex-col gap-1">
                <form onsubmit={handlePasswordReset} class="flex flex-col gap-1">
                    <label class="input input-bordered flex items-center gap-2">
                        <Mail></Mail>
                        <input type="text" class="grow"  name="email" placeholder="Email" />
                    </label>
                    <button type="submit" class="btn btn-primary" >Send Password Reset</button>
                    <a class="btn" href="/login">Cancel</a>
                </form>
            </div>
            {:else}
            <div class="mt-5 flex flex-col gap-1">
                <p class="text-center text-sm">Password reset link has been sent to your email.</p>
                <p  class="text-center text-sm">Please reset your password and try login again.</p>
                
                <a href="/login" class="btn btn-sm btn-ghost mt-2">Login</a>
            </div>
            {/if}
            
           
           
           
            <div class:hidden={errorMessage == ""} class="text-center mt-5 text-xs text-error">
                {errorMessage}
            </div>
        </div>
        
        <div class="absolute bg-gray-300 w-full h-full top-0 left-0 opacity-80 flex justify-center items-center rounded-lg" class:hidden={!loading}>
            <div class="loading loading-spinner text-primary"></div>
        </div>
    </div>
   
</section>