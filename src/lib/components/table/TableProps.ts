import type { SvelteComponent } from "svelte";

export interface TableHeader {
    key:string;
    text:string;
    render?:(item:any,itemIndex:number, headerIndex:number)=>string,
    searchable?:boolean
    customSort?:(a:any,b:any)=>boolean
}

export interface TableHeaderExtended extends TableHeader {
    ascending:boolean,
    sort:()=>void
}

export interface TableAction {
    callback:(item:any)=>Promise<void>
    icon:any,
    iconColor?:string
    tooltip:string,
    render?:(item:any)=>boolean
}

export interface TableLabel {
    text:string,
    renderText?:(item:any)=>string
    render:(item:any)=>boolean
    labelClass?:string
}

export interface TableProps {
    add?:()=>Promise<void>
    actions?:TableAction[]
    
    title:string;
    disableIndex?:boolean,
    labels?:TableLabel[]
}

export interface TableInput {
    props:TableProps,
    source:Promise<any[]> | any[],
    headers:TableHeader[]
}