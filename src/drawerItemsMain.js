export const drawerItemsMain = [
    {
      key: 'Home',
      title: 'Home',
      routes: [{nav: 'MainDrawer', routeName: 'Home', title: 'Home'}],
    },
    {
      key: 'Fortnite',
      title: 'Fortnite',
      routes: [
        {nav: 'MainDrawer', routeName: 'Statistiques', title: 'Statistiques'},
        {nav: 'MainDrawer', routeName: 'Match', title: 'Match'},
        {nav: 'MainDrawer', routeName: 'Nouveautés', title: 'Nouveautés'}
      ],
    },
    {
      key: 'Destiny 2',
      title: 'Destiny 2',
      routes: [
        {nav: 'MainDrawer', routeName: 'Inventaire', title: 'Inventaire'},
        {nav: 'MainDrawer', routeName: 'Statistiques Destiny2', title: 'Statistiques'},
        {nav: 'MainDrawer', routeName: 'Nouveautés Destiny2', title: 'Nouveautés'}
      ],
    },
    {
      key: 'Warzone',
      title: 'Warzone',
      routes: [
        {nav: 'MainDrawer', routeName: 'Statistiques Warzone', title: 'Statistiques Warzone'},
        {nav: 'MainDrawer', routeName: 'Match Warzone', title: 'Match Warzone'},
        {nav: 'MainDrawer', routeName: 'Statistiques Multiplayer', title: 'Statistiques Multiplayer'},
        {nav: 'MainDrawer', routeName: 'Match Multiplayer', title: 'Match Multiplayer'}
      ],
    }
  ];