import { DynamicSidebarItem } from "../components/ui/dynamicsidebar/dynamicsidebar.component";

/**
 * @param selected Item currently selected. Leave blank if none is selected.
 * @returns 
 */
export function getGameSidebarItems(selected: string | undefined = undefined): DynamicSidebarItem[]{
    let items = [
        {name: "Overview", sel: false, n: "assets/game/mhome.png", s:"assets/game/mhome_sel.png"},
        {name: "Resources", sel: false, n: "assets/game/mresources.png", s:"assets/game/mresources_sel.png"},
        {name: "Levels", sel: false, n: "assets/game/mlevels.png", s:"assets/game/mlevels_sel.png"},
        {name: "Editor", sel: false, n: "assets/game/meditor.png", s:"assets/game/meditor_sel.png"},
    ]

    items.forEach((v,_,__) => {
        if (v.name == selected)
            v.sel = true
    })

    return items;
}