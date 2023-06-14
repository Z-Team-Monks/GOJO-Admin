export default function ({ redirect, route, store }) {
  // Check if the user is authenticated
  const hasToken = store.state.auth.token;
  const isFinanceAdmin = store.state.auth.currentUser?.role === 3;
  const isListingAdmin = store.state.auth.currentUser?.role === 4;
  const isGeneralAdmin = store.state.auth.currentUser?.role === 5;

  const LISTING_ALLOWED = [
    "/dashboard/properties",
    "/dashboard/profile",
    "/tour/create",
    "/tour/view",
  ];
  const FINANCE_ALLOWED = ["/dashboard/transaction", "/dashboard/profile"];

  // If not authenticated, redirect to the login page
  if (!hasToken && route.path !== "/") {
    return redirect("/");
  }

  if (isFinanceAdmin) {
    return findPathMath(route.path, FINANCE_ALLOWED)
      ? true
      : redirect(FINANCE_ALLOWED[0]);
  }
  if (isListingAdmin) {
    return findPathMath(route.path, LISTING_ALLOWED)
      ? true
      : redirect(LISTING_ALLOWED[0]);
  }

  return isGeneralAdmin || route.path == "/" ? true : redirect("/");
}

const findPathMath = (path, urls) => urls.some((url) => path.startsWith(url));
