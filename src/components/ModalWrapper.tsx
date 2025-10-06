import ReactModalImport from "react-modal";

const ReactModal = ReactModalImport as unknown as React.FC<any>;

interface ModalWrapperProps extends ReactModal.Props {
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, ...rest }) => {
  return <ReactModal {...rest}>{children}</ReactModal>;
};

export default ModalWrapper;
