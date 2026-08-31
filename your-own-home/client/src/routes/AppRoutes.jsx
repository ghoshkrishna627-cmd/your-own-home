import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute.jsx';
import RoleRoute from './RoleRoute.jsx';

import Home from '../pages/Home/Home.jsx';
import Search from '../pages/Search/Search.jsx';
import ListingDetails from '../pages/ListingDetails/ListingDetails.jsx';
import Login from '../pages/Login/Login.jsx';
import Register from '../pages/Register/Register.jsx';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from '../pages/ResetPassword/ResetPassword.jsx';
import Booking from '../pages/Booking/Booking.jsx';
import GuestDashboard from '../pages/GuestDashboard/GuestDashboard.jsx';
import HostDashboard from '../pages/HostDashboard/HostDashboard.jsx';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard.jsx';
import Messages from '../pages/Messages/Messages.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';

/**
 * Route tree. Pages are currently placeholder shells (see each page file's
 * header comment) and will be built out fully in the Frontend phase — this
 * file establishes the final routing structure so guards/layout can be
 * verified end-to-end before page content is implemented.
 */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<Search />} />
    <Route path="/listings/:id" element={<ListingDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />

    {/* Any authenticated user */}
    <Route element={<ProtectedRoute />}>
      <Route path="/booking/:listingId" element={<Booking />} />
      <Route path="/dashboard/guest/*" element={<GuestDashboard />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/messages/:conversationId" element={<Messages />} />
    </Route>

    {/* Host only */}
    <Route element={<RoleRoute allowedRoles={['host', 'admin']} />}>
      <Route path="/dashboard/host/*" element={<HostDashboard />} />
    </Route>

    {/* Admin only */}
    <Route element={<RoleRoute allowedRoles={['admin']} />}>
      <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
