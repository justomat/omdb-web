import Image from "next/image";
import { useCallback } from "react";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import { closeModal } from "../redux/action";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 12,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.7)",
  },
};

export default function PosterModal({ selectedPoster }) {
  const dispatch = useDispatch();
  const close = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <ReactModal isOpen={selectedPoster !== ""} style={customStyles}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <button
          style={{ alignSelf: "flex-end", marginBottom: 8 }}
          onClick={close}
        >
          close
        </button>
        {selectedPoster ? (
          <Image
            src={
              selectedPoster === "N/A"
                ? "http://placehold.it/150x225"
                : selectedPoster
            }
            width={300}
            height={444}
          />
        ) : null}
      </div>
    </ReactModal>
  );
}
