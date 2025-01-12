"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  question: string;
  answers: {
    text: string;
    correct: boolean;
    description: string;
  }[];
}

const quizData: Record<"easy" | "medium" | "hard", QuizQuestion[]> = {
  easy: [
    {
      question: "What is the capital of Japan?",
      answers: [
        {
          text: "Beijing",
          correct: false,
          description: "Beijing is the capital of China.",
        },
        {
          text: "Seoul",
          correct: false,
          description: "Seoul is the capital of South Korea.",
        },
        {
          text: "Tokyo",
          correct: true,
          description: "Correct! Tokyo is the capital of Japan.",
        },
        {
          text: "Bangkok",
          correct: false,
          description: "Bangkok is the capital of Thailand.",
        },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        {
          text: "Venus",
          correct: false,
          description: "Venus is known as the Morning Star.",
        },
        {
          text: "Mars",
          correct: true,
          description:
            "Correct! Mars is known as the Red Planet due to its reddish appearance.",
        },
        {
          text: "Jupiter",
          correct: false,
          description: "Jupiter is the largest planet in our solar system.",
        },
        {
          text: "Saturn",
          correct: false,
          description: "Saturn is known for its prominent ring system.",
        },
      ],
    },
  ],
  medium: [
    {
      question: "Who painted the Mona Lisa?",
      answers: [
        {
          text: "Vincent van Gogh",
          correct: false,
          description: "Van Gogh painted 'The Starry Night'.",
        },
        {
          text: "Pablo Picasso",
          correct: false,
          description: "Picasso was a pioneer of Cubism.",
        },
        {
          text: "Leonardo da Vinci",
          correct: true,
          description: "Correct! Leonardo da Vinci painted the Mona Lisa.",
        },
        {
          text: "Michelangelo",
          correct: false,
          description: "Michelangelo painted the Sistine Chapel ceiling.",
        },
      ],
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: [
        {
          text: "Ag",
          correct: false,
          description: "Ag is the symbol for silver.",
        },
        {
          text: "Fe",
          correct: false,
          description: "Fe is the symbol for iron.",
        },
        {
          text: "Au",
          correct: true,
          description: "Correct! Au is the chemical symbol for gold.",
        },
        {
          text: "Cu",
          correct: false,
          description: "Cu is the symbol for copper.",
        },
      ],
    },
  ],
  hard: [
    {
      question: "What is the smallest prime number greater than 100?",
      answers: [
        {
          text: "101",
          correct: true,
          description:
            "Correct! 101 is the smallest prime number greater than 100.",
        },
        {
          text: "102",
          correct: false,
          description: "102 is not a prime number.",
        },
        {
          text: "103",
          correct: false,
          description:
            "103 is prime, but not the smallest prime greater than 100.",
        },
        {
          text: "107",
          correct: false,
          description:
            "107 is prime, but not the smallest prime greater than 100.",
        },
      ],
    },
    {
      question: "Who wrote the play 'Waiting for Godot'?",
      answers: [
        {
          text: "William Shakespeare",
          correct: false,
          description:
            "Shakespeare wrote plays like 'Hamlet' and 'Romeo and Juliet'.",
        },
        {
          text: "Samuel Beckett",
          correct: true,
          description: "Correct! Samuel Beckett wrote 'Waiting for Godot'.",
        },
        {
          text: "Arthur Miller",
          correct: false,
          description: "Arthur Miller wrote 'Death of a Salesman'.",
        },
        {
          text: "Tennessee Williams",
          correct: false,
          description: "Tennessee Williams wrote 'A Streetcar Named Desire'.",
        },
      ],
    },
  ],
};

export default function QuizComponent() {
  const [clickedAnswers, setClickedAnswers] = useState<
    Record<string, Set<number>>
  >({
    easy: new Set(),
    medium: new Set(),
    hard: new Set(),
  });
  const [descriptions, setDescriptions] = useState<Record<string, string[]>>({
    easy: new Array(quizData.easy.length).fill(""),
    medium: new Array(quizData.medium.length).fill(""),
    hard: new Array(quizData.hard.length).fill(""),
  });
  const [scores, setScores] = useState<Record<string, number | null>>({
    easy: null,
    medium: null,
    hard: null,
  });

  const handleAnswerClick = (
    difficulty: "easy" | "medium" | "hard",
    questionIndex: number,
    answerIndex: number
  ) => {
    if (clickedAnswers[difficulty].has(questionIndex * 4 + answerIndex)) return;

    const newClickedAnswers = { ...clickedAnswers };
    newClickedAnswers[difficulty] = new Set(clickedAnswers[difficulty]);
    newClickedAnswers[difficulty].add(questionIndex * 4 + answerIndex);
    setClickedAnswers(newClickedAnswers);

    const newDescriptions = { ...descriptions };
    newDescriptions[difficulty] = [...descriptions[difficulty]];
    newDescriptions[difficulty][questionIndex] =
      quizData[difficulty][questionIndex].answers[answerIndex].description;
    setDescriptions(newDescriptions);
  };

  const isQuizComplete = (difficulty: "easy" | "medium" | "hard") => {
    return quizData[difficulty].every((_, index) =>
      Array.from(clickedAnswers[difficulty]).some(
        (id) => Math.floor(id / 4) === index
      )
    );
  };

  const handleSubmit = (difficulty: "easy" | "medium" | "hard") => {
    const score = Array.from(clickedAnswers[difficulty]).reduce(
      (acc, answerId) => {
        const questionIndex = Math.floor(answerId / 4);
        const answerIndex = answerId % 4;
        return (
          acc +
          (quizData[difficulty][questionIndex].answers[answerIndex].correct
            ? 1
            : 0)
        );
      },
      0
    );

    setScores((prev) => ({
      ...prev,
      [difficulty]: score,
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500 dark:text-green-400";
      case "medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "hard":
        return "text-red-500 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8 dark:text-white">
        Multi-Level Quiz
      </h1>

      <Tabs defaultValue="easy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="easy" className="space-x-2">
            Easy
            <Badge variant="secondary" className={getDifficultyColor("easy")}>
              {scores.easy !== null
                ? `${scores.easy}/${quizData.easy.length}`
                : ""}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="medium" className="space-x-2">
            Medium
            <Badge variant="secondary" className={getDifficultyColor("medium")}>
              {scores.medium !== null
                ? `${scores.medium}/${quizData.medium.length}`
                : ""}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="hard" className="space-x-2">
            Hard
            <Badge variant="secondary" className={getDifficultyColor("hard")}>
              {scores.hard !== null
                ? `${scores.hard}/${quizData.hard.length}`
                : ""}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {(Object.keys(quizData) as Array<"easy" | "medium" | "hard">).map(
          (difficulty) => (
            <TabsContent
              key={difficulty}
              value={difficulty}
              className="space-y-6"
            >
              {quizData[difficulty].map((question, questionIndex) => (
                <Card
                  key={questionIndex}
                  className="border-2 transition-all duration-300 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-700"
                >
                  <CardHeader>
                    <CardTitle className="text-xl dark:text-white">
                      {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.answers.map((answer, answerIndex) => {
                        const isClicked = clickedAnswers[difficulty].has(
                          questionIndex * 4 + answerIndex
                        );
                        const isCorrect = answer.correct && isClicked;

                        return (
                          <Button
                            key={answerIndex}
                            onClick={() =>
                              handleAnswerClick(
                                difficulty,
                                questionIndex,
                                answerIndex
                              )
                            }
                            disabled={Array.from(
                              clickedAnswers[difficulty]
                            ).some(
                              (id) => Math.floor(id / 4) === questionIndex
                            )}
                            variant={
                              isClicked
                                ? isCorrect
                                  ? "default"
                                  : "secondary"
                                : "outline"
                            }
                            className={`h-auto min-h-[3rem] p-4 text-left justify-start transition-all duration-300
                            ${
                              isClicked
                                ? isCorrect
                                  ? "border-green-500 bg-green-500/10 dark:bg-green-500/20 dark:text-green-300"
                                  : "border-red-500 bg-red-500/10 dark:bg-red-500/20 dark:text-red-300"
                                : "hover:border-primary dark:text-white dark:hover:bg-gray-700"
                            }
                          `}
                          >
                            {answer.text}
                          </Button>
                        );
                      })}
                    </div>
                    {descriptions[difficulty][questionIndex] && (
                      <CardDescription
                        className={`p-4 rounded-lg transition-all duration-300 ${
                          clickedAnswers[difficulty].has(
                            questionIndex * 4 +
                              quizData[difficulty][
                                questionIndex
                              ].answers.findIndex((a) => a.correct)
                          )
                            ? "bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                            : "bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                        }`}
                      >
                        {descriptions[difficulty][questionIndex]}
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>
              ))}

              {isQuizComplete(difficulty) && scores[difficulty] === null && (
                <Button
                  onClick={() => handleSubmit(difficulty)}
                  className="w-full transition-all duration-300 text-lg py-6 dark:bg-primary dark:text-white dark:hover:bg-primary/90"
                >
                  Submit{" "}
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}{" "}
                  Quiz
                </Button>
              )}
            </TabsContent>
          )
        )}
      </Tabs>
    </div>
  );
}
