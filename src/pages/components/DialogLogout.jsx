import React from "react";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";

export default function DialogLogout({ visible, onHide }) {
  return (
    <Dialog
      header="Logout"
      visible={visible}
      draggable={false}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Dialog>
  );
}

DialogLogout.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};