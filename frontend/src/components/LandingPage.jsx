import { useNavigate } from "react-router-dom"
import { useStoreContext } from "../contextApi/ContextApi";
import { motion } from "framer-motion";
import Card from "./Card";


const LandingPage = () => {
  const navigate = useNavigate();
  const {token} = useStoreContext();

  const dashBoardNavigateHandler = () => {
    if(token) navigate("/dashboard");
    else navigate("/login")
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background px-5 sm:px-8 lg:px-14">
      {/* hero section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pt-16 lg:pt-10">

        {/* left */}
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-bold text-textMain text-3xl sm:text-4xl md:text-5xl leading-tight mb-4"
          >
            Simplify your links.  
            <br />
            <span className="text-primary">Share smarter with Shortiq.</span>
          </motion.h1>

          <p className="text-textSecondary text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
            Shortiq helps you create clean, short URLs and track their
            performance effortlessly. Perfect for sharing, marketing, and managing your links in one place.
          </p>

          {/* buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={dashBoardNavigateHandler}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            >
              Manage Links
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={dashBoardNavigateHandler}
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition cursor-pointer"
            >
              Create Short Link
            </motion.button>
          </div>
        </div>

        {/* img */}
        <div className="flex-1 flex justify-center w-full">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-70 sm:w-95 md:w-112.5 object-contain"
            src="/images/Shortiq_logo.png"
            alt="Shortiq preview"
          />
        </div>
      </div>

      <div className="pt-14">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-textMain font-semibold text-2xl sm:text-3xl text-center max-w-2xl mx-auto"
        >
          Trusted by individuals and teams worldwide
        </motion.p>

        {/* features */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
          <Card
            title="Simple URL Shortening"
            desc="Create clean, short links instantly with an intuitive and easy-to-use interface."
          />
          <Card
            title="Powerful Analytics"
            desc="Track clicks, monitor performance, and gain insights to improve your strategy."
          />
          <Card
            title="Enhanced Security"
            desc="Your links are protected with modern security standards and reliable infrastructure."
          />
          <Card
            title="Fast & Reliable"
            desc="Enjoy fast redirects and high uptime for a seamless user experience."
          />
        </div>
      </div>
    </div>
  )
}


export default LandingPage