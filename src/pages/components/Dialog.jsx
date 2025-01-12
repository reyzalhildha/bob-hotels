import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Dialog } from "primereact/dialog";

const DialogLogin = ({ title, message, onClose, visibleLogin }) => {
    const [setVisibleLogin] = useState(false);
  
  return (
    <Dialog
            header="Login"
            visible={visibleLogin}
            draggable={false}
            style={{ width: "50vw" }}
            onHide={visibleLogin}>
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Dialog>
  );
};

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  visibleLogin: PropTypes.func.isRequired,
};

export default DialogLogin;