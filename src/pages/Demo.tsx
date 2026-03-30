import * as React from "react";
import { Layout } from "@/src/components/layout/Layout";
import { Button } from "@/src/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { Modal } from "@/src/components/ui/Modal";
import { useAppStore } from "@/src/store/useStore";
import { Activity, CreditCard, BookOpen, Plus } from "lucide-react";

export function Demo() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { isOffline } = useAppStore();

  return (
    <Layout>
      <div className="flex flex-col gap-12 pb-24">
        <header className="flex flex-col gap-2">
          <h1 className="text-5xl font-display font-bold text-gradient">Life OS</h1>
          <p className="text-muted-foreground text-lg">Foundation & Design System Demo</p>
          {isOffline && (
            <div className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm w-fit mt-2">
              You are currently offline
            </div>
          )}
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold border-b border-border pb-2">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-display font-bold">Heading 1 (Display)</h1>
            <h2 className="text-3xl font-display font-semibold">Heading 2 (Display)</h2>
            <h3 className="text-2xl font-display font-medium">Heading 3 (Display)</h3>
            <p className="text-base font-sans">Body text (Sans). The quick brown fox jumps over the lazy dog. This represents standard paragraph text used throughout the application.</p>
            <p className="text-sm text-muted-foreground font-sans">Muted text. Used for secondary information and descriptions.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold border-b border-border pb-2">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="glass">Glass Button</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Plus size={20} /></Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold border-b border-border pb-2">Inputs</h2>
          <div className="max-w-md space-y-4">
            <Input placeholder="Default input..." />
            <Input type="password" placeholder="Password..." />
            <Input disabled placeholder="Disabled input..." />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold border-b border-border pb-2">Cards (Glassmorphism)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="glass">
              <CardHeader>
                <Activity className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Habits</CardTitle>
                <CardDescription>Track your daily routines</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Maintain your streak and build better habits over time.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Habits</Button>
              </CardFooter>
            </Card>

            <Card variant="glass-panel">
              <CardHeader>
                <CreditCard className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Finance</CardTitle>
                <CardDescription>Manage your wealth</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Track expenses, set budgets, and monitor your net worth.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Finances</Button>
              </CardFooter>
            </Card>

            <Card variant="default">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Journal</CardTitle>
                <CardDescription>Document your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Reflect on your day, write down thoughts, and track mood.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Open Journal</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold border-b border-border pb-2">Modals</h2>
          <div>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Create New Goal"
              description="Define a new objective to track in your Life OS."
            >
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Goal Title</label>
                  <Input placeholder="e.g., Read 20 books this year" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="e.g., Learning" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsModalOpen(false)}>Save Goal</Button>
              </div>
            </Modal>
          </div>
        </section>
      </div>
    </Layout>
  );
}
