import { Suspense } from "react";
import { SanityApp } from "@sanity/sdk-react";
import { BrowserRouter, Routes, Route } from "react-router";
import config from "../sanity.config";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { CategoryPage } from "./pages/CategoryPage";
import { ArticlePage } from "./pages/ArticlePage";
import { SearchPage } from "./pages/SearchPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./styles/index.css";

export function App() {
  return (
    <SanityApp
      config={config}
      fallback={
        <div className="flex h-screen items-center justify-center">
          <p className="text-gray-500">Connecting to Sanity…</p>
        </div>
      }
    >
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <p className="text-gray-500">Loading…</p>
            </div>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="category/:slug" element={<CategoryPage />} />
              <Route path="article/:slug" element={<ArticlePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SanityApp>
  );
}
