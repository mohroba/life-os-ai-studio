import { PageWrapper } from "@/src/components/layout/PageWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { ThemeCustomizer } from "@/src/components/profile/ThemeCustomizer";

export function Profile() {
  return (
    <PageWrapper className="space-y-12 max-w-4xl mx-auto pb-24">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold text-gradient">Profile & Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your identity and app preferences.</p>
      </div>
      
      <section className="space-y-6">
        <Card variant="glass-panel">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-orange-400 p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=LifeOS" 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <Button variant="outline">Change Avatar</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input defaultValue="Alex" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input defaultValue="Doe" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="alex@lifeos.app" type="email" />
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <ThemeCustomizer />
      </section>

      <section className="space-y-6">
        <Card variant="glass">
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notifications</h4>
                <p className="text-sm text-muted-foreground">Manage daily reminders and alerts</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Privacy Mode</h4>
                <p className="text-sm text-muted-foreground">Blur sensitive data on dashboard</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageWrapper>
  );
}
