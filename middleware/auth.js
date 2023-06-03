export default function ({ redirect, route, store }) {
  // Check if the user is authenticated
  const hasToken = store.state.auth.token;
  const isFinanceAdmin = store.state.auth.currentUser.role === 4;
  const isListingAdmin = store.state.auth.currentUser.role === 3;

  // If not authenticated, redirect to the login page
  if (!hasToken && route.path !== '/') {
    return redirect('/');
  }

  if(isFinanceAdmin && !(['/dashboard/profile', '/dashboard/transaction'].includes(route.path)) ) {
    return redirect('/dashboard/transaction');
  }

  if(isListingAdmin && !(['/dashboard/profile', '/dashboard/properties'].includes(route.path)) ) {
    return redirect('/dashboard/properties');
  }
}
