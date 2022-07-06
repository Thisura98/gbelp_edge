import { DynBasicTableConfig } from "../components/ui/dyn-basic-table/dyn-basic-table.component";
import { DynamicSidebarItem } from "../components/ui/dynamicsidebar/dynamicsidebar.component";

export class ViewMode{
    static readonly UNKNOWN = '';
    static readonly GAME = 'game';
    static readonly TEMPLATE = 'template';
}

export enum NextSignInAction{
    joinGroupK = 'joingroupk'
};

export enum QueryKey{
    nextAction = 'next',
    nextActionKey = 'key'
}

/**
 * @param selected Item currently selected. Leave blank if none is selected.
 * @returns 
 */
export function getGameSidebarItems(selected: string | undefined = undefined, viewMode: string): DynamicSidebarItem[]{
    const prefix = "assets/game/";
    const modePath = viewMode == ViewMode.GAME ? '/game' : '/template'
    let items = [
        {
            name: "Overview",
            sel: false, 
            n: prefix+"mhome.png",
            s: prefix+"mhome_sel.png",
            path: `${modePath}/edit`
        },
        {
            name: "Resources", 
            sel: false, 
            n: prefix+"mresources.png", 
            s: prefix+"mresources_sel.png", 
            path: `${modePath}/edit/resources`
        },
        {
            name: "Levels",    
            sel: false, 
            n: prefix+"mlevels.png",    
            s: prefix+"mlevels_sel.png",    
            path: `${modePath}/edit/levels`
        },
        {   
            name: "Editor",    
            sel: false, 
            n: prefix+"meditor.png",    
            s: prefix+"meditor_sel.png",    
            path: `${modePath}/edit/editor`
        },
    ]

    items.forEach((v,_,__) => {
        if (v.name == selected)
            v.sel = true
    })

    return items;
}


/**
 * @param selected Item currently selected. Leave blank if none is selected.
 * @returns 
 */
 export function getGroupSidebarItems(selected: string | undefined = undefined): DynamicSidebarItem[]{
    const prefix = "assets/groups/";
    let items = [
        {
            name: "Overview",
            sel: false, 
            n: prefix+"moverview.png",
            s: prefix+"moverview_sel.png",
            path: '/groups/overview'
        },
        {
            name: "Users", 
            sel: false, 
            n: prefix+"musers.png", 
            s: prefix+"musers_sel.png", 
            path: '/groups/users'
        },
        {
            name: "Chats",    
            sel: false, 
            n: prefix+"mcomms.png",    
            s: prefix+"mcomms_sel.png",    
            path: '/groups/chats'
        },
        {   
            name: "Sessions",    
            sel: false, 
            n: prefix+"msession.png",    
            s: prefix+"msession_sel.png",    
            path: '/groups/sessions'
        },
        {   
            name: "Reports",    
            sel: false, 
            n: prefix+"mreport.png",    
            s: prefix+"mreport_sel.png",    
            path: '/groups/reports'
        },
    ]

    items.forEach((v,_,__) => {
        if (v.name == selected)
            v.sel = true
    })

    return items;
}

export const GameEditConstants = {
    objectiveTableConfig: new DynBasicTableConfig(true, [
        {name: "Objective Name", property: 'name', type:"input:text"},
        {name: "Description", property: 'description', type:"input:text"},
        {name: "Maximum Progress", property: 'max_value', type:"input:number"},
    ]),
    guidanceTrackerTableConfig: new DynBasicTableConfig(true, [
        {name: "Trigger Name", property: 'name', type:"input:text"},
        {name: "Feedback", property: 'message', type:"input:text"},
        {name: "Feedback Threshold", property: 'max_threshold', type:"input:number"},
    ]),
    
}