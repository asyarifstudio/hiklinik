<script lang="ts">

    let pricings:any[] = [
        {
            title:"Free",
            description:"Free for getting started",
            price:"0",
            recurrence:"monthly",
            features:["Feature 1", "Feature 2", "Feature 3"]
        },
        {
            title:"Basic",
            description:"Basic feature for basic usage",
            price:"$20",
            recurrence:"monthly",
            features:["Feature 1", "Feature 2", "Feature 3","Feature 4"]
        },
        {
            title:"Premium",
            description:"full feature for professional use",
            price:"$50",
            recurrence:"monthly",
            features:["Feature 1", "Feature 2", "Feature 3","Feature 4","Feature 5"]
        },
    ]
</script>
<section class="min-h-full flex flex-col justify-center">
    <div class="text-6xl text-center">This page describe your pricing plan</div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 my-5">
        {#each pricings as pricing}
        <div class="p-5 shadow rounded">
            <div class="text-4xl font-semibold">{pricing.title}</div>
            <div class="text-xl">{pricing.price}/{pricing.recurrence}</div>
            <div class="text-sm">{pricing.description}</div>
            <ul class="list-item list-disc mx-5">
                {#each pricing.features as feature}
                <li>{feature}</li>
                {/each}
            </ul>
        </div>
        {/each}
    </div>
</section>
