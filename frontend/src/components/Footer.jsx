import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";


const Footer =  () => {
    return (
        <footer className="bg-surface border-t border-border mt-16">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                
                {/* left section */}
                <div className="text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-textMain mb-2">
                        Shortiq
                    </h2>
                    <p className="text-textSecondary text-sm sm:text-base">
                        Simplifying URL shortening for smarter sharing.
                    </p>
                </div>

                {/* center section */}
                <p className="text-textSecondary text-sm text-center">
                    © {new Date().getFullYear()} Shortiq. All rights reserved.
                </p>

                {/* social icons */}
                <div className="flex items-center gap-5">
                    <a href="#"
                        className="text-textSecondary hover:text-primary transition text-xl"
                    >
                    <FaFacebook />
                    </a>
        
                    <a
                    href="#"
                    className="text-textSecondary hover:text-primary transition text-xl"
                    >
                    <FaTwitter />
                    </a>
        
                    <a
                    href="#"
                    className="text-textSecondary hover:text-primary transition text-xl"
                    >
                    <FaInstagram />
                    </a>
        
                    <a
                    href="#"
                    className="text-textSecondary hover:text-primary transition text-xl"
                    >
                    <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;