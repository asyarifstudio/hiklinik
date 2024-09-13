<script lang="ts">
  import { useConvexClient, useQuery } from "convex-svelte";
  import { api } from "../../../../convex/_generated/api";
  import type {
    TableHeader,
    TableProps,
  } from "$lib/components/table/TableProps";
  import Table from "$lib/components/table/Table.svelte";
  import BasicWrapper from "$lib/components/wrapper/BasicWrapper.svelte";
  import CreateAccountDialog from "$lib/components/dialog/CreateAccountDialog.svelte";
  import type { Doc } from "../../../../convex/_generated/dataModel";
  import { FilePlus, Pencil } from "lucide-svelte";
  import AddAccountRecordDialog from "$lib/components/dialog/AddAccountRecordDialog.svelte";
  import moment from "moment";
  interface TableHeaderForAccount extends TableHeader {
    year: number;
    month: number;
  }

  var addDialog: any;
  var addRecordDialog:any;

  const query = useQuery(api.functions.accounts.getAccountsAndRecords, {});
  const client = useConvexClient();
  var tableHeaders:TableHeader[] = $state([])
  var tableProp: TableProps = {
      title: "Header",
      actions: [
            {
                icon:Pencil,
                tooltip:"Edit",
                callback:async (item:Doc<"accounts">)=>{
                    addDialog.show(
                        async (name: string, currency: Doc<"accounts">["currency"]) => {
                            await client.mutation(api.functions.accounts.updateAccount,{id:item._id,name,currency});
                        },
                        item
                    );
                },
                
            },
            {
                icon:FilePlus,
                tooltip:"Tambah Record",
                callback:async(item:Doc<"accounts">)=>{
                    addRecordDialog.show(
                        async (records:{
                                    month:number,
                                    year:number,
                                    amount:number
                                }[]) =>{
                                    await client.mutation(api.functions.account_records.addRecords,{accountId:item._id,records})
                                   
                                },
                        item
                    )
                }
            }
        ],
        add: async () => {
          addDialog.show(
            async (name: string, currency: Doc<"accounts">["currency"]) => {
                await client.mutation(api.functions.accounts.addAccount,{name,currency});
            }
          );
      },
  };

  $effect(() => {
    if (!query.isLoading && query.error === undefined) {
      const data = query.data;
      var columns: TableHeaderForAccount[] = [];

      for (let acc of data) {
        for (let record of acc.records) {
            const date = moment();
            date.month(record.month)
            date.year(record.year)
            const key = date.format("YYYY-MM-DD")
            const index = columns.findIndex((val) => val.key == key);
            if (index == -1) {
            columns.push({
              key ,
              text: date.format("MMM YYYY"),
              year: record.year,
              month: record.year,
              render: (item: Doc<"accounts"> & {records:Doc<"account_records">[]}) => {
                const r = item.records.find((val: Doc<"account_records">) => {
                  return val.year == record.year && val.month == record.month;
                });
                if (r) {
                  return r.amount.toLocaleString();
                } else {
                  return "";
                }
              },
            });
          }
        }
      }
      columns = columns.sort((a, b) => {
        return a.key > b.key ? -1 : 1;
      });


      tableHeaders = [
          {
            key: "name",
            text: "Nama",
          },
          {
            key: "currency",
            text: "Mata Uang",
          },
          ...columns,
        ]

     
    }
  });

  $inspect(tableProp);
</script>

<BasicWrapper>
  {#if query.isLoading || tableProp === undefined}
    <div class="loading loading-spinner"></div>
  {:else if query.error}
    <div>failed to load {query.error.toString()}</div>
  {:else}
    <Table props={tableProp} bind:headers={tableHeaders} bind:source={query.data}></Table>
  {/if} 
</BasicWrapper>

<CreateAccountDialog bind:this={addDialog}></CreateAccountDialog>
<AddAccountRecordDialog bind:this={addRecordDialog}></AddAccountRecordDialog>