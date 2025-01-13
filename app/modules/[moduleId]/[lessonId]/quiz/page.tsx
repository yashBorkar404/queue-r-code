"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getQuestionsByLessonId } from "@/lib/db/crudQuestions";
import { Questions, Difficulty } from "@prisma/client";
import QuestionComponent from "./QuestionComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const QuizPage = () => {
  const params = useParams<{ moduleId: string; lessonId: string }>();
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [easyScore, setEasyScore] = useState<number>(0);
  const [mediumScore, setMediumScore] = useState<number>(0);
  const [hardScore, setHardScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await getQuestionsByLessonId(params.lessonId);
      if (res.success) {
        setQuestions(res.data as Questions[]);
      }
    };
    fetchQuiz();
  }, [params.lessonId]);

  const easyQuestions = questions.filter(
    (q) => q.difficulty === Difficulty.Easy
  );
  const mediumQuestions = questions.filter(
    (q) => q.difficulty === Difficulty.Medium
  );
  const hardQuestions = questions.filter(
    (q) => q.difficulty === Difficulty.Hard
  );

  return (
    <>
      <Tabs defaultValue="easy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="easy">Easy {isSubmitted ?  `Score: ${easyScore}/${easyQuestions.length}`: ''}</TabsTrigger>
          <TabsTrigger value="medium">
            Medium {isSubmitted ? `Score: ${mediumScore}/${mediumQuestions.length}` : ''}
          </TabsTrigger>
          <TabsTrigger value="hard">Hard {isSubmitted ? `Score: ${hardScore}/${hardQuestions.length}` : ''}</TabsTrigger>
        </TabsList>

        <TabsContent value="easy">
          <div className="space-y-4">
            {easyQuestions.map((question) => (
              <QuestionComponent
                key={question.id}
                questionId={question.id}
                setScore={setEasyScore}
                question={question.question}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medium">
          <div className="space-y-4">
            {mediumQuestions.map((question) => (
              <QuestionComponent
                key={question.id}
                questionId={question.id}
                setScore={setMediumScore}
                question={question.question}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hard">
          <div className="space-y-4">
            {hardQuestions.map((question) => (
              <QuestionComponent
                key={question.id}
                questionId={question.id}
                setScore={setHardScore}
                question={question.question}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <Button className="mx-auto" onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default QuizPage;
