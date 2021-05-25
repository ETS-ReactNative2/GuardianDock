export const drawerItemsMain = [
    {
      key: 'Home',
      title: 'Menu principal',
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
        {nav: 'MainDrawer', routeName: 'Statistiques Destiny 2', title: 'Statistiques'},
        {nav: 'MainDrawer', routeName: 'Nouveautés Destiny 2', title: 'Nouveautés'}
      ],
    },
    {
      key: 'Warzone',
      title: 'Warzone',
      routes: [
        {nav: 'MainDrawer', routeName: 'Statistiques Warzone', title: 'Statistiques Warzone'},
        {nav: 'MainDrawer', routeName: 'Match Warzone', title: 'Match Warzone'},
        {nav: 'MainDrawer', routeName: 'Statistiques Multijoueur', title: 'Statistiques Multijoueur'},
        {nav: 'MainDrawer', routeName: 'Match Multijoueur', title: 'Match Multijoueur'}
      ],
    }
  ];