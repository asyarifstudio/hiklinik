<script lang="ts">
    import { Mail,KeyRound, Eye, EyeOff} from 'lucide-svelte'
  import { goto } from '$app/navigation';
  import { client } from '$lib/client/client.svelte';
    let errorMessage = $state("")
    let showPassword = $state(false)
    let authenticated = client.auth.getAuth();
    
    $effect(()=>{
        if(authenticated.state === 'AUTHENTICATED'){
            goto("/")
        }
    })


    async function handleGoogleLogin (){
        errorMessage = ""
        
        await client.auth.loginWithGoogle();
       
    }

    async function handleEmailLogin(event:SubmitEvent) {
        event.preventDefault();
        errorMessage = ""
        const formElement = event.target as HTMLFormElement
        const data = new FormData(formElement)
        const email = data.get("email")!.toString()
        const password = data.get("password")!.toString();
        
        ///await signIn(email,password);
        formElement.reset();
    }
</script>
<section class="h-full flex flex-col justify-center">
    <div class="p-5 shadow rounded-lg md:min-w-80 relative">
        <div>
            <div class="text-center">SIGN IN TO YOUR ACCOUNT</div>
           
            <div class="mt-5 flex flex-col gap-1">
                <form onsubmit={handleEmailLogin} class="flex flex-col gap-1">
                    <label class="input input-bordered flex items-center gap-2">
                        <Mail class="text-slate-500"></Mail>
                        <input type="text" class="grow"  name="email" placeholder="Email" />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        <KeyRound class="text-slate-500"></KeyRound>
                        <input type={showPassword?'text':'password'} class="grow"  name="password" placeholder="Password" autocomplete="on"/>
                        <button onclick={(e)=>{
                            e.preventDefault();
                            showPassword = !showPassword;
                        }}>
                            {#if showPassword}
                            <EyeOff></EyeOff>
                            {:else}
                            <Eye></Eye>
                            {/if}
                           
                        </button>
                       
                    </label>
                        <button type="submit" class="btn btn-primary" >Sign In</button>
                    </form>
                    <div class="text-xs text-center underline text-gray-600">
                        <a href="/login/forget">forget your password?</a>
                    </div>
                </div>
           
           
            <div class="divider text-xs">or sign in using</div>
            <div class="flex gap-2 ">
                <button class="btn btn-ghost shadow flex-1" onclick={()=>handleGoogleLogin()}>
                    <img alt="Google" src="/icons/google.png" width="24">
                </button>
               
            </div>
            <div class:hidden={errorMessage == ""} class="text-center mt-5 text-xs text-error">
                {errorMessage}
            </div>
        </div>
        
        <div class="absolute bg-gray-300 w-full h-full top-0 left-0 opacity-80 flex justify-center items-center rounded-lg" class:hidden={authenticated.state != 'LOADING'}>
            <div class="loading loading-spinner text-primary"></div>
        </div>
    </div>
   
</section>