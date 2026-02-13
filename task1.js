#!/usr/bin/env node
// Task Tracker CLI
// Usage: node task-cli.js <command> [...args]

const fs = require("fs");
const path = require("path");

const TASKS_FILE = path.join(process.cwd(), "tasks.json");

// function loadTasks() {
//     if (!fs.existsSync(TASKS_FILE)) return [];
//     try {
//         const data = fs.readFileSync(TASKS_FILE, 'utf8');
//         return JSON.parse(data);
//     } catch (e) {
//         console.error('Error reading tasks file:', e.message);
//         process.exit(1);
//     }
// }

// function saveTasks(tasks) {
//     try {
//         fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
//     } catch (e) {
//         console.error('Error writing tasks file:', e.message);
//         process.exit(1);
//     }
// }

// function getNextId(tasks) {
//     return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
// }

// function addTask(description) {
//     if (!description) {
//         console.error('Description is required.');
//         process.exit(1);
//     }
//     const tasks = loadTasks();
//     const now = new Date().toISOString();
//     const task = {
//         id: getNextId(tasks),
//         description,
//         status: 'todo',
//         createdAt: now,
//         updatedAt: now
//     };
//     tasks.push(task);
//     saveTasks(tasks);
//     console.log(`Task added successfully (ID: ${task.id})`);
// }

// function listTasks(status) {
//     const tasks = loadTasks();
//     let filtered = tasks;
//     if (status) {
//         filtered = tasks.filter(t => t.status === status);
//     }
//     if (!filtered.length) {
//         console.log('No tasks found.');
//         return;
//     }
//     filtered.forEach(t => {
//         console.log(`[${t.id}] (${t.status}) ${t.description} | Created: ${t.createdAt} | Updated: ${t.updatedAt}`);
//     });
// }

const [, , command, ...args] = process.argv;

const getTasks = async () => {
  let data = fs.readFileSync(TASKS_FILE, "utf8");
  return JSON.parse(data);
};

const addTask = async (task) => {
  let tasks = await getTasks();

  tasks.push({
    id: crypto.randomUUID(),
    description: task,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

switch (command) {
  case "add":
    addTask(args.join(" "));
    break;
  case "list":
    const tasks = getTasks();
    console.log(tasks);
    break;
  default:
    console.log("Usage: task-cli <add|list> [args]");
    break;
}
