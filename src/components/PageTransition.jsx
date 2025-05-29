/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PageTransition = ({ children }) => {
  const { i18n } = useTranslation();

  return (
    <motion.div
      key={i18n.language}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.3,
      }}
      className="w-full">
      {children}
    </motion.div>
  );
};

export default PageTransition;
