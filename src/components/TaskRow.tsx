"use client";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import ConfettiExplosion from "react-confetti-explosion";
import React, { useState } from "react";
import Image from "next/image";
interface Task {
  id: number;
  title: string;
  description: string;
  userId: number;
  created_at: string;
  due_date: Date | string;
  updatedAt: Date;
  finished_date?: string;
  status?: string;
}
const TaskRow = ({
  removeTask,
  filter,
  task,
  openUpdateForm,
  updateTask,
}: {
  removeTask: Function;
  filter: string;
  task: Task;
  openUpdateForm: Function;
  updateTask: Function;
}) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  console.log(task);
  const [isExploding, setIsExploding] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const title = task.title;
  const description = task.description;
  const dateCreated = new Date(task.created_at);
  const dateDue = new Date(task.due_date);
  dateDue.setHours(0, 0, 0, 0);
  const finishedDate = task.finished_date
    ? new Date(task.finished_date).toLocaleDateString()
    : "In Progress";

  const handleRemoveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    removeTask(task.id, task.status);
  };

  const handleUpdateClick = (event: React.MouseEvent) => {
    openUpdateForm(task);
  };

  const handleToggleTask = (event: React.MouseEvent) => {
    event.stopPropagation();
    const stringToday = today.toLocaleDateString();
    const taskPayload: {
      id: number;
      finished: boolean;
      stringToday: string;
    } = {
      ...task,
      finished: true,
      stringToday,
    };
    if (finishedDate === "In Progress" || finishedDate === "Past Due") {
      taskPayload.finished = true;
      setIsExploding(true);
    } else {
      taskPayload.finished = false;
    }

    updateTask(taskPayload);
    setTimeout(setIsExplodingToFalse, 7000);
  };

  const setIsExplodingToFalse = () => {
    setIsExploding(false);
  };

  function filterTasks() {}

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={handleUpdateClick}
      >
        {/* future implementation for getting a graph for api call */}
        <TableCell align="left">
          <span
            className={` 
            ml-4 whitespace-nowrap
            ${
              task.status == "Due Today" || task.status == "Upcoming"
                ? "text-orange-300"
                : task.status == "Completed"
                ? "text-green-600"
                : "text-amber-600"
            }`}
          >
            {task.status}&nbsp;&nbsp;&nbsp;
          </span>
        </TableCell>
        <TableCell align="left">
          {dateDue.toLocaleDateString()}&nbsp;&nbsp;&nbsp;
        </TableCell>
        <TableCell width={500} align="left">
          {title}&nbsp;&nbsp;&nbsp;
        </TableCell>
        <TableCell align="left">
          {dateCreated.toLocaleDateString()}&nbsp;&nbsp;&nbsp;
        </TableCell>

        <TableCell align="left">
          {isExploding && <ConfettiExplosion zIndex={11} />}

          <Checkbox
            sx={{ zIndex: 0 }}
            {...label}
            onClick={handleToggleTask}
            checked={task.status === "Completed" ? true : false}
          />
        </TableCell>
        <TableCell align="left">
          <Image
            className="pb-0 mr-3 cursor-pointer"
            src="trash.svg"
            alt="trash svg"
            width={24}
            height={24}
            onClick={handleRemoveClick}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default TaskRow;
