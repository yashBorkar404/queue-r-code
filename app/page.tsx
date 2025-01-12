"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/modules");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-gradient-to-b from-gray-300 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-900 dark:text-white"
    >
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl font-bold mb-4"
            >
              Queue R Code
            </motion.h1>
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-semibold mb-6"
            >
              Level Up Your Data Structure Skills!
            </motion.h2>
            <motion.p
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto"
            >
              Master essential data structures through interactive challenges
              and real-world applications. Boost your coding prowess and
              problem-solving abilities.
            </motion.p>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                asChild
                className="bg-gray-900 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-400 dark:text-gray-900 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <Link href="/sign-in">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-3xl font-bold mb-6"
            >
              Why Choose Queue R Code?
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Interactive Learning",
                  description:
                    "Engage with hands-on exercises and visualizations to reinforce your understanding of data structures.",
                },
                {
                  title: "Real-world Applications",
                  description:
                    "Learn how to apply data structures to solve practical problems and optimize your code.",
                },
                {
                  title: "Progress Tracking",
                  description:
                    "Monitor your growth and earn achievements as you advance through our comprehensive curriculum.",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                  <h4 className="text-2xl font-semibold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {card.title}
                  </h4>
                  <p className="group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="text-gray-900 dark:text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Queue R Code. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link
              href="#"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
