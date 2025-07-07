# Chaitanya LMS

![GitHub stars](https://img.shields.io/github/stars/chaitanyak175/Chaitanya-LMS?style=social)
![GitHub forks](https://img.shields.io/github/forks/chaitanyak175/Chaitanya-LMS?style=social)
![Repo size](https://img.shields.io/github/repo-size/chaitanyak175/Chaitanya-LMS)
![GitHub license](https://img.shields.io/github/license/chaitanyak175/Chaitanya-LMS)

**Chaitanya LMS** is a modern, open-source Learning Management System designed to provide a seamless and intuitive experience for both students and instructors. Built with a powerful stack including Next.js, Prisma, and Tailwind CSS, it offers a robust platform for creating, managing, and enrolling in online courses.

## ✨ Key Features

- **🔐 Secure User Authentication**: End-to-end authentication with sign-up, login, and session management, including OAuth with GitHub.
- **👨‍💻 Admin Dashboard**: A comprehensive interface for administrators to manage courses, users, and site-wide settings.
- **📚 Course Management**: Full CRUD functionality for courses, allowing instructors to easily create, update, and organize content.
- **🎨 Interactive & Responsive UI**: A polished and accessible user interface built with **Radix UI** and **shadcn/ui**, ensuring a great experience on all devices.
- **✉️ Email Notifications**: Automated email delivery for key events like user registration and course updates, powered by **Resend**.
- **🔒 Type-Safe & Validated**: End-to-end type safety with TypeScript, along with robust form and environment variable validation using **Zod** and **T3 Env**.
- **🛡️ Security-First**: Includes rate limiting and bot protection with **Arcjet** to secure sensitive endpoints.

## 🛠️ Tech Stack

| Category              | Technology                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Framework**         | [Next.js](https://nextjs.org/)                                                                                  |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com/)                                                                        |
| **UI Components**     | [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/) |
| **Database ORM**      | [Prisma](https://www.prisma.io/)                                                                                |
| **Authentication**    | [better-auth](https://www.npmjs.com/package/better-auth)                                                        |
| **Schema Validation** | [Zod](https://zod.dev/), [T3 Env](https://env.t3.gg/)                                                           |
| **Email Service**     | [Resend](https://resend.com/)                                                                                   |
| **Security**          | [Arcjet](https://arcjet.com/)                                                                                   |
| **Deployment**        | [Vercel](https://vercel.com/)                                                                                   |

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [pnpm](https://pnpm.io/installation)
- A PostgreSQL database (local or remote)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/chaitanya-lms.git
    cd chaitanya-lms
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project root by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Populate the `.env` file with your credentials. See `lib/env.ts` for a complete list of required variables.

    ```env
    # Database
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # Authentication (Better Auth & GitHub)
    BETTER_AUTH_SECRET="your_strong_secret_key"
    BETTER_AUTH_URL="http://localhost:3000"
    AUTH_GITHUB_CLIENT_ID="your_github_client_id"
    AUTH_GITHUB_CLIENT_SECRET="your_github_client_secret"

    # Services
    RESEND_API_KEY="your_resend_api_key"
    ARCJET_KEY="your_arcjet_key"
    ```

4.  **Run database migrations:**
    This command will synchronize your database schema with the Prisma schema definition.

    ```bash
    pnpm prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or want to fix a bug, please feel free to open an issue or submit a pull request.

1.  **Fork the repository.**
2.  **Create a new branch:** `git checkout -b feature/your-feature-name`
3.  **Make your changes and commit them:** `git commit -m 'Add some feature'`
4.  **Push to the branch:** `git push origin feature/your-feature-name`
5.  **Open a pull request.**

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
