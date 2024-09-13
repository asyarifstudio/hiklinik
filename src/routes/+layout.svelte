<script lang="ts">
  import "../app.css"
  import { browser, dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex, useConvexClient, useQuery } from 'convex-svelte';
  import { initializeAuth,getAuthenticated } from "$lib/provider/firebase/auth.firebase.svelte";
  import {api} from '../convex/_generated/api'
  import { client } from "$lib/client/client.svelte";
  inject({ mode: dev ? 'development' : 'production' });
  const { children } = $props();
  
  setupConvex(PUBLIC_CONVEX_URL);
  let convexClient = useConvexClient();
  let isAuthenticated = client.auth.getAuth();
  var query = useQuery(api.functions.users.getAuthenticatedUser,{});
  if(browser){
    initializeAuth();
    isAuthenticated.setUser(undefined);
  }

  $effect(()=>{
    if(isAuthenticated.state === 'AUTHENTICATED'){
      convexClient.mutation(api.functions.users.addAuthenticatedUser,{});
    }
  })

  $effect(()=>{
    
  })

  $effect(()=>{
    console.log("============")
    console.log(isAuthenticated.state);
    console.log(query.data);
    switch(isAuthenticated.state){
      case "AUTHENTICATED":
        if(query.data){
          isAuthenticated.setUser(query.data)
        }
        break;
      case "LOADING":
        isAuthenticated.setUser(undefined);
        break;
      case "UNAUTHENTICATED":
        isAuthenticated.setUser(null);
        break;
    }
  })
    
    
</script>
{@render children()}