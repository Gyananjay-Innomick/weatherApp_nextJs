export const notificationHandler = (
  toast: CallableFunction,
  title: string,
  status: string,
  id: string
) =>
  toast({
    id,
    title,
    status,
    duration: 5000,
    isClosable: true,
  })
