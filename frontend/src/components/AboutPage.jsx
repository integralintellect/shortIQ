import React from "react";
import { FaLink, FaShareAlt, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { useStoreContext } from "../contextApi/ContextApi";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
            <FaLink className="text-xl" />
          </div>,
    title: "Simple URL Shortening",
    description:
      "Create clean and shareable links in seconds. No complexity, no clutter—just fast and efficient URL shortening.",
  },
  {
    icon: <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
              <FaShareAlt className="text-green-500 text-3xl" />
          </div>,
    title: "Smart Link Sharing",
    description:
      "Easily share links across platforms with improved readability and better engagement.",
  },
  {
    icon: <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
            <FaShieldAlt className="text-purple-500 text-3xl" />
          </div>,
    title: "Secure & Reliable",
    description:
      "Your data is protected with modern security standards, ensuring safe and consistent link access.",
  },
  {
    icon: <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
            <FaChartLine className="text-red-500 text-3xl" />
          </div>,
    title: "Detailed Analytics",
    description:
      "Track clicks, measure performance, and gain insights to make smarter decisions.",
  },
];

const AboutPage = () => {

  const {token} = useStoreContext();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background px-5 sm:px-8 lg:px-14 py-10">

      {/* Main Container */}
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-textMain mb-4">
            Shorten. Share. Track.
          </h1>

          <p className="text-textSecondary max-w-2xl mx-auto leading-relaxed">
            Shortiq is a modern URL shortening platform designed to simplify
            link management. Create powerful short links, share them anywhere,
            and track their performance—all in one seamless experience.
          </p>
        </div>

        {/* About Section */}
        <div className="bg-surface border border-border rounded-xl p-8 sm:p-10 shadow-sm mb-14">
          <h2 className="text-2xl font-semibold text-textMain mb-4">
            About Shortiq
          </h2>

          <p className="text-textSecondary leading-relaxed">
            Shortiq helps individuals and businesses simplify their links while
            gaining valuable insights. Whether you're sharing content on social
            media, running campaigns, or managing resources, Shortiq ensures
            your links are clean, reliable, and trackable.
          </p>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-2xl font-semibold text-textMain mb-8 text-center">
            Why choose Shortiq?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-surface hover:shadow-md transition"
              >
                <div>{feature.icon}</div>

                <div>
                  <h3 className="text-lg font-semibold text-textMain mb-1">
                    {feature.title}
                  </h3>

                  <p className="text-textSecondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-textMain mb-3">
            Start shortening your links today
          </h3>

          <p className="text-textSecondary mb-6">
            Join Shortiq and make your links smarter, shorter, and more powerful.
          </p>

          {!token && (
            <button onClick={handleClick} className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer">
              Create Your First Link
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
