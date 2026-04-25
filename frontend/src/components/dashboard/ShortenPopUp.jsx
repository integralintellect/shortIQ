import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import CreateNewShorten from "./CreateNewShorten";

const ShortenPopUp = ({open, setOpen, refetch}) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    className: "bg-black/40 backdrop-blur-sm",
                },
            }}
        >
            <div className="flex items-center justify-center min-h-screen px-4">
                <motion.div
                    initial={{opacity: 0, scale: 0.9, y: 30}}
                    animate={{opacity: 1, scale: 1, y: 0}}
                    exit={{opacity: 0, scale: 0.9, y: 30}}
                    transition={{duration: 0.25}}
                    className="w-full max-w-md"
                >
                    <CreateNewShorten setOpen={setOpen} refetch={refetch} />
                </motion.div>
            </div>
        </Modal>
    );
};

export default ShortenPopUp;