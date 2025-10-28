export default function Resources() {
  return (
    <section className="container py-12">
      <h1 className="text-3xl font-bold">Innovative Teaching Resources</h1>
      <p className="mt-2 max-w-prose text-foreground/70">
        Upload and discover strategies, activities, and methods to support diverse learning needs.
        We'll build the full resource manager next.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Think-Pair-Share</h3>
          <p className="text-sm text-foreground/70">Encourage participation and collaborative learning.</p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Graphic Organizers</h3>
          <p className="text-sm text-foreground/70">Support comprehension with visual structures.</p>
        </div>
      </div>
    </section>
  );
}
