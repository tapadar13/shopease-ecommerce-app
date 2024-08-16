# ShopEase 🛒

ShopEase is a modern e-commerce platform offering a seamless shopping experience for users.

![ShopEase Logo](/public/shopease.png)

## 🌟 Features

- 👤 User authentication (register, sign in)
- 🏪 Browse and view products
- ❤️ Add products to wishlist
- 🛍️ Add products to cart
- 💳 Checkout process
- 📱 Responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Authentication**: Clerk
- **Form Validation**: Zod
- **Icons**: Lucide React
- **Notifications**: Sonner
- **HTTP Client**: Axios
- **Containerization**: Docker

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Docker (optional)

### Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/tapadar13/ecommerce-shopping-cart.git
   cd shopease
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Fill in the required values

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Setup

1. Build the Docker image:

   ```bash
   docker build -t shopease .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 shopease
   ```

Alternatively, use Docker Compose:

```bash
docker-compose up
```

## 🤝 Contributing

I welcome contributions to ShopEase! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code adheres to the coding standards.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Clerk](https://clerk.dev/)
- [Lucide React](https://lucide.dev/)
- [Sonner](https://sonner.emilkowal.ski/)

---

Made with ❤️ by [Tapadar Monsur](https://x.com/Tapadar13)
