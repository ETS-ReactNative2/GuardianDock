import {UserInfoCard} from "../config/BungieAPI";

export const parseDisplayName = (displayName: string): [string, string] => {
    const parsedName = displayName.split('#');
    return [parsedName[0], parsedName[1]];
}

export const deserializeUsers = (data: any): UserInfoCard => {
    if (data['applicableMembershipTypes'].length === 0)
        return {} as UserInfoCard;
    return {
        iconPath: data['iconPath'],
        applicableMembership: data['applicableMembershipTypes'],
        isPublic: data['isPublic'],
        displayName: data['displayName'],
        bungieGlobalDisplayName: data['bungieGlobalDisplayName'] + '#' + data['bungieGlobalDisplayNameCode'],
        bungieGlobalDisplayNameCode: data['bungieGlobalDisplayNameCode']
    } as UserInfoCard;
}
