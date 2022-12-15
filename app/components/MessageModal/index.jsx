import ActionButton from "components/ActionButton/index";
import {
  ModalTitle,
  ModalBody,
  ModalAction,
  ModalContent,
  ModalContainer
} from "core/theme/styles/modal.styled";
import { Modal } from "node_modules/@material-ui/core/index";
import React from "react";

function ErrorModal({ open, handleClose, title, message, children }) {
  return (
    <>
      <ModalContainer
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent className="error">
          <ModalTitle>
            <ion-icon name="close-circle-outline"></ion-icon>
            <h4>{title}</h4>
          </ModalTitle>
          <ModalBody>
            <p>{message}</p>
            {children}
          </ModalBody>

          <ModalAction>
            <ActionButton onClick={() => handleClose(false)}>OK</ActionButton>
          </ModalAction>
        </ModalContent>
      </ModalContainer>
    </>
  );
}

function SuccessModal({ open, handleClose, title, message, children, buttonText="OK" }) {
  return (
    <>
      <ModalContainer
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent className="success">
          <ModalTitle>
          <ion-icon name="checkmark-circle-outline"></ion-icon>
            <h4>{title}</h4>
          </ModalTitle>
          <ModalBody>
            <p>{message}</p>
            {children}
          </ModalBody>

          <ModalAction>
            <ActionButton onClick={() => handleClose(false)}>{buttonText}</ActionButton>
          </ModalAction>
        </ModalContent>
      </ModalContainer>
    </>
  );
}


export { ErrorModal, SuccessModal };
