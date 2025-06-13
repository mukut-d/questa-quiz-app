// import { notFound } from "next/navigation";
// import { connectToDatabase } from "@/lib/mongodb";
// import { ObjectId } from "mongodb";

// export default async function ViewQuizPage({ params }) {
//   const { id } = params;

//   const { db } = await connectToDatabase();

//   let quiz;

//   try {
//     quiz = await db.collection("quizzes").findOne({ _id: new ObjectId(id) });

//     console.log(JSON.stringify(quiz, null, 2));

//     if (!quiz) return notFound();
//   } catch (error) {
//     console.error("Failed to fetch quiz:", error);
//     return notFound();
//   }

//   return (
//     <div className="max-w-3xl mx-auto py-12 px-4 ">
//       <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
//       <p className="text-gray-600 mb-6">{quiz.description}</p>

//       <div className="space-y-8">
//         {quiz.questions.map((q, index) => (
//           <div key={q.id} className="p-4 border rounded-md shadow-sm bg-white">
//             <h2 className="text-lg font-semibold">
//               Q{index + 1}. {q.question}
//             </h2>

//             {q.type === "text" ? (
//               <p className="text-sm text-gray-500 mt-2">Answer: __________</p>
//             ) : (
//               <ul className="mt-2 space-y-1">
//                 {q.options.map((opt, i) => (
//                   <li key={i} className="text-sm text-gray-700">
//                     - {opt}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ViewQuizPage({}) {
  const { id } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState({});
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch(`/api/quizes`);

        const data = await response.json();

        setQuiz(data?.filter((item) => item?._id === id)[0]);

        if (!data) return setError(true);
      } catch (e) {
        console.error("Failed to fetch quiz:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading quiz...</div>;
  if (error) return notFound();

  const handleChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    console.log(id);
    console.log(JSON.stringify(answers, null, 2));

    if (!id || id.length !== 24) {
      toast.error("Invalid quiz ID.");
      return;
    }

    if (!answers || Object.keys(answers).length === 0) {
      toast.error("Please answer at least one question.");
      return;
    }

    try {
      const response = await fetch("/api/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: id,
          answers,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Response saved:" + JSON.stringify(result, null, 2));
        toast.success("Answers submitted successfully!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        console.error("❌ Failed to submit:" + result.error);
        toast.error("Failed to submit answers.");
      }
    } catch (err) {
      console.error("❌ Submit error:" + err);
      toast.error("Something went wrong!");
    }
  };

  const goBackhome = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-gray-600 mb-6">{quiz.description}</p>

      <div className="space-y-8">
        {quiz?.questions?.map((q, index) => (
          <div key={index} className="p-4 border rounded-md shadow-sm bg-white">
            <h2 className="text-lg font-semibold">
              Q{index + 1}. {q.question}
            </h2>

            {q.type === "text" ? (
              <input
                type="text"
                className="mt-2 w-full p-2 border rounded-md"
                placeholder="Your answer"
                value={answers[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            ) : (
              <div className="mt-2 space-y-2">
                {q.options.map((opt, i) => (
                  <label key={i} className="block">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleChange(q.id, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit Answers
      </button>
      <button
        onClick={goBackhome}
        className="mt-8 mx-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Cancel
      </button>
      <Toaster />
    </div>
  );
}
