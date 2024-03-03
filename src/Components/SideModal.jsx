/* eslint-disable react/prop-types */
import Modal from "react-modal";
import SideBar from "./Sidebar";
function SidebarModal({ isSidebarOpen, closeSidebar }) {
  return (
    <Modal
      isOpen={isSidebarOpen}
      onRequestClose={closeSidebar}
      style={{
        overlay: {
          backgroundColor: "hsl(226 28% 56% / 50%)",
        },
        content: {
          width: "80%",
          maxWidth: "255px",
          padding: 0,
          height: "100%",
          margin: 0, // Remove the auto margin
          top: 0, // Align the modal to the top
          left: 0, // Set to auto to allow custom positioning
          right: "auto", // Position the modal on the right side
        },
      }}
    >
      <SideBar closeSidebar={closeSidebar} />
    </Modal>
  );
}

export default SidebarModal;
