<script>
    import { goto } from "$app/navigation";
    import { navigating } from "$app/stores";
  import { client } from "$lib/client/client.svelte";
  import { getAuthenticated } from "$lib/provider/firebase/auth.firebase.svelte";
    import { Bell, Home,  Mail, Menu, Presentation, UserRoundCheck, UserRoundPlus, Users } from "lucide-svelte";
    import Building_2 from "lucide-svelte/icons/building-2";
    let {children} = $props();
    let authenticated = client.auth.getAuth();

    $effect(()=>{
      if(authenticated.state == 'UNAUTHENTICATED'){
        goto("/")
      }
    });

  </script>
  <style>
    @keyframes gradient {
      0% { border-image: linear-gradient(to right,oklch(var(--nc)), oklch(var(--p)) 0%,oklch(var(--nc)) ) 30;}
      25% { border-image: linear-gradient(to right,oklch(var(--nc)), oklch(var(--p)) 25%,oklch(var(--nc)) ) 30;}
      50% {border-image: linear-gradient(to right,oklch(var(--nc)),oklch(var(--p)) 50%,oklch(var(--nc)) ) 30;}
      75% {border-image: linear-gradient(to right,oklch(var(--nc)), oklch(var(--p)) 75%,oklch(var(--nc)) ) 30;}
      100% {border-image: linear-gradient(to right,oklch(var(--nc)), oklch(var(--p)) 100%,oklch(var(--nc)) ) 30 }
    }
    .loading-border {
        @apply border-b-2;
        border-image: linear-gradient(to right,oklch(var(--nc)), oklch(var(--p)) 0%,oklch(var(--nc)) ) 30;
        border-style: solid;
        animation: gradient 1s ease infinite;
        animation-direction: alternate;
  
    }
  </style>
  <div class="drawer lg:drawer-open bg-base-200 min-h-screen lg:min-h-fit">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
      <div class="navbar bg-white " class:loading-border={$navigating} >
          <div class="navbar-start">
             <!-- Page content here -->
              <label for="my-drawer" class="btn btn-ghost drawer-button lg:hidden">
                <Menu></Menu>
              </label>
          </div>
          <div class="navbar-end gap-2">
              
              <button class="btn btn-ghost btn-square btn-sm"><Bell></Bell></button>
              <button class="btn btn-ghost btn-square btn-sm"><Mail></Mail> </button>
              <a class="btn btn-ghost  btn-sm btn-outline " href="/admin/profile"></a>
          </div>
      </div>
     
      <div class="m-2">
          {#if !$navigating}
          {@render children()}
          {/if}
          
      </div>
        
      </div> 
      <div class="drawer-side">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="flex flex-col p-4 w-80 min-h-full bg-white text-base-content">
          <a href="/"><img  src="/img/logo.png"/></a>
          <div class="divider"></div>
          <ul class="menu flex-1">
            <!-- Sidebar content here -->
            <li><a href="/admin"><Home></Home>Beranda</a></li>
            <li><a href="/admin/pengajuan-pelaku-usaha"><UserRoundPlus></UserRoundPlus>Pengajuan Pelaku Usaha</a></li>
            <li><a href="/admin/pelaku-usaha"><Users></Users>Daftar Pelaku Usaha</a></li>
            <li><a href="/admin/konsultan"><UserRoundCheck></UserRoundCheck>Daftar Konsultan</a></li>
            <li><a href="/admin/usaha"><Building_2></Building_2>Usaha</a></li>
            <li><a href="/admin/kegiatan"><Presentation></Presentation>Kegiatan</a></li>
          </ul>
          <div class="text-center text-sm text-slate-500">
            <a href="https://wa.me/62081378796084" target="_blank">Powered by @asyarif.studio</a> | versi {client.version}
          </div>
        </div>
        
        
      </div>
    </div>