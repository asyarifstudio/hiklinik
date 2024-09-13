<script lang="ts">
    import {page} from '$app/stores'
    
</script>
<div class="h-screen w-screen flex flex-col justify-center items-center p-5">
    <img src="/img/error.png" alt="Terjadi Kesalahan" width="200px">
    <p class="font-semibold  text-xl">{$page.status}</p>
    <h1 class="font-semibold  text-xl">Terjadi Kesalahan</h1>
    <p class="text-center">{$page.error?.message}</p>
    <a href="/" class="btn btn-sm mt-5">Beranda</a>
</div>