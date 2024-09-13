<script lang="ts">
    import {PUBLIC_PROJECT_NAME} from '$env/static/public'
    import { useQuery } from 'convex-svelte';
    import { Menu } from 'lucide-svelte';
    import { api } from '../../convex/_generated/api';
    import { signout } from '$lib/provider/firebase/auth.firebase.svelte';
    import { client } from '$lib/client/client.svelte';
    var auth = client.auth.getAuth();
    
    var menus:any[] = [
        {
            title:"Pricing",
            url:"/pricing"
        }
    ]



</script>
<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        <div class="navbar shadow fixed bg-white">
            <div class="navbar-start">
                <!-- Page content here -->
                <label for="my-drawer" class="btn btn-ghost drawer-button md:hidden">
                    <Menu></Menu>
                </label>
                <a href="/" class="font-semibold uppercase">{PUBLIC_PROJECT_NAME}</a>
            </div>
            <div class="navbar-end gap-2">
                
                {#if auth.user === null}
                <a class="btn btn-ghost btn-outline" href="/login">Masuk</a>
                {:else if auth.user === undefined}
                <button class="btn btn-ghost btn-outline btn-outline" ><div class="loading loading-spinner"></div></button>
                {:else if client}
                <a class="btn btn-ghost btn-outline" href={`/${auth.user.role.toLocaleLowerCase()}`}>Dashboard</a>
                <button class="btn btn-ghost btn-outline" onclick={()=>client.auth.logout()} >
                    Keluar
                </button>
                {/if}
                
               
            </div>
        </div>
        <div class="flex flex-col items-center">
            <div class="max-w-screen-lg mx-5 mt-[64px] h-[calc(100vh-90px)]">
                <slot></slot>
            </div>
        </div>
        
        
    </div> 
    <div class="drawer-side">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <!-- Sidebar content here -->
          {#each menus as menu}
          <li><a href={menu.url}>{menu.title}</a></li>
          {/each}
          
          
        </ul>
      </div>
</div>
