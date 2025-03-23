import React, { useState } from "react";
import {
  UserGroupIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  Squares2X2Icon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartPieIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";

function HomePage() {
  const [activeTab, setActiveTab] = useState("teachers");

  // Features data
  const features = {
    teachers: [
      {
        icon: <UserGroupIcon className="h-6 w-6 text-blue-500" />,
        title: "Student Management",
        description:
          "Create and manage student login credentials. Organize student profiles and access.",
      },
      {
        icon: <CheckBadgeIcon className="h-6 w-6 text-blue-500" />,
        title: "Task Management",
        description:
          "Maintain to-do lists for assignments, tasks, and deadlines. Set reminders for upcoming events.",
      },
      {
        icon: <DocumentTextIcon className="h-6 w-6 text-blue-500" />,
        title: "Resource Sharing",
        description:
          "Share educational materials, documents, and resources with students easily.",
      },
      {
        icon: <VideoCameraIcon className="h-6 w-6 text-blue-500" />,
        title: "Interactive Learning",
        description:
          "Conduct live video conferences for interactive teaching and real-time discussions.",
      },
      {
        icon: <ChartBarIcon className="h-6 w-6 text-blue-500" />,
        title: "Assessment & Progress",
        description:
          "Create and manage quizzes, tests, and view detailed analytics on student performance.",
      },
      {
        icon: <TrophyIcon className="h-6 w-6 text-blue-500" />,
        title: "Engagement & Motivation",
        description:
          "Showcase leaderboards to encourage healthy competition and recognize achievements.",
      },
    ],
    students: [
      {
        icon: <CalendarDaysIcon className="h-6 w-6 text-blue-500" />,
        title: "Task Management & Planning",
        description:
          "Maintain personal to-do lists for study tasks and organize schedules for better time management.",
      },
      {
        icon: <GlobeAltIcon className="h-6 w-6 text-blue-500" />,
        title: "Personalized Learning Paths",
        description:
          "Explore custom learning paths based on interests and access recommended study materials.",
      },
      {
        icon: <Squares2X2Icon className="h-6 w-6 text-blue-500" />,
        title: "Interactive Canvas Board",
        description:
          "Engage in interactive learning activities and collaborate with peers on group projects.",
      },
      {
        icon: <CheckBadgeIcon className="h-6 w-6 text-blue-500" />,
        title: "Assessment & Practice",
        description:
          "Attempt quizzes for self-assessment and receive instant feedback to track progress.",
      },
      {
        icon: <ChartPieIcon className="h-6 w-6 text-blue-500" />,
        title: "Subject-Based Statistics",
        description:
          "View detailed statistics on performance in various subjects to identify strengths and weaknesses.",
      },
      {
        icon: <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-blue-500" />,
        title: "ChatAI for Reference",
        description:
          "Utilize an AI-powered chatbot for quick answers, explanations, and study tips.",
      },
    ],
  };

  // How it works steps
  const howItWorksSteps = [
    {
      title: "Create Your Account",
      description:
        "Sign up as a teacher or student and set up your personalized profile to get started.",
    },
    {
      title: "Customize Your Environment",
      description:
        "Set up your learning or teaching environment with tools that match your specific needs.",
    },
    {
      title: "Engage & Learn",
      description:
        "Utilize our interactive tools to enhance teaching or learning with improved focus and engagement.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navigation */}
      <header className="border-b border-gray-800 sticky top-0 bg-black/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center md:justify-between">
          <Link to="/">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">eduWave</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <button className="px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white hidden sm:inline-flex hover:bg-gray-800 transition-colors items-center gap-2">
                <ArrowRightOnRectangleIcon className="h-5 w-4" />
                Log in
              </button>
            </Link>
            <button className="bg-transparent">
              <a
                target="_blank"
                href="https://github.com/suraj719/eduWave"
                className="border border-gray-700 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Contribute
              </a>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/10 z-0"></div>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-1">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
              Revolutionize <span className="text-blue-500">Education</span>{" "}
              with Technology & Mindfulness
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Empower teachers with interactive course design tools and provide
              students with customizable study environments to enhance focus and
              engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/auth">
                <button className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors sm:w-auto w-full font-medium shadow-lg shadow-blue-500/20 transform hover:-translate-y-1 duration-200">
                  Get Started
                </button>
              </Link>
              <a
                target="_blank"
                href="https://www.youtube.com/watch?v=jmVAoCwxQFg"
              >
                <button className="px-6 py-3 rounded-md bg-transparent border border-gray-700 text-white hover:bg-gray-800 transition-colors sm:w-auto w-full font-medium transform hover:-translate-y-1 duration-200">
                  Watch Demo
                </button>
              </a>
            </div>
          </div>
          <div className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-1"></div>
            <img
              src="/assets/hero.avif"
              alt="eduWave Platform"
              className="object-contain md:object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-gray-950 to-black"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Powerful Features for Teachers & Students
            </h2>
            <p className="text-gray-300">
              eduWave combines cutting-edge technology with mindfulness
              practices to create an optimal learning environment.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <div className="grid w-full grid-cols-2 mb-8 overflow-hidden rounded-lg">
              <button
                className={`py-3 px-4 font-medium text-center transition-colors ${
                  activeTab === "teachers"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("teachers")}
              >
                For Teachers
              </button>
              <button
                className={`py-3 px-4 font-medium text-center transition-colors ${
                  activeTab === "students"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("students")}
              >
                For Students
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {features[activeTab].map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              How eduWave Works
            </h2>
            <p className="text-gray-300">
              Our platform seamlessly integrates technology and mindfulness to
              create an optimal learning environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line (desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0"></div>

            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-xl text-center border border-gray-800 hover:border-blue-700/70 transition-colors relative z-1 transform hover:-translate-y-2 duration-300 shadow-lg hover:shadow-blue-500/10"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-500/30">
                  <span className="text-blue-500 font-bold text-2xl">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-100">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <span>Made with ❤️ by </span>
          <a
            className="text-blue-500 hover:text-blue-400 underline"
            href="https://github.com/suraj719"
          >
            suraj
          </a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-blue-700 transition-colors shadow-md hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1 duration-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="font-semibold text-lg text-blue-100">{title}</h3>
        </div>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}

export default HomePage;
