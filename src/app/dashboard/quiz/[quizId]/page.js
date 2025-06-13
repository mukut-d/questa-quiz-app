import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function ViewQuizPage({ params }) {
  const { id } = params;

  const { db } = await connectToDatabase();

  let quiz;

  try {
    quiz = await db.collection("quizzes").findOne({ _id: new ObjectId(id) });

    if (!quiz) return notFound();
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 ">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-gray-600 mb-6">{quiz.description}</p>

      <div className="space-y-8">
        {quiz.questions.map((q, index) => (
          <div key={q.id} className="p-4 border rounded-md shadow-sm bg-white">
            <h2 className="text-lg font-semibold">
              Q{index + 1}. {q.question}
            </h2>

            {q.type === "text" ? (
              <p className="text-sm text-gray-500 mt-2">Answer: __________</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {q.options.map((opt, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    - {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
