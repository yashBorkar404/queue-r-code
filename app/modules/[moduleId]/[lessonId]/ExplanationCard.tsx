"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ExplanationCardProps {
  description: string;
}

export function ExplanationCard({ description }: ExplanationCardProps) {
  const formattedDescription = description.replace(/\\n/g, "\n");

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="bg-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <BookOpen className="mr-2 h-5 w-5" />
            Explanation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold mb-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-sm leading-relaxed">{children}</p>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4">{children}</ol>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
                pre: ({ children }) => (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto">
                    {children}
                  </pre>
                ),
              }}
            >
              {formattedDescription}
            </ReactMarkdown>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
}
