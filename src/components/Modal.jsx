import { Dialog, DialogContent, DialogTitle} from "@material-ui/core";

const Modal = ({onClose, children, title}) => {
  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
      > 
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Modal;