import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Repeat, ListIcon as QueueList } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Level Up Your Coding Skills!
            </h2>
            <p className="text-xl mb-8">
              Master Queues and Recursion through interactive games and
              challenges.
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
              Start Your Quest <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Choose Your Path
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="flex items-center mb-4">
                  <QueueList className="text-blue-500 mr-2" size={24} />
                  <h4 className="text-2xl font-bold">Queue Adventures</h4>
                </div>
                <p className="mb-4">
                  Dive into the world of queues and learn how to manage data in
                  a first-in, first-out approach. Perfect for solving real-world
                  problems!
                </p>
                <Button variant="outline" className="mt-2">
                  Explore Queues
                </Button>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="flex items-center mb-4">
                  <Repeat className="text-green-500 mr-2" size={24} />
                  <h4 className="text-2xl font-bold">Recursion Quests</h4>
                </div>
                <p className="mb-4">
                  Unravel the mysteries of recursion and learn to solve complex
                  problems by breaking them down into simpler ones. Boost your
                  problem-solving skills!
                </p>
                <Button variant="outline" className="mt-2">
                  Master Recursion
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Challenge Yourself?
            </h3>
            <p className="text-xl mb-8">
              Join thousands of learners and level up your DSA skills today!
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
              Create Free Account
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 DSA Quest. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="#" className="hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-blue-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
