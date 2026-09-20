# Client Project Tracker

A simple full-stack Client Project Tracker developed as part of the Full Stack Developer Technical Assessment.

The application allows project managers to create, view, update, and delete client projects while tracking project status, priority, start dates, and due dates.

## Tech Stack

### Backend

* Laravel 13
* PHP 8.5
* MySQL
* Laravel REST API
* Eloquent ORM

### Frontend

* React 19
* TypeScript
* Tailwind CSS 4
* Axios
* Vite

## Features

* View all client projects
* Create new projects
* Edit existing projects
* Delete projects
* Project status management
* Project priority management
* Start and due date management
* Backend validation
* Frontend validation and error handling
* Responsive interface
* Database seeding with sample project data

## Project Statuses

* Planning
* In Progress
* On Hold
* Completed

## Project Priorities

* Low
* Medium
* High

## Architecture

The application uses a separated frontend and backend architecture.

```text
React + TypeScript
       |
     Axios
       |
Laravel REST API
       |
    Eloquent
       |
     MySQL
```

The Laravel backend is responsible for API endpoints, validation, database operations, and API responses.

The React frontend is responsible for the user interface, form handling, user interactions, and communication with the REST API.

This separation keeps frontend and backend responsibilities clear and allows the API to potentially be consumed by other clients in the future.

## API Endpoints

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/api/projects`      | Get all projects     |
| GET    | `/api/projects/{id}` | Get a single project |
| POST   | `/api/projects`      | Create a project     |
| PUT    | `/api/projects/{id}` | Update a project     |
| DELETE | `/api/projects/{id}` | Delete a project     |

## Validation

The backend validates the following:

* Client name is required.
* Project name is required.
* Status must be one of the supported values.
* Priority must be one of the supported values.
* Due date cannot be earlier than the start date.
* Invalid API requests return validation errors.

## Requirements

Before running the project, make sure the following are installed:

* PHP 8.5+
* Composer
* Node.js
* npm
* MySQL

## Installation

Clone the repository:

```bash
git clone https://github.com/iammark989/client-project-tracker
cd client-project-tracker
```

Install PHP dependencies:

```bash
composer install
```

Install frontend dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

## Database Configuration

Create a MySQL database and update the database settings in `.env`.

Example:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=client_project_tracker
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations and seed the sample projects:

```bash
php artisan migrate --seed
```

The database seeder includes sample project records for testing the application.

## Running the Application

Start the Laravel development server:

```bash
php artisan serve
```

In another terminal, start the Vite development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:8000
```

## Production Build

To build the frontend assets:

```bash
npm run build
```

## Technical Decisions

Laravel Form Request classes are used to keep validation rules separate from controller logic.

Laravel API Resources are used to provide a consistent API response structure.

The React application separates reusable components, API service functions, and TypeScript types to keep the frontend organized and maintainable.

Axios is used for communication between the React frontend and Laravel REST API.

## AI Tool Disclosure

ChatGPT was used as an AI development assistant during the assessment for implementation guidance, code structure suggestions, debugging assistance, validation guidance, and technical review.

The final application was integrated, tested, and verified against the assessment requirements.
