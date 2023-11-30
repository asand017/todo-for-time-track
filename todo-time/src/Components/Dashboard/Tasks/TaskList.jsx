import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { DateTime } from "luxon";
import { isToday, parseISO } from "date-fns";
import Task from "./Task";

export default function TaskList(props) {
  const { isSuccess, isLoading, isError, data, error } = props.query;
  const [todosByDate, setTodosByDate] = useState([]);

  useEffect(() => {
    if (data) {
      let dates = {};
      data.data.forEach((t) => {
        let date = DateTime.fromISO(t.day).toLocaleString(DateTime.DATE_SHORT);
        if (!(date in dates)) {
          dates[date] = [];
        }

        dates[date].push(t);
      });
      const d = Object.keys(dates).map((key) => ({
        date: key,
        tasks: dates[key],
      }));

      // sort dated tasks by calendar day
      d.sort(function (a, b) {
        return (
          DateTime.fromFormat(a.date, "D").ts -
          DateTime.fromFormat(b.date, "D").ts
        );
      });

      setTodosByDate(d);
    }
  }, [props.query, isSuccess, data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    console.log(error);
    return <span>Error: {error.message}</span>;
  }

  return (
    <Stack spacing={3}>
      <>
        {todosByDate.map((data) => {
          return (
            <div key={data.date}>
              <h2 key={data.date}>{data.date}</h2>
              <Stack spacing={2}>
                {data.tasks.map((todo) => {
                  return (
                    <Task
                      key={todo.id}
                      no={todo.id}
                      name={todo.name}
                      description={todo.description}
                      priority={todo.priority}
                      start={todo.start_time}
                      end={todo.end_time}
                      day={todo.day}
                      isToday={isToday(parseISO(todo.day))}
                      complete={todo.complete}
                    />
                  );
                })}
              </Stack>
            </div>
          );
        })}
      </>
    </Stack>
  );
}
