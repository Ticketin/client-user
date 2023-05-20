import { motion } from "framer-motion";

import styles from "./FlipCard.module.scss";

// Framer animations
const duration = 0.3;
const flipVariants = {
    shown: {
        rotateY: 0,
        transition: {
            duration,
        },
    },
    frontFlipped: {
        rotateY: -180,
        transition: {
            duration,
        },
    },
    backFlipped: {
        rotateY: 180,
        transition: {
            duration,
        },
    },
};

export default function FlipCard({ children }) {
    return (
        <motion.div
            className={styles.test2}
            style={{
                position: "relative",
                transformStyle: "preserve-3d",
            }}
        >
            {children}
        </motion.div>
    );
}

export function FrontCard({ isCardFlipped, children }) {
    return (
        <AnimatedCardFace variants={flipVariants} animate={isCardFlipped ? "frontFlipped" : "shown"}>
            {children}
        </AnimatedCardFace>
    );
}

export function BackCard({ isCardFlipped, children }) {
    return (
        <AnimatedCardFace
            variants={flipVariants}
            initial={{ rotateY: 180 }}
            animate={isCardFlipped ? "shown" : "backFlipped"}
            style={
                isCardFlipped
                    ? {
                          backgroundColor: "#100333",
                          backgroundImage: "linear-gradient(-370deg, #191621, #191621)",
                          color: "white",
                      }
                    : {}
            }
        >
            {children}
        </AnimatedCardFace>
    );
}

function AnimatedCardFace({ children, style, ...rest }) {
    return (
        <motion.div
            style={{
                position: "absolute",
                backfaceVisibility: "hidden",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                borderRadius: 12,
                ...style,
            }}
            {...rest}
        >
            <div
                style={{
                    position: "relative",
                    flexDirection: "column",
                    flex: 1,
                    display: "flex",
                    alignItems: "flex-end",
                }}
            >
                <div style={{ flex: 1, width: "100%" }}>{children}</div>
            </div>
        </motion.div>
    );
}
