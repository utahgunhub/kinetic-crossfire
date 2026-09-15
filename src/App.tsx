import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "@/components/ScrollToTop";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductCatalogProvider } from "@/contexts/ProductCatalogContext";
import Index from "./pages/Index";
import Videos from "./pages/Videos";
import Purchase from "./pages/Purchase";
import Apparel from "./pages/Apparel";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import Dealership from "./pages/Dealership";
import DealerLogin from "./pages/DealerLogin";
import DealerSignup from "./pages/DealerSignup";
import Dealers from "./pages/Dealers";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminInvites from "./pages/admin/AdminInvites";
import AdminMapDealers from "./pages/admin/AdminMapDealers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductEdit from "./pages/admin/AdminProductEdit";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import GoogleAnalytics from "./components/GoogleAnalytics";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <ProductCatalogProvider>
      <TooltipProvider>
        <CartProvider>
        <Toaster />
        <Sonner />
        <Analytics />
        <BrowserRouter>
          <GoogleAnalytics />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/shop" element={<Purchase />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/shop/apparel" element={<Apparel />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/dealership" element={<Dealership />} />
            <Route path="/dealer/login" element={<DealerLogin />} />
            <Route path="/dealer/signup" element={<DealerSignup />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminInvites />} />
              <Route path="map-dealers" element={<AdminMapDealers />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:productId" element={<AdminProductEdit />} />
              <Route path="coupons" element={<AdminCoupons />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
      </ProductCatalogProvider>
      </AuthProvider>
    </QueryClientProvider>
);

export default App;
