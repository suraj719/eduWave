import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatisticsStudent = () => {
  const { student } = useSelector((state) => state.student);
  const [quizData, setQuizData] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    if (student?.quizs && student.quizs.length > 0) {
      setQuizData(student.quizs);
    }
  }, [student]);

  const transformDataForPieChart = (quizs) => {
    const data = quizs.map((quiz) => {
      const totalQuestions = quiz.quiz.questions.length;
      const correctAnswers = quiz.quiz.questions.filter(
        (question) => question.selectedOption === question.answer
      ).length;
      const incorrectAnswers = totalQuestions - correctAnswers;
      const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(2);

      return {
        name: quiz.title,
        accuracy: parseFloat(accuracy),
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        total: totalQuestions,
      };
    });

    return data;
  };

  const data = transformDataForPieChart(quizData);

  const handleLegendClick = (entry) => {
    setSelectedQuiz(entry.name);
  };

  const renderCustomizedLabel = ({
    name,
    correct,
    incorrect,
    total,
    accuracy,
  }) => (
    <div
      className="text-white"
      style={{
        color: "white",
        padding: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "5px",
      }}
    >
      <p style={{ margin: "5px 0", fontWeight: "bold" }}>{name}</p>
      <p style={{ margin: "5px 0" }}>Correct: {correct}</p>
      <p style={{ margin: "5px 0" }}>Incorrect: {incorrect}</p>
      <p style={{ margin: "5px 0" }}>Total: {total}</p>
      <p style={{ margin: "5px 0" }}>Accuracy: {accuracy}%</p>
    </div>
  );

  const handlePieClick = (entry) => {
    setSelectedQuiz(entry.payload.name);
  };

  return (
    <>
      <div className="flex">
        <StudentSideBar />
        <div>
          <div className="flex items-center justify-center" >
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="accuracy"
                  label={({ name, percent }) =>
                    `${name} - ${(percent * 100).toFixed(2)}%`
                  }
                  onClick={handlePieClick}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend onClick={handleLegendClick} />
              </PieChart>
            </ResponsiveContainer>
            {selectedQuiz && (
              <div className="text-white" style={{ marginTop: "20px" }}>
                <h3>Selected Quiz Details</h3>
                <p>Name: {selectedQuiz}</p>
                {data.map((entry, index) => {
                  if (entry.name === selectedQuiz) {
                    return (
                      <div key={index}>
                        <p>Correct: {entry.correct}</p>
                        <p>Incorrect: {entry.incorrect}</p>
                        <p>Total: {entry.total}</p>
                        <p>Accuracy: {entry.accuracy}%</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsStudent;
