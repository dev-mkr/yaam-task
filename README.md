# Orders table

## 📸 Screenshot
![image](https://github.com/user-attachments/assets/463d37b2-2d2b-4a1f-a0fb-7281ee56c838)


## 🚀 Project Overview
A responsive and visually appealing webpage that displays a table of refund orders. The project leverages cutting-edge technologies to deliver an optimal user experience and maintainable code structure. The table is built as a highly configurable, reusable component, making it suitable for multiple use cases across the application.

## 🛠 Tech Stack
- **Technology**: React.js
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **CI/CD**: Husky & lint-staged
- **Unit Testing**: Vitest & react-testing-library
- **internationalization**: i18n

## ✨ Features
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Unit testing 🧪**
   - Fully tested to ensure reliability and maintainability. leverages Vitest and react-testing-library
- **Reusable Table Component** 
  - Configurable for various column layouts and data types
  - Comprehensive error and loading states
  - Supports custom actions per row.
  - Typed with TypeScript for props and state.
  - Immediate State Updates: All actions should reflect on the table immediately without requiring a page reload.
  - Pagination: paginated 15 records per page and can be customized
  - message for empty results
  - Sorting Capabilities 

- **Toaster Notifications**:
  -  Provide feedback for actions like decision changes or status updates.

## 📂 Project Structure -need reviewing-
```bash
src/
  ├── components/           
  │   ├── layout/           # Layout components (Sidebar, Header, etc.)
  │   └── shared/           # Shared components used across pages
  │       └── ui/           # All reusable UI elements (Buttons, Modals, etc.)
  ├── pages/                # Application pages
  │   ├── order/            # Example: Order management pages
  │   │   ├── list/         # List view of refund orders
  │   │   │   ├── components/  # Components specific to the list page
  │   │   │   ├── index.tsx     # List page component
  │   │   │   └── type.ts       # Optional type definitions for the list page
  │   │   ├── edit/         # Edit order page
  │   │   │   ├── components/  # Components specific to the edit page
  │   │   │   ├── index.tsx     # Edit page component
  │   │   │   └── type.ts       # Optional type definitions for the edit page
  │   │   ├── create/       # Create new order page
  │   │   │   ├── components/  # Components specific to the create page
  │   │   │   ├── index.tsx     # Create page component
  │   │   │   └── type.ts       # Optional type definitions for the create page
  │   │   └── show/         # Detailed order view page
  │   │       ├── components/  # Components specific to the show page
  │   │       ├── index.tsx     # Show page component
  │   │       └── type.ts       # Optional type definitions for the show page
  ├── services/             # API services
  ├── styles/               # Global styles
  └── App.tsx               # Main app entry point

```

## 🔧 Prerequisites
- Node.js (v20+)
- yarn

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com//dev-mkr/rabbit-task.git

# Install dependencies
yarn

# Start development server
yarn dev

# Start Json server
yarn server
```

## 🤝 Contributing

- Fork the **development** branch
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## 📝 Commit Message Convention


This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This provides a standardized way to document the purpose and impact of changes in the commit history.

## Commit Message Format


```
type: subject
```

### Types
- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation-only changes.
- **style**: Changes that do not affect the meaning of the code (e.g., formatting).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **perf**: A code change that improves performance.
- **test**: Adding missing or correcting existing tests.
- **chore**: Changes to the build process or auxiliary tools and libraries.

For more details, visit the [Conventional Commits website](https://www.conventionalcommits.org/).

