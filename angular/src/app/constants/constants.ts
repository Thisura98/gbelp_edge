import { DynamicSidebarItem } from "../components/ui/dynamicsidebar/dynamicsidebar.component";

export enum GAME_RESOURCE_TYPE{
    SOUND = "sound",
    IMAGE = "image"
}

/**
 * @param selected Item currently selected. Leave blank if none is selected.
 * @returns 
 */
export function getGameSidebarItems(selected: string | undefined = undefined): DynamicSidebarItem[]{
    const prefix = "assets/game/";
    let items = [
        {
            name: "Overview",
            sel: false, 
            n: prefix+"mhome.png",
            s: prefix+"mhome_sel.png",
            path: '/game/edit'
        },
        {
            name: "Resources", 
            sel: false, 
            n: prefix+"mresources.png", 
            s: prefix+"mresources_sel.png", 
            path: '/game/edit/resources'
        },
        {
            name: "Levels",    
            sel: false, 
            n: prefix+"mlevels.png",    
            s: prefix+"mlevels_sel.png",    
            path: '/game/edit/levels'
        },
        {   
            name: "Editor",    
            sel: false, 
            n: prefix+"meditor.png",    
            s: prefix+"meditor_sel.png",    
            path: '/game/edit/editor'
        },
    ]

    items.forEach((v,_,__) => {
        if (v.name == selected)
            v.sel = true
    })

    return items;
}