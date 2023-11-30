import { createStandaloneToast } from '@chakra-ui/react';

const { toast: ChakraToast } = createStandaloneToast();

class Toast {
  success(message: string, title?: string) {
    return ChakraToast({
      ...(title && { title }),
      description: message,
      status: 'success',
      duration: 7000,
      isClosable: true,
      position: 'top',
    });
  }

  error(message: string, title?: string) {
    return ChakraToast({
      ...(title && { title }),
      description: message,
      status: 'error',
      duration: 7000,
      isClosable: true,
      position: 'top',
    });
  }

  warning(message: string, title?: string) {
    return ChakraToast({
      ...(title && { title }),
      description: message,
      status: 'warning',
      duration: 7000,
      isClosable: true,
      position: 'top',
    });
  }
}

export const toast = new Toast();