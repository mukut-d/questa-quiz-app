"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResponsesPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  console.log("Id " + quizId);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/quizes/${quizId}/combined`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch data");
        }

        setQuiz(data.quiz);
        setResponses(data.responses);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (quizId) fetchData();
  }, [quizId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error || !quiz)
    return (
      <div className="p-6 text-center text-red-600">
        Error loading responses.
      </div>
    );

  console.log(JSON.stringify(quiz, null, 2));
  console.log(JSON.stringify(responses, null, 2));

  const goHomeHandler = () => {
    router.push("/");
  };

  const goBackHandler = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Responses for "{quiz.title}"</h1>
      <p className="text-gray-600 mb-6">{responses.length} total submissions</p>
      {responses.length === 0 ? (
        <div className="text-gray-500">No responses yet.</div>
      ) : (
        <div className="space-y-6">
          {responses.map((res, i) => (
            <div
              key={res._id}
              className="p-4 border rounded-md bg-white shadow-sm"
            >
              <h2 className="font-semibold mb-2">Response #{i + 1}</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {quiz.questions.map((q, idx) => (
                  <li key={q.id}>
                    <strong>Q{idx + 1}:</strong> {q.question}
                    <br />
                    <span className="ml-4">
                      <strong>Answer:</strong>{" "}
                      {res.answers[q.id] || <em>Not answered</em>}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-2">
                Submitted at: {new Date(res.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="m-4">
        <button
          onClick={goHomeHandler}
          className="border p-2 rounded-md hover:bg-blue-500 hover:text-white"
        >
          Home
        </button>
        <button
          onClick={goBackHandler}
          className="border p-2 rounded-md hover:bg-blue-500 hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
}
