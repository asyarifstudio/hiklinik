import type { ServerQuery } from "$lib/server/db-server-interface";

export const SearchParamsUtils = {

    transform:(searchParams:URLSearchParams):ServerQuery[]=>{
        var queries:ServerQuery[] = [];
        var query:ServerQuery;

        searchParams.forEach((value,field)=>{
            if(field.includes("field")){
                query = {
                    field:value,
                    operator:'==',
                    value:""
                }
            }
            else if(field.includes("operator")){
                query.operator = value as any
            }
            else if(field.includes("value")){
                query.value = value;
                if(query.field.includes("_date")){
                    query.value = new Date(value);
                }
                queries.push(query)
            }
        })
        return queries;
    }
}