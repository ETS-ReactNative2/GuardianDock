import React, {useState} from "react";
import {Alert, CloseIcon, IconButton, HStack, Text, VStack, Box, Collapse} from "native-base";

export type AlertProps = {
    status: string,
    title: string,
    description: string,
    onClose: () => void
}

export default function CenteredAlert({ status, title, description, onClose }: AlertProps) {
    const [show, setShow] = useState(true);

    return (
        <Box w="100%" alignItems="center">
            <Collapse isOpen={show}>
                <Alert w='90%' wMax='400' status={status} colorScheme={status}>
                    <VStack space={2} flexShrink={1} w='100%'>
                        <HStack flexShrink={1} space={2} justifyContent='space-between'>
                            <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt='1' />
                                <Text fontSize='md' color='coolGray.800'>
                                    {title}
                                </Text>
                            </HStack>
                            <IconButton
                                variant='unstyled'
                                _focus={{ borderWidth: 0 }}
                                icon={<CloseIcon size='3' color='coolGray.600' />}
                                onPress={() => {
                                    onClose()
                                    setShow(false)
                                }
                            }/>
                        </HStack>
                        <Box pl='4' _text={{ color: 'coolGray.600' }}>
                            {description}
                        </Box>
                    </VStack>
                </Alert>
            </Collapse>
        </Box>
    )
}