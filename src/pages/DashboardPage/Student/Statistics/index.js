import React, { useEffect } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

function StatisticsStudent() {
  const { student } = useSelector((state) => state.student);
  const { name, quizs } = student;

  useEffect(() => {
    if (quizs?.length > 0) {
      const calculateTimeSpent = (quiz) => {
        return quiz.timeTaken / 60;
      };

      const subjectsData = {};
      quizs.forEach((quiz) => {
        if (!subjectsData[quiz.subject]) {
          subjectsData[quiz.subject] = {
            accuracySum: 0,
            scoreSum: 0,
            attemptsCount: 0,
            totalTimeSpent: 0,
          };
        }
        subjectsData[quiz.subject].accuracySum += parseFloat(quiz.accuracy);
        subjectsData[quiz.subject].scoreSum += quiz.score;
        subjectsData[quiz.subject].attemptsCount++;
        subjectsData[quiz.subject].totalTimeSpent += calculateTimeSpent(quiz);
      });

      const pieData = Object.keys(subjectsData).map((subject) => ({
        subject,
        accuracy:
          subjectsData[subject].accuracySum /
          subjectsData[subject].attemptsCount,
        score:
          subjectsData[subject].scoreSum / subjectsData[subject].attemptsCount,
        attempts: subjectsData[subject].attemptsCount,
        totalTimeSpent:
          subjectsData[subject].totalTimeSpent /
          subjectsData[subject].attemptsCount,
      }));

      d3.select("#chartContainer").selectAll("*").remove();

      const width = 300;
      const height = 300;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const pie = d3.pie().value((d) => d.accuracy);

      const svg = d3
        .select("#chartContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const arcs = svg.selectAll("arc").data(pie(pieData)).enter().append("g");

      arcs
        .append("path")
        .attr("fill", (d, i) => color(i))
        .attr("d", arc)
        .on("mouseover", (event, d) => {
          const tooltip = d3.select("#tooltip");
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(
              `<strong>Subject:</strong> ${d.data.subject}<br/>
               <strong>Average Accuracy:</strong> ${d.data.accuracy.toFixed(
                 2
               )}%<br/>
               <strong>Average Score:</strong> ${d.data.score.toFixed(2)}<br/>
               <strong>Tests Attempted:</strong> ${d.data.attempts}<br/>
               <strong>Average Time Spent:</strong> ${d.data.totalTimeSpent.toFixed(
                 2
               )} minutes`
            )
            .style("left", event.pageX + "px")
            .style("top", event.pageY + "px");
        })
        .on("mouseout", () => {
          const tooltip = d3.select("#tooltip");
          tooltip.transition().duration(500).style("opacity", 0);
        });

      arcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text((d) => d.data.subject);
    }
  }, [quizs]);

  if (quizs?.length > 0) {
    return (
      <>
        <div className="flex h-[100vh]">
          <StudentSideBar />
          <div className="flex-1 mt-8 px-6 overflow-auto">
            <div className="max-w-6xl mx-auto w-full">
              <div className="bg-gray-800/60 rounded-xl p-6 shadow-xl border border-gray-700 mb-6">
                <h2 className="text-white text-2xl font-bold mb-6">
                  {name}'s Analytics
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-indigo-100">Average Score</h3>
                        <p className="text-3xl font-bold mt-2">{student.averageScore}</p>
                      </div>
                      <div className="bg-white/20 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-100">Average Accuracy</h3>
                        <p className="text-3xl font-bold mt-2">{student.averageAccuracy}%</p>
                      </div>
                      <div className="bg-white/20 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-7.5-3L12 9m0 0l3.75-3.75M12 9l-3.75 3.75M12 9l3.75 3.75" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700/30 rounded-xl p-6">
                  <h3 className="text-white text-xl font-bold mb-4 text-center">Performance by Subject</h3>
                  <div className="flex justify-center">
                    <div id="chartContainer"></div>
                  </div>
                  <div
                    id="tooltip"
                    className="absolute bg-gray-900 border border-gray-600 p-3 rounded-lg pointer-events-none shadow-xl text-white text-sm z-10"
                    style={{ opacity: 0 }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex h-[100vh]">
        <StudentSideBar />
        <div className="flex-1 mt-8 px-6 overflow-auto">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center justify-center h-[60vh] w-full">
              <div className="text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-gray-700/60 flex items-center justify-center mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <p className="text-white text-xl font-semibold">No quizzes attempted yet</p>
                <p className="text-gray-300 mt-2">Take some quizzes to see your analytics here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatisticsStudent;
