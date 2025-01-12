import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Options } from "@prisma/client";
import { useEffect, useState } from "react";
import { getOptionsByQuestionId } from "@/lib/db/crudOptions";

interface QuestionComponentProps {
  questionId: string;
  question: string;
}

const QuestionComponent = ({
  questionId,
  question,
}: QuestionComponentProps) => {
    const [options, setOptions] = useState<Options[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");
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
        setSelectedOption(optionId);
    };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOption}
          onValueChange={onOptionSelect}
          className="space-y-3"
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent ${
                selectedOption === option.id ? 'bg-accent border-primary' : ''
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
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
