import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/common/shadcn/alert-dialog";
import { Button } from "@/components/ui/common/shadcn/button";
import { UpdateOrderStatusReq, useUpdateOrderStatus } from "@/lib/api/OrdersApi";

interface ChangeStatusModalProps {
  onClose: () => void;
  onCancel: () => void;
  open: boolean;
  statusReq: UpdateOrderStatusReq;
}

function ChangeStatusModal({
  onClose,
  onCancel,
  open,
  statusReq,
}: ChangeStatusModalProps) {
  const {
    updateOrderStatus,
  } = useUpdateOrderStatus();
  const handleConfirm = () => {
    onClose();
    updateOrderStatus(statusReq);
  };
  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Change status
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are changing this order&apos;s status to
            {" "}
            {statusReq.status}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild onClick={(e) => e.stopPropagation()}>
            <Button data-testid="modal-confirm-button" onClick={handleConfirm} variant="secondary">
              Update
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild onClick={(e) => e.stopPropagation()} data-testid="modal-cancel-button">
            <Button data-testid="modal-confirm-button" variant="secondary" onClick={onCancel}>
              Return
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ChangeStatusModal;
