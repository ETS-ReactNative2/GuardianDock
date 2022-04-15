export let API_ROUTE: string = "https://www.bungie.net/Platform";

export type UserInfoCard = {
    iconPath: string,
    applicableMembership: Array<number>,
    isPublic: boolean,
    displayName: string,
    bungieGlobalDisplayName: string,
    bungieGlobalDisplayNameCode: string
}
