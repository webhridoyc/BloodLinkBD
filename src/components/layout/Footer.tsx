
export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BloodLink BD. All rights reserved.</p>
        <p className="text-sm mt-1">Connecting donors, saving lives.</p>
      </div>
    </footer>
  );
}