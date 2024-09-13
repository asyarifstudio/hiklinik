<script lang="ts">
     import { ArrowDown, ArrowUp, Search, Trash } from "lucide-svelte";
      import type { TableHeader, TableHeaderExtended, TableInput, TableProps } from "./TableProps";
  import { onMount } from "svelte";
  
      let {
        props,
        source = $bindable(),
        headers = $bindable()
      } : TableInput = $props();

      var extendedHeaders:TableHeaderExtended[] = $state([]);
      var activeSortKey:string = $state("")
      var loading:boolean = $state(true);
      var items:any[] = $state([]);
      var filteredItem:any[] = $state([]);

      var searchableHeaders:TableHeader[] = $derived.by(()=>{
        return extendedHeaders.filter((val)=>val.searchable == true);
      })
      var searchQuery:string = $state("");


      $effect(()=>{
        if(searchQuery != ""){
            var lowerSearchQuery = searchQuery.toLowerCase();
            filteredItem = items.filter((item,index)=>{
                for(let header of searchableHeaders){
                    var val = item[header.key];
                    if(header.render){
                        val = header.render(item,index,0);
                    }

                    try{
                        var stringVal = val.toString().toLowerCase();
                        var found = stringVal.includes(lowerSearchQuery);
                        if(found){
                            return true;
                        }
                    }  
                    catch(e){
                       //just ignore this.
                    }
                    
                    
                }

            })
        }
        else{
            filteredItem = items;
        }
      })

      $effect(()=>{
        if(!(source instanceof Promise)){
            items = source;
            filteredItem = source;
        }
      })

      $effect(()=>{
        extendedHeaders = headers.map((val)=>{
            return {
                ...val,
                ascending:false,
                sort:function (){
                    if(activeSortKey == this.key){
                        this.ascending = !this.ascending
                    }
                    activeSortKey = this.key;
                    filteredItem = filteredItem.sort((a,b)=>{
                        var result:boolean;

                        if(val.customSort){
                            result = val.customSort(a[this.key],b[this.key]);
                        }
                        else{
                            if(a[this.key] === undefined && b[this.key] === undefined){
                                return 1;
                            }
                            if(a[this.key] === undefined){
                                result = false;
                            }
                            else if(b[this.key] === undefined){
                                result = true;
                            }
                            else{
                                result= a[this.key]<b[this.key];
                            }
                        }
                       
                       
                        return result!==this.ascending ?1:-1;
                    })
                }
            }
        })        

        if(source instanceof Promise){
            source.then((data)=>{
                items = data;
                filteredItem = items;
                loading = false;
            })
        }
        else{
            items = source;
            filteredItem = items;
            loading = false;
        }
      })
      
    
  </script>
  <div class="table-wrapper ">
      <div class="flex px-3 pt-2">
          <div class="flex-1 ">
              {props.title}
          </div>
          <div class="flex gap-2" >
            {#if searchableHeaders.length>0}
            <label class="input input-bordered flex items-center gap-2 input-sm">
                <input type="text" class="grow" placeholder="Cari" bind:value={searchQuery} />
                <Search size=12></Search>
            </label>
            {/if}
            {#if props.add}
            <button class="btn btn-sm btn-outline" onclick={props.add}>Tambah</button>
            {/if}
             
          </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table" >
            <thead>
                <tr>
                    {#if !props.disableIndex}
                    <th>No</th>
                    {/if}
                    {#each extendedHeaders as h}
                    <th> 
                        <div class="flex items-center gap-2 ">
                            <div>{h.text}</div>
                            <button class="text-slate-200 hover:text-black" class:text-black={h.key == activeSortKey} onclick={()=>h.sort()} >
                                {#if h.ascending}
                                <ArrowDown size=12></ArrowDown> 
                                {:else}
                                <ArrowUp size=12></ArrowUp> 
                                {/if}
                                
                            </button>
                        </div>
                    </th>
                    {/each}
                    {#if props.labels}
                    <th>Label</th>
                    {/if}
                    {#if props.actions  && props.actions.length>0}
                    <th>Pilihan</th>
                    {/if}
                    
                </tr>
            </thead>
            <tbody>
                {#if loading}
                <tr>
                    <td colspan={extendedHeaders.length}>
                        <div class="loading loading-spinner "></div>
                    </td>
                </tr>   
                {:else} 
                {#each filteredItem as item,itemIndex}
                <tr>
                    {#if !props.disableIndex}
                    <td>{itemIndex+1}</td>
                    {/if}
                    {#each extendedHeaders as header,headerIndex}
                    {#if !header.render}
                    <td>{item[header.key]}</td>
                    {:else}
                    <td>{header.render(item,itemIndex,headerIndex)}</td>
                    {/if}
                    {/each}
                    {#if props.labels}
                    <td>
                      <div class="flex gap-1">
                          {#each props.labels as label}
                          {#if label.render(item)}
                          <div class={"badge whitespace-nowrap "+label.labelClass || ""}>
                              {#if label.renderText}
                              {label.renderText(item)}
                              {:else}
                              {label.text}
                              {/if}
                          </div>
                          {/if}
                          {/each}
                      </div>
                    </td>
                    {/if}
                    {#if props.actions && props.actions.length>0}
                    <td >
                        <div class="flex gap-1 ">
                            {#each props.actions as action}
                            {#if !action.render || action.render(item)}
                            <div class="tooltip" data-tip={action.tooltip}>
                              <button class={"btn btn-sm " + action.iconColor || ""} class:btn-square={typeof action.icon !== "string"}
                                  onclick={()=>action.callback(item)}
                              >
                              {#if typeof action.icon === "string"}
                              {action.icon}
                              {:else}
                              <svelte:component this={action.icon} size={16} color={action.iconColor || 'black'}></svelte:component>
                              {/if}
                              
                          
                          </button>
                          </div>
                            {/if}
                           
                            
                            {/each}
                        </div>
                       
                    </td>
                    {/if}
                   
                </tr>
                {/each}
                {/if}
            </tbody>
        </table>
      </div>
      
  </div>
  