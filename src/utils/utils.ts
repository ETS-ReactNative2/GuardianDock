export const parseDisplayName = (displayName: string): [string, string] => {
    const parsedName = displayName.split('#')
    return [parsedName[0], parsedName[1]]
}