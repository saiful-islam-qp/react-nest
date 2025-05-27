import {
  WuModal,
  WuModalHeader,
  WuModalContent,
  WuModalFooter,
  WuModalClose,
} from '@npm-questionpro/wick-ui-lib'

export const CreateTodoModal: React.FC = () => {
  return (
    <WuModal Trigger={<button>Create Todo</button>}>
      <WuModalHeader>Basic Modal</WuModalHeader>
      <WuModalContent>
        <p>This is a basic modal with default settings.</p>
      </WuModalContent>
      <WuModalFooter>
        <WuModalClose>Close</WuModalClose>
      </WuModalFooter>
    </WuModal>
  )
}
