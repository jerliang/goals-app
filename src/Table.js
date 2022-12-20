import React, { useState } from "react";
import data from "./test.json"
import { nanoid } from 'nanoid';

export default function Table() {

    const [goals, setGoals] = useState(data);
    const [newGoal, setNewGoal] = useState({
        goal: '',
    })

    const addNewGoal = (event) => {
        event.preventDefault();
        
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = { ...newGoal};
        newFormData[fieldName] = fieldValue;
        
        setNewGoal(newFormData);
    }

    const createNewGoal = (event) => {
        event.preventDefault();

        const goal = {
            id: nanoid(),
            goal: newGoal.goal,
            completed: []
        };

        const newGoals = [...goals, goal];
        setGoals(newGoals);
    };

    function getMaxDays() {
        const days = [];
        for (let i = 0; i < data.length; i++) {
            days.push(data[i]["completed"].length);
        }
        return Math.max(...days);
    };

    let maxDays = getMaxDays();
    const days = [];
    for (let i = 1; i < maxDays + 1; i++) {
        days.push(i);
    }

    return (
        <div>
            <form onSubmit={createNewGoal}>
                <input 
                    type="text"
                    name="goal"
                    required="required"
                    placeholder="Enter new goal"
                    onChange={addNewGoal}
                />
                <button type="submit">Add</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        {days.map((num) => (
                            <th>{num}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {goals.map((goal) => (
                        <tr>
                            <td>{goal.goal}</td>
                            {goal.completed.map((status) => (
                                <td>
                                    <button>{status ? "Y" : "N"}</button>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};