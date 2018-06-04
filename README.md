# NodeJS Work Sample (roster editor)

Welcome to the Digication work sample for NodeJS developers! This is our way to get some experience working with you and to get an idea your level of NodeJS skills and knowledge about common npm packages. There is no official time-limit for this exercise, but you should finish it within a week. We encourage you to take the time you need in order to provide quality work that best reflects your skills.

## Context

A new course roster editor is needed! Imagine we are building an app for a university, where we need to provide a way for administrators to manage who should be teaching or taking a course. The frontend will be implemented at a later time. Today our goal is to create a basic version of the backend.

## Data Models

- The `Course` has `id` and `name` fields.
- The `User` consists of `id`, `name` and `email`.

### Relationships

The model relationship in this example is kept as simple as possible, think of it this way:
- Courses have many users assigned of which some can be flagged as faculty.
- Students can be enrolled in many courses

## API methods

- Add the necessary functionality to add/remove users to/from courses. This also allows the flagging of a user as faculty of the course. **Please make sure that concurrent requests are processed in a sequential manner**, so only one such request should be processed at a time.
- Provide a way to get the users enrolled in a given course (and their faculty status) and another one which returns users not enrolled yet.

## Technical Requirements

You have to use NodeJS >8.0, expressjs 4.x and a relational database like SQLite, MySQL or Postgres. The setup for tests already includes SQLite but feel free to use a different one. Regarding an ORM and SQL query builder we have selected `sequelize` but the final choice is up to you.

Since your backend app will be used by other developers, some documentation of the API and some unit tests will be much appreciated by your future colleagues. Please make sure to apply common design patterns and best practices.

Please also point out which recommendations regarding security would you have, given that React will be used to build the frontend?

## Encouragement

Digication team members have worked through this work sample to make sure we are not asking for too much of your time. This shouldn't take you longer than a couple of hours depending on your knowledge and the bells and whistles you want to add.
We are looking forward to hearing from you!
