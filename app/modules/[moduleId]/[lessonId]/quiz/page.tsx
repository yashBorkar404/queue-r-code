'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Moon, Sun } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface QuizQuestion {
  question: string
  answers: {
    text: string
    correct: boolean
    description: string
  }[]
}

const quizData: Record<'easy' | 'medium' | 'hard', QuizQuestion[]> = {
  easy: [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "London", correct: false, description: "London is the capital of the United Kingdom, not France." },
        { text: "Berlin", correct: false, description: "Berlin is the capital of Germany, not France." },
        { text: "Paris", correct: true, description: "Correct! Paris is the capital of France." },
        { text: "Madrid", correct: false, description: "Madrid is the capital of Spain, not France." },
      ],
    },
    {
      question: "Which planet is closest to the Sun?",
      answers: [
        { text: "Venus", correct: false, description: "Venus is the second planet from the Sun." },
        { text: "Mars", correct: false, description: "Mars is the fourth planet from the Sun." },
        { text: "Earth", correct: false, description: "Earth is the third planet from the Sun." },
        { text: "Mercury", correct: true, description: "Correct! Mercury is the closest planet to the Sun." },
      ],
    }
  ],
  medium: [
    {
      question: "Which element has the chemical symbol 'Fe'?",
      answers: [
        { text: "Fluorine", correct: false, description: "Fluorine's chemical symbol is 'F'." },
        { text: "Iron", correct: true, description: "Correct! 'Fe' comes from the Latin word 'ferrum', meaning iron." },
        { text: "Francium", correct: false, description: "Francium's chemical symbol is 'Fr'." },
        { text: "Fermium", correct: false, description: "Fermium's chemical symbol is 'Fm'." },
      ],
    },
    {
      question: "In which year did World War II end?",
      answers: [
        { text: "1943", correct: false, description: "The war was still ongoing in 1943." },
        { text: "1944", correct: false, description: "The war continued through 1944." },
        { text: "1945", correct: true, description: "Correct! World War II ended in 1945." },
        { text: "1946", correct: false, description: "The war had already ended by 1946." },
      ],
    }
  ],
  hard: [
    {
      question: "What is the Schwarzschild radius?",
      answers: [
        { text: "The radius of a white dwarf", correct: false, description: "The Schwarzschild radius is not related to white dwarfs specifically." },
        { text: "The radius of a neutron star", correct: false, description: "While neutron stars are dense, this isn't the definition of the Schwarzschild radius." },
        { text: "The boundary of a black hole's event horizon", correct: true, description: "Correct! The Schwarzschild radius defines the event horizon of a black hole, where escape velocity equals the speed of light." },
        { text: "The radius of a galaxy's core", correct: false, description: "Galaxy cores are much larger than the Schwarzschild radius." },
      ],
    },
    {
      question: "Which quantum number describes the shape of an electron orbital?",
      answers: [
        { text: "Principal quantum number", correct: false, description: "The principal quantum number (n) describes the energy level and size of the orbital." },
        { text: "Angular momentum quantum number", correct: true, description: "Correct! The angular momentum quantum number (l) determines the shape of the orbital." },
        { text: "Magnetic quantum number", correct: false, description: "The magnetic quantum number (ml) describes the orientation of the orbital." },
        { text: "Spin quantum number", correct: false, description: "The spin quantum number (ms) describes the electron's intrinsic angular momentum." },
      ],
    }
  ]
}

export default function QuizPage() {
  const [clickedAnswers, setClickedAnswers] = useState<Record<string, Set<number>>>({
    easy: new Set(),
    medium: new Set(),
    hard: new Set()
  })
  const [descriptions, setDescriptions] = useState<Record<string, string[]>>({
    easy: new Array(quizData.easy.length).fill(''),
    medium: new Array(quizData.medium.length).fill(''),
    hard: new Array(quizData.hard.length).fill('')
  })
  const [scores, setScores] = useState<Record<string, number | null>>({
    easy: null,
    medium: null,
    hard: null
  })
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleAnswerClick = (difficulty: 'easy' | 'medium' | 'hard', questionIndex: number, answerIndex: number) => {
    if (clickedAnswers[difficulty].has(questionIndex * 4 + answerIndex)) return

    const newClickedAnswers = { ...clickedAnswers }
    newClickedAnswers[difficulty] = new Set(clickedAnswers[difficulty])
    newClickedAnswers[difficulty].add(questionIndex * 4 + answerIndex)
    setClickedAnswers(newClickedAnswers)

    const newDescriptions = { ...descriptions }
    newDescriptions[difficulty] = [...descriptions[difficulty]]
    newDescriptions[difficulty][questionIndex] = quizData[difficulty][questionIndex].answers[answerIndex].description
    setDescriptions(newDescriptions)
  }

  const isQuizComplete = (difficulty: 'easy' | 'medium' | 'hard') => {
    return quizData[difficulty].every((_, index) => 
      Array.from(clickedAnswers[difficulty]).some(id => Math.floor(id / 4) === index)
    )
  }

  const handleSubmit = (difficulty: 'easy' | 'medium' | 'hard') => {
    const score = Array.from(clickedAnswers[difficulty]).reduce((acc, answerId) => {
      const questionIndex = Math.floor(answerId / 4)
      const answerIndex = answerId % 4
      return acc + (quizData[difficulty][questionIndex].answers[answerIndex].correct ? 1 : 0)
    }, 0)
    
    setScores(prev => ({
      ...prev,
      [difficulty]: score
    }))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'hard': return 'text-red-500'
      default: return ''
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Multi-Level Quiz</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>

        <Tabs defaultValue="easy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="easy" className="space-x-2">
              Easy
              <Badge variant="secondary" className={getDifficultyColor('easy')}>
                {scores.easy !== null ? `${scores.easy}/${quizData.easy.length}` : ''}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="medium" className="space-x-2">
              Medium
              <Badge variant="secondary" className={getDifficultyColor('medium')}>
                {scores.medium !== null ? `${scores.medium}/${quizData.medium.length}` : ''}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="hard" className="space-x-2">
              Hard
              <Badge variant="secondary" className={getDifficultyColor('hard')}>
                {scores.hard !== null ? `${scores.hard}/${quizData.hard.length}` : ''}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {(Object.keys(quizData) as Array<'easy' | 'medium' | 'hard'>).map((difficulty) => (
            <TabsContent key={difficulty} value={difficulty} className="space-y-6">
              {quizData[difficulty].map((question, questionIndex) => (
                <Card key={questionIndex} className="border-2 transition-all duration-300 hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-xl">{question.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.answers.map((answer, answerIndex) => {
                        const isClicked = clickedAnswers[difficulty].has(questionIndex * 4 + answerIndex)
                        const isCorrect = answer.correct && isClicked
                        
                        return (
                          <Button
                            key={answerIndex}
                            onClick={() => handleAnswerClick(difficulty, questionIndex, answerIndex)}
                            disabled={Array.from(clickedAnswers[difficulty]).some(id => Math.floor(id / 4) === questionIndex)}
                            variant={isClicked ? (isCorrect ? "default" : "secondary") : "outline"}
                            className={`h-auto min-h-[3rem] p-4 text-left justify-start transition-all duration-300
                              ${isClicked ? (isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'hover:border-primary'}
                            `}
                          >
                            {answer.text}
                          </Button>
                        )
                      })}
                    </div>
                    {descriptions[difficulty][questionIndex] && (
                      <CardDescription className={`p-4 rounded-lg transition-all duration-300 ${
                        clickedAnswers[difficulty].has(questionIndex * 4 + quizData[difficulty][questionIndex].answers.findIndex(a => a.correct))
                          ? 'bg-green-500/10 text-green-700 dark:text-green-300'
                          : 'bg-red-500/10 text-red-700 dark:text-red-300'
                      }`}>
                        {descriptions[difficulty][questionIndex]}
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {isQuizComplete(difficulty) && scores[difficulty] === null && (
                <Button 
                  onClick={() => handleSubmit(difficulty)}
                  className="w-full transition-all duration-300 text-lg py-6"
                >
                  Submit {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz
                </Button>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

