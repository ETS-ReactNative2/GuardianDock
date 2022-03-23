// File only used for early development

type embeddedRouteProps = {
    nav: string,
    routerName: string,
    title: string
}

export type screenRouteProps = {
    key: string,
    title: string,
    routes: Array<embeddedRouteProps>
}

export const DrawerContentItems: Array<screenRouteProps> = [
    {
        key: 'home',
        title: 'Accueil',
        routes: [{nav: 'MainDrawer', routerName: 'home', title: 'Accueil'}]
    },
    {
        key: 'destiny2',
        title: 'Destiny 2',
        routes: [
            {nav: 'MainDrawer', routerName: 'PvETracker', title: 'PvE Tracker'},
            {nav: 'MainDrawer', routerName: 'PvPTracker', title: 'PvP Tracker'},
            {nav: 'MainDrawer', routerName: 'RaidTracker', title: 'Raid Tracker'},
            {nav: 'MainDrawer', routerName: 'DungeonTracker', title: 'Dungeon Tracker'},
            {nav: 'MainDrawer', routerName: 'Inventory', title: 'Inventory'}
        ]
    }
]
