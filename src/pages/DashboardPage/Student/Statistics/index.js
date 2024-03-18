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
        <div className="flex">
          <StudentSideBar />
          <div className="w-full px-5">
            <h2 className="text-2xl font-bold text-white mt-4">
              {name}'s Analytics
            </h2>
            <div className="flex items-center mt-12 gap-4">
              <div
                id="averageScore"
                className="flex-1 bg-gray-100 p-4 rounded-md"
              >
                <h3 className="text-lg font-semibold">Average Score</h3>
                <p>{student.averageScore}</p>
              </div>
              <div
                id="averageAccuracy"
                className="flex-1 bg-gray-100 p-4 rounded-md"
              >
                <h3 className="text-lg font-semibold">Average Accuracy</h3>
                <p>{student.averageAccuracy}%</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center h-[80%]">
              <div id="chartContainer"></div>
              <div
                id="tooltip"
                className="absolute bg-gray-100 border p-2 rounded-md pointer-events-none"
                style={{ opacity: 0 }}
              ></div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex">
        <StudentSideBar />
        <div className="flex items-center justify-center h-[60vh] w-full">
          <p className="text-white text-center text-xl">
            No quizzes attempted yet ✨
          </p>
        </div>
      </div>
    );
  }
}

export default StatisticsStudent;
