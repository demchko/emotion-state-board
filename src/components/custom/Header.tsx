"use client";
import { motion } from "framer-motion";

export const Header = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
        >
            <h1 className={`text-4xl font-semibold mb-2 text-foreground`}>
                BOARD OF EMOTIONS
            </h1>
            <p className="text-gray-400 text-lg font-mono" >День — час відслідковувати свої емоції</p>
        </motion.div>
    )
}