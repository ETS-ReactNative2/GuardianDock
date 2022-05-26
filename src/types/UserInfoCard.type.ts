import {DestinyMembership} from "./DestinyMembership.enum";

export type DestinyMembershipInfo = {
    "iconPath": string;
    "crossSaveOverride": number;
    "applicableMembershipTypes": Array<DestinyMembership>;
    "isPublic": boolean;
    "membershipType": DestinyMembership;
    "membershipId": string;
    "displayName": string;
};

export type UserInfoCard = {
    "bungieGlobalDisplayName": string;
    "bungieGlobalDisplayNameCode": string;
    "bungieNetMembershipId": string;
    "destinyMemberships": Array<DestinyMembershipInfo>;
};
