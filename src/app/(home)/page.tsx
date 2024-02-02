import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-primary">
        Welcome to Employee Tree
      </h3>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl">About Us</CardTitle>
          <CardDescription className="text-base">
            To provide the best quality products and services to our customers
            worldwide, while fostering a culture of innovation and growth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <p>Founded</p>
            <p>2023</p>
          </div>
          <div className="flex justify-between">
            <p>Employees</p>
            <p>500+</p>
          </div>
          <div className="flex justify-between">
            <p>Location</p>
            <p>Worldwide</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
