import PropTypes from "prop-types"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { createPortal } from "react-dom"

export default function Dialog({setDialogIsOpen, children})  {
    const handleClose = () => {
        setDialogIsOpen({isOpen: false, plato: null})
    }
    useEffect(() => {
        document.body.style.overflow = "hidden"
        document.body.addEventListener("keydown", (e) => {
            if(e.key === "Escape") {
                handleClose()
            }
        })
        return () => {
            document.body.style.overflow = "auto"
        }
    })
    return (
        <>
        {createPortal(
        <div className="dialog-container">
            <div className="backdrop" onClick={handleClose}></div>
            <motion.div className="dialog"
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            >
                <div className="flex-dialog">
                    {children}
                </div>
            </motion.div>
        </div>
        , document.body)
        }
        </>
    )
}

Dialog.propTypes = {
    setDialogIsOpen: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}