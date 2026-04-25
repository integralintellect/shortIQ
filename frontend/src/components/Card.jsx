import {motion} from "framer-motion"

const Card = ({title, desc}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 80}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.4, ease: "easeOut"}}
            className="bg-surface border border-border rounded-xl p-5 sm:p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-200"
        >
            <h2 className="text-textMain text-lg sm:text-xl font-semibold">
                {title}
            </h2>

            <p className="text-textSecondary text-sm leading-relaxed">
                {desc}
            </p>
        </motion.div>
    );
};

export default Card;