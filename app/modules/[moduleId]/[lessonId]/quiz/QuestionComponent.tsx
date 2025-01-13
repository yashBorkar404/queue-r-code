import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Options } from "@prisma/client";
import { useEffect, useState } from "react";
import { getOptionsByQuestionId } from "@/lib/db/crudOptions";

interface QuestionComponentProps {
  key: string;
  questionId: string;
  question: string;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionComponent = ({
  questionId,
  question,
  setScore,
}: QuestionComponentProps) => {
  const [options, setOptions] = useState<Options[]>([]);
  const [selectedOption, setSelectedOption] = useState<Options | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      const res = await getOptionsByQuestionId(questionId);
      if (res.success) {
        setOptions(res.data as Options[]);
      }
    };
    fetchOptions();
  }, [questionId]);

  const onOptionSelect = (optionId: string) => {
    const option = options.find((option) => option.id === optionId);
    if (option) {
      setSelectedOption(option);
      setScore((prevScore) => option.isCorrect ? prevScore + 1 : prevScore);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOption?.id}
          onValueChange={onOptionSelect}
          className="grid grid-cols-2 gap-2"
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent ${
                selectedOption?.id === option.id ? "bg-accent border-primary" : ""
              }`}
            >
              <RadioGroupItem
                onChange={() => onOptionSelect(option.id)}
                value={option.id}
                id={option.id}
              />
              <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                {option.option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default QuestionComponent;
