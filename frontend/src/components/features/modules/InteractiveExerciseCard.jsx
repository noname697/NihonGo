import clsx from "clsx";
import { CheckCircle, XCircle } from "lucide-react";
import { useActionState, useState } from "react";
import { answerExercise } from "../../../api/progress.api";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { Badge } from "../../ui/Badge";
import { SubmitButton } from "../../ui/SubmitButton";

const initialState = {
  error: null,
  data: null,
};

export const InteractiveExerciseCard = ({ exercise, onAnswered }) => {
  const hasOptions =
    Array.isArray(exercise.options) && exercise.options.length > 0;

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");

  const answerToSubmit = hasOptions ? selectedAnswer : typedAnswer;

  const getLessonProgressFromResponse = (data) => {
    return (
      data?.lesson_progress ??
      data?.lessonProgress ??
      data?.progress ??
      data?.data?.lesson_progress ??
      null
    );
  };

  const submitAnswerAction = async (previousState, formData) => {
    try {
      const answer = String(formData.get("answer") || "").trim();

      if (!answer) {
        return {
          error: "Choose or type an answer before submitting.",
          data: previousState.data,
        };
      }

      const data = await answerExercise(exercise.id, answer);

      onAnswered?.(data);

      return {
        error: null,
        data,
      };
    } catch (error) {
      return {
        error: getApiErrorMessage(error),
        data: previousState.data,
      };
    }
  };

  const [state, formAction] = useActionState(submitAnswerAction, initialState);

  const result = state.data?.result;
  const lessonProgress = getLessonProgressFromResponse(state.data);

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-5 flex items-center justify-baseline gap-4">
        <Badge variant="zinc">{exercise.type}</Badge>

        <span className="text-xs font-bold text-zinc-400">
          Exercise #{exercise.position}
        </span>
      </div>

      <h3 className="text-lg font-black leading-8 text-zinc-950 dark:text-white">
        {exercise.question}
      </h3>

      <form action={formAction} className="mt-5 space-y-5">
        {hasOptions ? (
          <>
            <input type="hidden" name="answer" value={selectedAnswer} />

            <div className="grid gap-3 sm:grid-cols-2">
              {exercise.options.map((option) => (
                <ExerciseOptionButton
                  key={option.id}
                  option={option}
                  isSelected={selectedAnswer === option.text}
                  onSelect={() => setSelectedAnswer(option.text)}
                />
              ))}
            </div>
          </>
        ) : (
          <div>
            <label
              htmlFor={`exercise-${exercise.id}-answer`}
              className="mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Your answer
            </label>
            <input
              id={`exercise-${exercise.id}-answer`}
              name="answer"
              value={typedAnswer}
              onChange={(event) => setTypedAnswer(event.target.value)}
              placeholder="Type your answer..."
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-nihon-red focus:ring-4 focus:ring-red-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-sakura dark:focus:ring-rose-950"
            />
          </div>
        )}

        {state.error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-950 dark:bg-red-950/40 dark:text-red-200">
            {state.error}
          </div>
        )}

        <SubmitButton
          loadingText="Checking answer..."
          disabled={!answerToSubmit.trim()}
        >
          {result ? "Submit again" : "Submit answer"}
        </SubmitButton>
      </form>

      {result && <ExerciseResult result={result} />}

      {lessonProgress && <LessonProgressMini progress={lessonProgress} />}
    </article>
  );
};

const ExerciseOptionButton = ({ option, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "rounded-2xl border px-4 py-3 text-left text-sm font-bold transition",
        isSelected
          ? "border-nihon-red bg-red-50 text-nihon-red ring-4 ring-red-100 dark:border-sakura dark:bg-red-950/30 dark:text-sakura dark:ring-red-950"
          : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-red-200 hover:bg-red-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-red-950 dark:hover:bg-red-950/30",
      )}
    >
      {option.text}
    </button>
  );
};

const ExerciseResult = ({ result }) => {
  return (
    <div
      className={clsx(
        "mt-5 rounded-2xl border p-4",
        result.is_correct
          ? "border-green-200 bg-green-50 text-green-800 dark:border-green-950 dark:bg-green-950/30 dark:text-green-200"
          : "border-red-200 bg-red-50 text-red-800 dark:border-red-950 dark:bg-red-950/30 dark:text-red-200",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {result.is_correct ? (
            <CheckCircle size={20} />
          ) : (
            <XCircle size={20} />
          )}
        </div>

        <div>
          <p className="font-black">
            {result.is_correct ? "Correct answer!" : "Not quite."}
          </p>

          <p className="mt-1 text-sm">
            Your answer: <strong>{result.submitted_answer}</strong>
          </p>

          {!result.is_correct && (
            <p className="mt-1 text-sm">
              Correct answer: <strong>{result.correct_answer}</strong>
            </p>
          )}

          {result.explanation && (
            <p className="mt-3 text-sm leading-6">{result.explanation}</p>
          )}

          <p className="mt-3 text-xs opacity-80">
            Attempts: {result.attempts_count}
          </p>
        </div>
      </div>
    </div>
  );
};

const LessonProgressMini = ({ progress }) => {
  return (
    <div className="mt-5 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-zinc-950 dark:text-white">
            Lesson progress
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {progress.completed_exercises_count} of {progress.total_exercises}{" "}
            correct
          </p>
        </div>

        <strong className="text-lg font-black text-nihon-red">
          {Number(progress.score || 0).toFixed(0)}%
        </strong>
      </div>

      {progress.is_completed && (
        <p className="mt-3 rounded-full  bg-green-50 px-3 py-2 text-sm font-bold text-green-700 dark:bg-green-950/30 dark:text-green-200">
          Lesson completed!
        </p>
      )}
    </div>
  );
};
