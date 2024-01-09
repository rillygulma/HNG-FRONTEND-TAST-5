import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'react-feather' // Or use your own X icon

type ModalProps = {
  children: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
}

const Modal: React.FC<ModalProps> = ({
  children,
  defaultOpen,
  onOpenChange,
  onClose,
}) => {
  return (
    <Dialog.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button className='Button violet'>Open Modal</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Modal Title</Dialog.Title>
          <div className='flex justify-end'>
            <Dialog.Close asChild>
              <button
                className='IconButton'
                aria-label='Close'
                onClick={onClose}
              >
                <X /> {/* Using Radix Icon */}
              </button>
            </Dialog.Close>
          </div>
          {children}
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className='Button green'>Close Modal</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
