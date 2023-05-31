export default async ({ app, store }) => {
  app.router.beforeEach(async (to, from, next) => {
    await store.restored;
    next();
  });
}
